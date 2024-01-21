// installation process
import type {
  App,
  Plugin,
} from 'vue'

import * as components from './components'
import * as directives from './directives'
import notifyPlugin from './plugins/notify.plugin'

// import * as plugins from './plugins'

export type CreshUIConfig = {
  lang: 'fr' | 'en'
  breakPoints?: {
    XS: number // small to large handset < 600px
    SM: number // small to medium tablet
    MD: number // large tablet to laptop 960px > < 1264px*
    LG: number // desktop 1264px* > < 1904px*
  }
  theme: 'cresh'
}

const plugin: Plugin = {
  install (
    app: App,
    options: { [key: string]: any } = {
      lang: 'fr',
      breakPoints: {
        XS: 600, // small to large handset < 600px
        SM: 960, // small to medium tablet
        MD: 1264, // large tablet to laptop 960px > < 1264px*
        LG: 1904, // desktop 1264px* > < 1904px*
      },
      theme: 'cresh',
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

    app.use(notifyPlugin)

    app.config.globalProperties.$breakPoints = options.breakPoints
  },
}

export default plugin as any
export * as components from './components'
export * as helpers from './helpers'
export * as plugins from './plugins'

// local define typings
export * from './@types'
