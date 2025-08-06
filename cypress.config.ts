import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    VUE_APP_ENV: 'development',
    BASE_URL: 'http://localhost:8083',
    TIMEOUT: 10000,
    WAIT_FOR: 1000,
    DEV_EMAIL: 'dummy@cresh.eu',
  },

  retries: {
    runMode: 0,
    openMode: 0,
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    indexHtmlFile: 'tests/components/support/component-testing.html',
    viewportWidth: 1000,
    viewportHeight: 660,
    supportFolder: 'tests/components/support',
    supportFile: 'tests/components/support/component.ts',
  },

  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
})
