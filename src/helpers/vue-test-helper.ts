/* eslint-disable @typescript-eslint/no-explicit-any */
// initialize cy component testings

import { createI18n } from 'vue-i18n'

import '../styles/colors.css'

import fr from '../locales/fr.json'
import en from '../locales/en.json'

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: {
    fr,
    en,
  },
  globalInjection: true,
})

export const $t = (key: string) => i18n.global.t(key)

const uiComponentsStubs = {}

// eslint-disable-next-line import/prefer-default-export
export const mountCyComponent = (
  component: any,
  options: MountingOptions = {
    global: {
      stubs: {},
      mocks: {},
      plugins: {},
    },
  },
) => {
  const plugins = [
    i18n,
    ...(Object.entries(options.global?.plugins || {})),
  ]

  return cy.mount(component, {
    ...options,
    global: {
      ...options.global,
      mocks: {
        $t: (text: string) => i18n.global.t(text),
        ...options.global?.mocks,
      },
      stubs: {
        ...uiComponentsStubs,
        ...options.global?.stubs,
      },
      plugins,
    },
  })
}
