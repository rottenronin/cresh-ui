import { setup, type Preview } from "@storybook/vue3";

import i18n from "../src/plugins/i18n.plugin";

import { installStorybookPreviewLocalization } from "./preview-localization";

// Import global styles
import "../src/styles/colors.css";

setup((app) => {
  app.use(i18n);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "padded",
  },
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      defaultValue: i18n.global.locale.value,
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Francais" },
          { value: "de", title: "Deutsch" },
          { value: "es", title: "Espanol" },
          { value: "it", title: "Italiano" },
          { value: "cn", title: "中文" },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const locale = context.globals.locale || i18n.global.locale.value;

      i18n.global.locale.value = locale;
      installStorybookPreviewLocalization(
        locale as "en" | "fr" | "de" | "es" | "it" | "cn",
      );

      if (typeof document !== "undefined") {
        document.documentElement.lang = locale;
        document.documentElement.dir = "ltr";

        // Update page metadata based on story
        const storyTitle = context.title || "Cresh UI";
        const storyName = context.name || "Story";
        const fullTitle = `${storyTitle} - ${storyName} | Cresh UI`;

        // Update document title
        document.title = fullTitle;

        // Update Open Graph title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
          ogTitle.setAttribute("content", fullTitle);
        }

        // Update canonical URL if in a story view
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical && context.id) {
          canonical.setAttribute(
            "href",
            `https://storybook.cresh-ui.dev/?path=/story/${context.id}`,
          );
        }
      }

      return {
        components: { story },
        template: "<story />",
      };
    },
  ],
};

export default preview;
