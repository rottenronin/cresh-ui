import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      vueDocgenOptions: {
        alias: {
          '@': new URL('../src', import.meta.url).pathname,
        },
      },
    },
  },
  viteFinal: async (config) => {
    return {
      ...config,
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
              @import "./src/styles/preprocessor/fonts.scss";
              @import "./src/styles/preprocessor/break-points.scss";
              @import "./src/styles/preprocessor/computeds.scss";
              @import "./src/styles/preprocessor/utils.scss";
              @import "./src/styles/preprocessor/default-colors.scss";
            `,
            quietDeps: true,
            silenceDeprecations: ['legacy-js-api', 'import'],
          },
        },
      },
    }
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config
