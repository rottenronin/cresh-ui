interface ImportMetaEnv {
  readonly VITE_I18N_LOCALE: string
  readonly VITE_I18N_FALLBACK_LOCALE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
