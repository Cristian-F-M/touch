import child_process, { spawn } from 'node:child_process'
import util from 'node:util'
import boxen from 'boxen'
import pupa from 'pupa'
import semver from 'semver'
import type { UpdateInfo } from 'update-notifier'
import updateNotifier from 'update-notifier'
import {
	boxenOptions,
	needDowngradeMessage,
	updateMessage
} from '@/constants/help'
import { error, info, success } from '@/logger'
import pkg from '../../package.json' with { type: 'json' }

export async function handleUpdateCli() {
	const notifier = updateNotifier({ pkg })
	const { latest, current } = await notifier.fetchInfo()

	if (semver.eq(latest, current)) {
		success('Package is already up to date')
		return
	}

	info('Upgrading package...\n')
	await updateCli()
	success(`Package upgraded successfully to v${latest}`)
	process.exit(0)
}

export function updateCli() {
	const { promise, resolve, reject } = Promise.withResolvers<void>()
	const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

	const child = spawn(npm, ['install', '-g', pkg.name], {
		shell: false,
		stdio: 'pipe'
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

	child.on('error', (err) => {
		error(err.message)
	})

	return promise
}

export function onFetchInfoSucces({ latest, current }: UpdateInfo) {
	if (current === latest) return

	console.log(
		boxen(pupa(updateMessage, { latest, current }), {
			padding: 1,
			margin: 1,
			textAlignment: 'center',
			borderColor: 'yellow',
			borderStyle: 'round'
		})
	)
}
