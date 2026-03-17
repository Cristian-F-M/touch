import child_process, { spawn } from 'node:child_process'
import util from 'node:util'
import { COMMANDS } from '@/constants/help'
import { error, info } from '@/logger'
import pkg from '../../package.json' with { type: 'json' }

export async function showFlagsInfo(args: string[]) {
	for (const command of Object.values(COMMANDS)) {
		if (!command.flags.some((flag) => args.includes(flag))) continue
		await command.run()
		process.exit(0)
	}

	if (!args.length) {
		await COMMANDS.help.run()
		process.exit(0)
	}
}

export async function getLatestVersion() {
	const exec = util.promisify(child_process.exec)
	const { name } = await import('../../package.json')
	const { stdout } = await exec(`npm view ${name} version`)
	return stdout.toString().trim()
}

export function updateCli() {
	const { promise, resolve, reject } = Promise.withResolvers<void>()

	const child = spawn('npm', ['install', '-g', pkg.name], {
		shell: true
	})

	child.stdout.on('data', (data) => {
		const text = `${data.toString().trim()}\n`
		info(`[npm]: ${text}`)
	})

	child.stderr.on('data', (data) => {
		const text = `${data.toString().trim()}\n`
		error(`[npm error]: ${text}`)
	})

	child.on('close', (code) => {
		if (code === 0) {
			resolve()
		} else reject(new Error(`Update failed with code ${code}`))
	})

	return promise
}
