import child_process, { spawn } from 'node:child_process'
import util from 'node:util'
import { COMMANDS } from '@/constants/help'
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
		stdio: 'inherit',
		shell: true
	})

	child.on('close', (code) => {
		if (code === 0) resolve()
		else reject(new Error(`Update failed with code ${code}`))
	})

	return promise
}
