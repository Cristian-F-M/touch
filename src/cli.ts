import { build } from '@/builder'
import { error, info, warn } from '@/logger'
import { getExtension, parse } from '@/parser'
import { validateInput } from '@/verifier'
import { version } from '../package.json'
import { getLatestVersion, showFlagsInfo } from './utils'

export const args = process.argv.slice(2)

await showFlagsInfo(args)

const latestVersion = await getLatestVersion()
if (latestVersion && latestVersion.trim() !== version.trim()) {
	warn(`✨ New version available: ${latestVersion}`)
	info(`Run "npm install -g @cmorales_/touch" to update`)
}

const input = args[0]!.replace(/\s/g, '')
const validation = validateInput(input)

if (!validation.valid) {
	error(validation.error!)
	process.exit(1)
}

const tree = parse(input)
const ext = getExtension(input)

build(tree, process.cwd(), ext)
