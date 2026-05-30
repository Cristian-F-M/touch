import util from 'node:util'
import updateNotifier from 'update-notifier'
import { build } from '@/builder'
import { parseArgsConfig } from '@/constants/args-parser'
import { DOCS_URL, HELP_MESSAGE } from '@/constants/help'
import { error, log } from '@/logger'
import { getExtension, parse } from '@/parser'
import { handleUpdateCli, onFetchInfoSucces } from '@/utils'
import { validateInput } from '@/verifier'
import pkg from '../package.json' with { type: 'json' }

let fetched = false

process.on('beforeExit', async () => {
	if (fetched) return

	const notifier = updateNotifier({
		pkg,
		updateCheckInterval: 60 * 60 * 24 * 2
	})
	const info = await notifier.fetchInfo()
	fetched = true

	onFetchInfoSucces(info)
})

async function main() {
	const { values, positionals } = util.parseArgs(parseArgsConfig)

	if (values.help) return console.log(HELP_MESSAGE)
	if (values.docs) return log(`To see the documentation, visit: ${DOCS_URL}`)

	if (values.version) {
		const { name, version } = pkg
		log(`${name} v${version}`)
		return
	}
	if (values.upgrade) return handleUpdateCli()

	if (!positionals.length) return error('No input and no flags provided')

	const input = positionals[0]!.replace(/\s/g, '')
	const validation = validateInput(input)

	if (!validation.valid) {
		error(validation.error!)
		return
	}

	const tree = parse(input)
	const ext = getExtension(input)

	build(tree, process.cwd(), ext)
}

main()
