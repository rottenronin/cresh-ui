import { createI18n } from 'vue-i18n'

import en from '../locales/en.json'
import fr from '../locales/fr.json'
import de from '../locales/de.json'
import es from '../locales/es.json'
import it from '../locales/it.json'
import cn from '../locales/cn.json'

const messages = {
  en: {
    translate: en,
  },
  fr: {
    translate: fr,
  },
  de: {
    translate: de,
  },
  es: {
    translate: es,
  },
  it: {
    translate: it,
  },
  cn: {
    translate: cn,
  },
}

export default createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
  messages,
})
