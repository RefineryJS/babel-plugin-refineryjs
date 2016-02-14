import refine from 'refineryjs'
import defaultPlugins from 'refine-default'

export default function RefineryJS ({types: t}) {
  return {
    visitor: {
      Program (path, {opts: {base = [], plugins}}) {
        if (typeof base === 'string') {
          try {
            base = require(base).default
          } catch (err) {
            console.log('RefineryJS - Cannot find base config:', base)
            base = []
          }
        }

        let composedPlugins = [...base, ...plugins]
        if (composedPlugins.length === 0) {
          composedPlugins = defaultPlugins
        }

        refine(t, path, composedPlugins)
      },
    },
  }
}
