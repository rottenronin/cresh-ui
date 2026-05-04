import type { Meta, StoryObj } from "@storybook/vue3";
import { useI18n } from "vue-i18n";

const meta = {
  title: "Theme",
  parameters: {
    layout: "fullscreen",
    order: 2,
  },
  tags: ["!autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => ({
    setup() {
      const { t } = useI18n();

      const primaryColors = [
        {
          labelKey: "translate.showcase.theme.colors.primary",
          token: "--color-primary",
          hex: "#400EC9",
          rgb: "rgb(64, 14, 201)",
          swatch: "#400EC9",
        },
        {
          labelKey: "translate.showcase.theme.colors.secondary",
          token: "--color-secondary",
          hex: "#349CE7",
          rgb: "rgb(52, 156, 231)",
          swatch: "#349CE7",
        },
        {
          labelKey: "translate.showcase.theme.colors.tertiary",
          token: "--color-tertiary",
          hex: "#00ECCB",
          rgb: "rgb(0, 236, 203)",
          swatch: "#00ECCB",
        },
      ];

      const statusColors = [
        {
          labelKey: "translate.showcase.theme.colors.success",
          token: "--color-success",
          hex: "#00ECCB",
          rgb: "rgb(0, 236, 203)",
          swatch: "#00ECCB",
        },
        {
          labelKey: "translate.showcase.theme.colors.error",
          token: "--color-error",
          hex: "#FC5A5A",
          rgb: "rgb(252, 90, 90)",
          swatch: "#FC5A5A",
        },
        {
          labelKey: "translate.showcase.theme.colors.warning",
          token: "--color-warning",
          hex: "#fca25a",
          rgb: "rgb(255, 165, 0)",
          swatch: "#fca25a",
        },
        {
          labelKey: "translate.showcase.theme.colors.info",
          token: "--color-info",
          hex: "#349CE7",
          rgb: "rgb(52, 156, 231)",
          swatch: "#349CE7",
        },
      ];

      const neutralColors = [
        {
          labelKey: "translate.showcase.theme.colors.dark",
          token: "--color-dark",
          hex: "#222121",
          rgb: "rgb(34, 33, 33)",
          swatch: "#222121",
          border: false,
        },
        {
          labelKey: "translate.showcase.theme.colors.text",
          token: "--color-text",
          hex: "#3D647C",
          rgb: "rgb(61, 100, 124)",
          swatch: "#3D647C",
          border: false,
        },
        {
          labelKey: "translate.showcase.theme.colors.grey",
          token: "--color-grey",
          hex: "#92929D",
          rgb: "rgb(146, 146, 157)",
          swatch: "#92929D",
          border: false,
        },
        {
          labelKey: "translate.showcase.theme.colors.light_grey",
          token: "--color-light-grey",
          hex: "#e3e1e1",
          rgb: "rgb(227, 225, 225)",
          swatch: "#e3e1e1",
          border: true,
        },
        {
          labelKey: "translate.showcase.theme.colors.white",
          token: "--color-white",
          hex: "#FFF",
          rgb: "rgb(255, 255, 255)",
          swatch: "#FFF",
          border: true,
        },
        {
          labelKey: "translate.showcase.theme.colors.app_background",
          token: "--color-app-background",
          hex: "#F2F5F7",
          rgb: "rgb(242, 245, 247)",
          swatch: "#F2F5F7",
          border: true,
        },
      ];

      const headingStyles = [
        {
          tag: "h1",
          sampleKey: "translate.showcase.theme.typography.heading_1",
          spec: "font-size: 44px | font-weight: 700 | color: --color-primary",
          style:
            "font-size: 44px; font-weight: 700; color: #400EC9; margin: 0 0 8px 0;",
        },
        {
          tag: "h2",
          sampleKey: "translate.showcase.theme.typography.heading_2",
          spec: "font-size: 36px | font-weight: 600 | color: --color-primary",
          style:
            "font-size: 36px; font-weight: 600; color: #400EC9; margin: 0 0 8px 0;",
        },
        {
          tag: "h3",
          sampleKey: "translate.showcase.theme.typography.heading_3",
          spec: "font-size: 28px | font-weight: 600 | color: --color-dark",
          style:
            "font-size: 28px; font-weight: 600; color: #222121; margin: 0 0 8px 0;",
        },
        {
          tag: "h4",
          sampleKey: "translate.showcase.theme.typography.heading_4",
          spec: "font-size: 20px | font-weight: 600 | color: --color-dark",
          style:
            "font-size: 20px; font-weight: 600; color: #222121; margin: 0 0 8px 0;",
        },
      ];

      const bodyText = [
        {
          key: "translate.showcase.theme.typography.body_regular",
          style:
            "font-size: 16px; line-height: 1.6; color: #3D647C; margin: 0 0 16px 0;",
        },
        {
          key: "translate.showcase.theme.typography.body_small",
          style:
            "font-size: 14px; line-height: 1.6; color: #3D647C; margin: 0 0 16px 0;",
        },
        {
          key: "translate.showcase.theme.typography.body_supporting",
          style:
            "font-size: 12px; line-height: 1.6; color: #92929D; margin: 0;",
        },
      ];

      const guidelines = [
        "translate.showcase.theme.guidelines.primary",
        "translate.showcase.theme.guidelines.secondary",
        "translate.showcase.theme.guidelines.tertiary",
        "translate.showcase.theme.guidelines.error",
        "translate.showcase.theme.guidelines.warning",
        "translate.showcase.theme.guidelines.info",
        "translate.showcase.theme.guidelines.text",
        "translate.showcase.theme.guidelines.contrast",
      ];

      return {
        t,
        primaryColors,
        statusColors,
        neutralColors,
        headingStyles,
        bodyText,
        guidelines,
      };
    },
    template: `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #f5f5f5;
        overflow-y: auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        padding: 0;
      ">
        <div style="
          padding: 60px 40px;
          max-width: 1400px;
          margin: 0 auto;
        ">
          <!-- Header -->
          <div style="
            margin-bottom: 60px;
          ">
            <div style="
              margin-bottom: 20px;
            ">
              <img src="/cresh-logo.svg" alt="Cresh UI" style="
                max-width: 150px;
                height: auto;
                display: inline-block;
                margin-right: 16px;
                vertical-align: middle;
              " />
              <h1 style="
                font-size: clamp(28px, 6vw, 44px);
                font-weight: 700;
                color: #2c3e50;
                margin: 0;
                display: inline-block;
                vertical-align: middle;
              ">
                Theme
              </h1>
            </div>
            <p style="
              font-size: 16px;
              color: #666;
              margin: 0;
              line-height: 1.6;
            ">
              {{ t('translate.showcase.theme.subtitle') }}
            </p>
          </div>

          <!-- Primary Colors Section -->
          <section style="
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          ">
            <h2 style="
              font-size: 24px;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 30px 0;
              padding-bottom: 15px;
              border-bottom: 2px solid #400EC9;
            ">
              {{ t('translate.showcase.theme.sections.primary_colors') }}
            </h2>
            
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 24px;
            ">
              <div v-for="color in primaryColors" :key="color.token" style="
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              ">
                <div :style="{ background: color.swatch, height: '120px' }"></div>
                <div style="
                  padding: 16px;
                  background: white;
                ">
                  <div style="font-weight: 600; color: #2c3e50;">{{ t(color.labelKey) }}</div>
                  <div style="font-size: 13px; color: #666; margin-top: 8px;">{{ color.token }}</div>
                  <div style="font-family: monospace; font-size: 12px; color: #999; margin-top: 8px;">{{ color.hex }}</div>
                  <div style="font-family: monospace; font-size: 12px; color: #999;">{{ color.rgb }}</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Status Colors Section -->
          <section style="
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          ">
            <h2 style="
              font-size: 24px;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 30px 0;
              padding-bottom: 15px;
              border-bottom: 2px solid #349CE7;
            ">
              {{ t('translate.showcase.theme.sections.status_colors') }}
            </h2>
            
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 24px;
            ">
              <div v-for="color in statusColors" :key="color.token" style="
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              ">
                <div :style="{ background: color.swatch, height: '120px' }"></div>
                <div style="
                  padding: 16px;
                  background: white;
                ">
                  <div style="font-weight: 600; color: #2c3e50;">{{ t(color.labelKey) }}</div>
                  <div style="font-size: 13px; color: #666; margin-top: 8px;">{{ color.token }}</div>
                  <div style="font-family: monospace; font-size: 12px; color: #999; margin-top: 8px;">{{ color.hex }}</div>
                  <div style="font-family: monospace; font-size: 12px; color: #999;">{{ color.rgb }}</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Neutral Colors Section -->
          <section style="
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          ">
            <h2 style="
              font-size: 24px;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 30px 0;
              padding-bottom: 15px;
              border-bottom: 2px solid #00ECCB;
            ">
              {{ t('translate.showcase.theme.sections.neutral_colors') }}
            </h2>
            
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 24px;
            ">
              <div v-for="color in neutralColors" :key="color.token" style="
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              ">
                <div :style="{ background: color.swatch, height: '120px', border: color.border ? '1px solid #ddd' : 'none' }"></div>
                <div style="
                  padding: 16px;
                  background: white;
                ">
                  <div style="font-weight: 600; color: #2c3e50;">{{ t(color.labelKey) }}</div>
                  <div style="font-size: 13px; color: #666; margin-top: 8px;">{{ color.token }}</div>
                  <div style="font-family: monospace; font-size: 12px; color: #999; margin-top: 8px;">{{ color.hex }}</div>
                  <div style="font-family: monospace; font-size: 12px; color: #999;">{{ color.rgb }}</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Typography Section -->
          <section style="
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          ">
            <h2 style="
              font-size: 24px;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 30px 0;
              padding-bottom: 15px;
              border-bottom: 2px solid #FC5A5A;
            ">
              {{ t('translate.showcase.theme.sections.typography') }}
            </h2>

            <div style="
              margin-bottom: 40px;
            ">
              <h3 style="
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #999;
                margin: 0 0 16px 0;
                font-weight: 600;
              ">
                {{ t('translate.showcase.theme.sections.heading_styles') }}
              </h3>
              
              <div v-for="heading in headingStyles" :key="heading.sampleKey" style="margin-bottom: 24px;">
                <component :is="heading.tag" :style="heading.style">
                  {{ t(heading.sampleKey) }}
                </component>
                <p style="font-size: 13px; color: #999; margin: 0;">
                  {{ heading.spec }}
                </p>
              </div>
            </div>

            <div style="
              margin-bottom: 40px;
            ">
              <h3 style="
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #999;
                margin: 0 0 16px 0;
                font-weight: 600;
              ">
                {{ t('translate.showcase.theme.sections.body_text') }}
              </h3>
              
              <p v-for="paragraph in bodyText" :key="paragraph.key" :style="paragraph.style">
                {{ t(paragraph.key) }}
              </p>
            </div>
          </section>

          <!-- Best Practices Section -->
          <section style="
            background: #e8f4f8;
            border-radius: 12px;
            padding: 40px;
            border-left: 4px solid #349CE7;
            margin-bottom: 40px;
          ">
            <h3 style="
              font-size: 20px;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 20px 0;
            ">
              💡 {{ t('translate.showcase.theme.sections.guidelines') }}
            </h3>

            <ul style="
              color: #3D647C;
              line-height: 1.8;
              margin: 0;
              padding-left: 20px;
            ">
              <li v-for="guideline in guidelines" :key="guideline">{{ t(guideline) }}</li>
            </ul>
          </section>

        </div>
      </div>
    `,
  }),
};
