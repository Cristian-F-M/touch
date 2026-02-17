import child_process from 'node:child_process'
import util from 'node:util'
import cfonts from 'cfonts'
import { error, info, log, success, warn } from '@/logger'
import { getLatestVersion } from '@/utils'
import { name, version } from '../../package.json'

const exec = util.promisify(child_process.exec)

const renderedTitle = cfonts.render('touch', {
	font: 'block',
	colors: ['system', 'white']
})

export const TITLE = renderedTitle ? renderedTitle.string : '@cmorales/touch'

export const HELP_MESSAGE = `
${TITLE}
v${version}
Creating complex file structures has never been easier.

Usage:
  touch <input>     Generate file structure    (e.g. touch src/{components,utils})
  touch --help      Show this help message     (e.g. touch --help)
  touch -h          Show this help message     (e.g. touch -h)
  touch --docs      Open the documentation     (e.g. touch --docs)
  touch -d          Open the documentation     (e.g. touch -d)
  touch --upgrade   Upgrade the package        (e.g. touch --upgrade)

Features:
  Directories       Append '/' to name         (e.g. app/models/)
  Grouping          Use {}, [], or ()          (e.g. src/{components,utils})
  Nesting           Nest groups for complexity (e.g. src/{components/{Button,Input},utils})
  Extensions        Per file or default        (e.g. src/{index.ts,styles.css} or src/{a,b}.ts)

Author:
  Cristian Morales (@cmorales)
  GitHub: https://github.com/Cristian-F-M
  Twitter: https://x.com/Morales_M20

Support:
  If you find this useful, support my work:
  https://www.buymeacoffee.com/cmorales
`

export const DOCS_URL =
	'https://github.com/Cristian-F-M/touch-npm?tab=readme-ov-file#cmoralestouch'

export const COMMANDS = {
	help: {
		flags: ['--help', '-h'],
		run: async () => {
			const LATEST_VERSION = await getLatestVersion()
			const OUTDATED =
				LATEST_VERSION && LATEST_VERSION.trim() !== version.trim()

			console.log(HELP_MESSAGE)
			if (OUTDATED) {
				warn(`✨ New version available: ${LATEST_VERSION}`)
				info(`Run "touch --upgrade" to update`)
			}
		}
	},
	docs: {
		flags: ['--docs', '-d'],
		run: () => log(`To see the documentation, visit: ${DOCS_URL}`)
	},
	version: {
		flags: ['--version', '-v'],
		run: async () => {
			const { name, version } = await import('../../package.json')
			log(`${name} v${version}`)
		}
	},
	upgrade: {
		flags: ['--upgrade'],
		run: async () => {
			const latestVersion = await getLatestVersion()

			if (latestVersion.trim() === version.trim()) {
				success('Package is already up to date')
				return
			}

			info('Upgrading package...')
			const { stderr, stdout } = await exec(`npm install -g ${name}`)

			if (stderr) return error(stderr)

			info(`\n| ${stdout.toString().trim()}\n`)
			success(`Package upgraded successfully to v${latestVersion}`)
		}
	}
} as const
