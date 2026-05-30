import type { ParseArgsConfig } from 'node:util'

export const parseArgsConfig = {
	allowPositionals: true,
	args: process.argv.slice(2),
	strict: true,
	options: {
		help: {
			type: 'boolean',
			default: false,
			short: 'h'
		},
		docs: {
			type: 'boolean',
			default: false,
			short: 'd'
		},
		version: {
			type: 'boolean',
			default: false,
			short: 'v'
		},
		upgrade: {
			type: 'boolean',
			default: false
		}
	}
} satisfies ParseArgsConfig
