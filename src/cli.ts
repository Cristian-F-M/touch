import updateNotifier from 'update-notifier'
import { build } from '@/builder'
import { error } from '@/logger'
import { getExtension, parse } from '@/parser'
import { validateInput } from '@/verifier'
import pkg from '../package.json'
import { updateMessage } from './constants/help'
import { showFlagsInfo } from './utils'

const notifier = updateNotifier({ pkg })
notifier.notify({ message: updateMessage, defer: true, isGlobal: true })

export const args = process.argv.slice(2)

await showFlagsInfo(args)

const input = args[0]!.replace(/\s/g, '')
const validation = validateInput(input)

if (!validation.valid) {
	error(validation.error!)
	process.exit(1)
}

const tree = parse(input)
const ext = getExtension(input)

build(tree, process.cwd(), ext)
