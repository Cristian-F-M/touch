import updateNotifier from 'update-notifier'
import { build } from '@/builder'
import { error } from '@/logger'
import { getExtension, parse } from '@/parser'
import { validateInput } from '@/verifier'
import pkg from '../package.json' with { type: 'json' }
import { onFetchInfoSucces, showFlagsInfo } from './utils'

let fetched = false

async function main() {
	const args = process.argv.slice(2)

	const handled = await showFlagsInfo(args)

	if (!handled) {
		const input = args[0]!.replace(/\s/g, '')
		const validation = validateInput(input)

		if (!validation.valid) {
			error(validation.error!)
			process.exit(1)
		}

		const tree = parse(input)
		const ext = getExtension(input)

		build(tree, process.cwd(), ext)
	}

	if (!fetched) {
		const notifier = updateNotifier({
			pkg,
			updateCheckInterval: 0
		})

		const info = await notifier.fetchInfo()
		fetched = true

		onFetchInfoSucces(info)
	}
}

main()
