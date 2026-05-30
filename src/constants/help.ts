import pkg from '@./package.json' with { type: 'json' }
import type { Options } from 'boxen'
import cfonts from 'cfonts'
import picocolors from 'picocolors'
import pc from 'picocolors'

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
	'https://github.com/Cristian-F-M/touch?tab=readme-ov-file#cmoralestouch'

export const updateMessage = `✨ New version available: ${picocolors.gray('{current}')} → ${picocolors.underline(picocolors.bold(picocolors.green('{latest}')))}
run ${picocolors.bold(picocolors.cyan('touch --upgrade'))} to update`

export const needDowngradeMessage = `⏳ Wait... you are from the future?!
Your version: ${pc.gray('{current}')} → Latest: ${pc.underline(pc.bold(pc.green('{latest}')))}

Marty, we need to go back to the past!
run ${pc.bold(pc.blue('tree --upgrade'))} to sync`

export const boxenOptions = {
	padding: 1,
	margin: 1,
	textAlignment: 'center',
	borderColor: 'yellow',
	borderStyle: 'round'
} satisfies Options
