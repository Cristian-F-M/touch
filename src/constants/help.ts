import cfonts from 'cfonts'
import updateNotifier from 'update-notifier'
import { info, log, success } from '@/logger'
import { updateCli } from '@/utils'
import pkg from '../../package.json' with { type: 'json' }

const notifier = updateNotifier({ pkg })

const renderedTitle = cfonts.render('touch', {
	font: 'block',
	colors: ['system', 'white']
})

export const TITLE = renderedTitle ? renderedTitle.string : '@cmorales/touch'

export const HELP_MESSAGE = `
${TITLE}
v${pkg.version}
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

export const updateMessage =
	"✨ New version available: `{latestVersion}`\nrun 'touch --upgrade' to update"

export const COMMANDS = {
	help: {
		flags: ['--help', '-h'],
		run: async () => {
			console.log(HELP_MESSAGE)
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
			const { update } = notifier

			if (!update) return await updateCli()

			const { latest, current } = update

			if (latest === current) {
				success('Package is already up to date')
				return
			}

			info('Upgrading package...')
			await updateCli()

			success(`Package upgraded successfully to v${latest}`)
		}
	}
} as const
