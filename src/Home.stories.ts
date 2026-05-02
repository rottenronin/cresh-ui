import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'

const meta = {
  title: 'Home',
  parameters: {
    layout: 'fullscreen',
    order: 0,
  },
  tags: ['!autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Welcome: Story = {
  render: () => ({
    template: `
      <div style="
        position: relative;
        width: 100%;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        overflow-y: auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      ">
        <div style="
          padding: 80px 20px 40px;
          min-height: 100%;
        ">
          <div style="
            max-width: 800px;
            text-align: center;
            animation: slideDown 0.6s ease-out;
            margin: 0 auto;
          ">
          <!-- Logo -->
          <div style="
            font-size: clamp(36px, 8vw, 48px);
            font-weight: 700;
            margin-bottom: 20px;
            letter-spacing: -1px;
          ">
            🎨 Cresh UI
          </div>

          <!-- Title -->
          <h1 style="
            font-size: clamp(28px, 6vw, 48px);
            font-weight: 700;
            margin: 0 0 20px 0;
            line-height: 1.2;
          ">
            {{ t('translate.showcase.home.title') }}
          </h1>

          <!-- Subtitle -->
          <p style="
            font-size: clamp(16px, 4vw, 20px);
            opacity: 0.95;
            margin: 0 0 40px 0;
            line-height: 1.6;
            font-weight: 300;
          ">
            {{ t('translate.showcase.home.subtitle_line_1') }}
            {{ t('translate.showcase.home.subtitle_line_2') }}
          </p>

          <!-- Features Grid -->
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 24px;
            margin: 60px 0;
          ">
            <div style="
              background: rgba(255, 255, 255, 0.1);
              padding: 24px;
              border-radius: 12px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
            ">
              <div style="font-size: clamp(24px, 5vw, 32px); margin-bottom: 8px;">⚡</div>
              <div style="font-weight: 600; margin-bottom: 8px; font-size: clamp(14px, 2vw, 16px);">{{ t('translate.showcase.home.features.performance.title') }}</div>
              <div style="font-size: clamp(12px, 1.5vw, 14px); opacity: 0.8;">{{ t('translate.showcase.home.features.performance.description') }}</div>
            </div>

            <div style="
              background: rgba(255, 255, 255, 0.1);
              padding: 24px;
              border-radius: 12px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
            ">
              <div style="font-size: clamp(24px, 5vw, 32px); margin-bottom: 8px;">🎯</div>
              <div style="font-weight: 600; margin-bottom: 8px; font-size: clamp(14px, 2vw, 16px);">{{ t('translate.showcase.home.features.ease.title') }}</div>
              <div style="font-size: clamp(12px, 1.5vw, 14px); opacity: 0.8;">{{ t('translate.showcase.home.features.ease.description') }}</div>
            </div>

            <div style="
              background: rgba(255, 255, 255, 0.1);
              padding: 24px;
              border-radius: 12px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
            ">
              <div style="font-size: clamp(24px, 5vw, 32px); margin-bottom: 8px;">📱</div>
              <div style="font-weight: 600; margin-bottom: 8px; font-size: clamp(14px, 2vw, 16px);">{{ t('translate.showcase.home.features.responsive.title') }}</div>
              <div style="font-size: clamp(12px, 1.5vw, 14px); opacity: 0.8;">{{ t('translate.showcase.home.features.responsive.description') }}</div>
            </div>
          </div>

          <!-- Component Categories -->
          <div style="margin: 60px 0; text-align: left; background: rgba(255, 255, 255, 0.05); padding: clamp(20px, 4vw, 40px); border-radius: 12px;">
            <h2 style="font-size: clamp(20px, 5vw, 28px); font-weight: 600; margin: 0 0 30px 0; text-align: center;">{{ t('translate.showcase.home.categories.title') }}</h2>
            
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
              gap: 20px;
            ">
              <div style="
                background: rgba(255, 255, 255, 0.1);
                padding: 16px;
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.15);
              ">
                <div style="font-weight: 600; margin-bottom: 8px; font-size: clamp(13px, 2vw, 15px);">{{ t('translate.showcase.home.categories.ui.title') }}</div>
                <div style="font-size: clamp(11px, 1.5vw, 13px); opacity: 0.8;">{{ t('translate.showcase.home.categories.ui.description') }}</div>
              </div>

              <div style="
                background: rgba(255, 255, 255, 0.1);
                padding: 16px;
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.15);
              ">
                <div style="font-weight: 600; margin-bottom: 8px; font-size: clamp(13px, 2vw, 15px);">{{ t('translate.showcase.home.categories.form.title') }}</div>
                <div style="font-size: clamp(11px, 1.5vw, 13px); opacity: 0.8;">{{ t('translate.showcase.home.categories.form.description') }}</div>
              </div>

              <div style="
                background: rgba(255, 255, 255, 0.1);
                padding: 16px;
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.15);
              ">
                <div style="font-weight: 600; margin-bottom: 8px; font-size: clamp(13px, 2vw, 15px);">{{ t('translate.showcase.home.categories.icons.title') }}</div>
                <div style="font-size: clamp(11px, 1.5vw, 13px); opacity: 0.8;">{{ t('translate.showcase.home.categories.icons.description') }}</div>
              </div>

              <div style="
                background: rgba(255, 255, 255, 0.1);
                padding: 16px;
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.15);
              ">
                <div style="font-weight: 600; margin-bottom: 8px; font-size: clamp(13px, 2vw, 15px);">{{ t('translate.showcase.home.categories.charts.title') }}</div>
                <div style="font-size: clamp(11px, 1.5vw, 13px); opacity: 0.8;">{{ t('translate.showcase.home.categories.charts.description') }}</div>
              </div>
            </div>
          </div>

          <!-- Get Started Button -->
          <div style="margin: 60px 0;">
            <button 
              @click="goToGettingStarted"
              style="
                background: white;
                color: #667eea;
                border: none;
                padding: clamp(12px, 3vw, 16px) clamp(24px, 6vw, 40px);
                border-radius: 8px;
                font-size: clamp(14px, 3vw, 18px);
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
              "
              @mouseover="$event.target.style.transform = 'translateY(-4px)'; $event.target.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3)'"
              @mouseout="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'"
            >
              🚀 {{ t('translate.showcase.home.cta') }}
            </button>
          </div>

          <!-- Links -->
          <div style="
            margin-top: 60px;
            padding-top: 40px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
          ">
            <a href="https://github.com/rottenronin/cresh-ui" target="_blank" style="
              color: white;
              text-decoration: none;
              border: 2px solid rgba(255, 255, 255, 0.3);
              padding: clamp(8px, 2vw, 10px) clamp(16px, 3vw, 20px);
              border-radius: 6px;
              font-weight: 500;
              font-size: clamp(12px, 2vw, 14px);
              transition: all 0.3s ease;
              cursor: pointer;
            " onmouseover="this.style.background = 'rgba(255, 255, 255, 0.1)'" onmouseout="this.style.background = 'transparent'">
              📚 GitHub
            </a>
            <a href="https://www.npmjs.com/package/@long2x/cresh-ui" target="_blank" style="
              color: white;
              text-decoration: none;
              border: 2px solid rgba(255, 255, 255, 0.3);
              padding: clamp(8px, 2vw, 10px) clamp(16px, 3vw, 20px);
              border-radius: 6px;
              font-weight: 500;
              font-size: clamp(12px, 2vw, 14px);
              transition: all 0.3s ease;
              cursor: pointer;
            " onmouseover="this.style.background = 'rgba(255, 255, 255, 0.1)'" onmouseout="this.style.background = 'transparent'">
              📦 NPM
            </a>
          </div>

          <!-- Footer -->
          <div style="
            margin-top: 60px;
            padding-top: 40px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            font-size: clamp(11px, 2vw, 13px);
            opacity: 0.7;
          ">
            <p style="margin: 0;">{{ t('translate.showcase.home.footer.made_with') }}</p>
            <p style="margin: 5px 0 0 0;">{{ t('translate.showcase.home.footer.license') }}</p>
          </div>
        </div>
        </div>

        <style>
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        </style>
      </div>
    `,
    setup() {
      const { t } = useI18n()
      const goToGettingStarted = () => {
        window.location.href = '?path=/story/getting-started--quick-start'
      }
      return { goToGettingStarted, t }
    },
  }),
}
