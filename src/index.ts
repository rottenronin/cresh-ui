// installation process
import type { App } from 'vue'

import { BreakPoints } from '@/@types'

import * as components from './components'
import * as directives from './directives'
import * as plugins from './plugins'

// import * as plugins from './plugins'

export type CreshUIConfig = {
  lang: 'fr' | 'en'
  breakPoints?: BreakPoints
  theme: 'cresh'
  includePlugins?: boolean
}

export default {
  install (
    app: App,
    options: CreshUIConfig = {
      lang: 'fr',
      breakPoints: {
        XS: 600, // small to large handset < 600px
        SM: 960, // small to medium tablet
        MD: 1264, // large tablet to laptop 960px > < 1264px*
        LG: 1904, // desktop 1264px* > < 1904px*
      },
      theme: 'cresh',
      includePlugins: true,
    },
  ) {
    // init components
    Object.entries(components).forEach(([key, component]) => {
      app.component(key, component)
    })

    // init directives

    Object.entries(directives).forEach(([key, directive]) => {
      app.directive(key, directive)
    })

    // init plugins if needed
    if (options.includePlugins) {
      app.use(plugins.breakpointsDetect, options.breakPoints)
      app.use(plugins.notify)
    }

    app.config.globalProperties.$breakPoints = options.breakPoints
    app.provide('breakPoints', options.breakPoints)
  },
}

export * as components from './components'
export * as helpers from './helpers'
export * as plugins from './plugins'

// local define typings
export * from './@types'
