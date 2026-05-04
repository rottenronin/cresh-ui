import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/vue3-vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|js|jsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/vue3-vite",
    options: {
      vueDocgenOptions: {
        alias: {
          "@": new URL("../src", import.meta.url).pathname,
        },
      },
    },
  },

  viteFinal: async (config) => ({
    ...config,
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [path.resolve(__dirname, "../src/styles/preprocessor")],
          additionalData: `
              @import "fonts";
              @import "break-points";
              @import "computeds";
              @import "utils";
              @import "default-colors";
            `,
          quietDeps: true,
          silenceDeprecations: ["legacy-js-api", "import"],
        },
      },
    },
  }),
};

export default config;
