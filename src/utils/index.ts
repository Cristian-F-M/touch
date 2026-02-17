import child_process from 'node:child_process'
import util from 'node:util'
import { COMMANDS } from '@/constants/help'

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
