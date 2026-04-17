import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'

const meta = {
  title: 'Getting Started',
  parameters: {
    layout: 'fullscreen',
    order: 1,
  },
  tags: ['!autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const QuickStart: Story = {
  render: () => ({
    template: `
      <div style="
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        padding: 40px 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      ">
        <div style="max-width: 900px; margin: 0 auto;">
          <!-- Header -->
          <div style="
            text-align: center;
            margin-bottom: 60px;
          ">
            <h1 style="
              font-size: 44px;
              font-weight: 700;
              color: #2c3e50;
              margin: 0 0 20px 0;
            ">
              {{ t('translate.showcase.getting_started.title') }}
            </h1>
            <p style="
              font-size: 16px;
              color: #666;
              margin: 0;
              line-height: 1.6;
            ">
              {{ t('translate.showcase.getting_started.subtitle') }}
            </p>
          </div>

          <!-- Installation Section -->
          <section style="
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          ">
            <h2 style="
              font-size: 28px;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 20px 0;
              padding-bottom: 10px;
              border-bottom: 2px solid #667eea;
            ">
              1. {{ t('translate.showcase.getting_started.installation.title') }}
            </h2>
            
            <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
              {{ t('translate.showcase.getting_started.installation.description') }}
            </p>

            <div style="
              background: #f5f5f5;
              padding: 16px;
              border-radius: 8px;
              font-family: 'Courier New', monospace;
              font-size: 14px;
              overflow-x: auto;
              margin-bottom: 20px;
              border-left: 4px solid #667eea;
            ">
              npm install @long2x/cresh-ui
            </div>

            <p style="color: #666; line-height: 1.6; margin: 0;">
              {{ t('translate.showcase.getting_started.installation.alternative') }}
            </p>

            <div style="
              background: #f5f5f5;
              padding: 16px;
              border-radius: 8px;
              font-family: 'Courier New', monospace;
              font-size: 14px;
              overflow-x: auto;
              border-left: 4px solid #667eea;
            ">
              yarn add @long2x/cresh-ui
            </div>
          </section>

          <!-- Setup Section -->
          <section style="
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          ">
            <h2 style="
              font-size: 28px;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 20px 0;
              padding-bottom: 10px;
              border-bottom: 2px solid #667eea;
            ">
              2. {{ t('translate.showcase.getting_started.setup.title') }}
            </h2>
            
            <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
              {{ t('translate.showcase.getting_started.setup.description') }}
            </p>

            <div style="
              background: #f5f5f5;
              padding: 16px;
              border-radius: 8px;
              font-family: 'Courier New', monospace;
              font-size: 13px;
              overflow-x: auto;
              margin-bottom: 20px;
              border-left: 4px solid #667eea;
            ">
              <div>import { createApp } from 'vue'</div>
              <div>import CreshUI from '@long2x/cresh-ui'</div>
              <div>import '@long2x/cresh-ui/dist/default-theme.css'</div>
              <div>import App from './App.vue'</div>
              <div></div>
              <div>const app = createApp(App)</div>
              <div>app.use(CreshUI)</div>
              <div>app.mount('#app')</div>
            </div>

            <p style="color: #999; font-size: 13px; margin: 0;">
              💡 {{ t('translate.showcase.getting_started.setup.note') }}
            </p>
          </section>

          <!-- Usage Examples Section -->
          <section style="
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          ">
            <h2 style="
              font-size: 28px;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 30px 0;
              padding-bottom: 10px;
              border-bottom: 2px solid #667eea;
            ">
              3. {{ t('translate.showcase.getting_started.usage.title') }}
            </h2>

            <!-- Form Input Example -->
            <div style="margin-bottom: 40px;">
              <h3 style="
                font-size: 18px;
                font-weight: 600;
                color: #2c3e50;
                margin: 0 0 12px 0;
              ">
                {{ t('translate.showcase.getting_started.usage.form_input') }}
              </h3>
              <div style="
                background: #f5f5f5;
                padding: 16px;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                font-size: 13px;
                overflow-x: auto;
                border-left: 4px solid #667eea;
              ">
                <div>&lt;template&gt;</div>
                <div style="margin-left: 16px;">&lt;div&gt;</div>
                <div style="margin-left: 32px;">&lt;c-input</div>
                <div style="margin-left: 48px;">v-model="name"</div>
                <div style="margin-left: 48px;">label="{{ t('translate.showcase.getting_started.usage.full_name') }}"</div>
                <div style="margin-left: 48px;">placeholder="{{ t('translate.showcase.getting_started.usage.enter_name') }}"</div>
                <div style="margin-left: 32px;"/&gt;</div>
                <div style="margin-left: 16px;">&lt;/div&gt;</div>
                <div>&lt;/template&gt;</div>
              </div>
            </div>

            <!-- Select Example -->
            <div style="margin-bottom: 40px;">
              <h3 style="
                font-size: 18px;
                font-weight: 600;
                color: #2c3e50;
                margin: 0 0 12px 0;
              ">
                {{ t('translate.showcase.getting_started.usage.select_dropdown') }}
              </h3>
              <div style="
                background: #f5f5f5;
                padding: 16px;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                font-size: 13px;
                overflow-x: auto;
                border-left: 4px solid #667eea;
              ">
                <div>&lt;template&gt;</div>
                <div style="margin-left: 16px;">&lt;c-select</div>
                <div style="margin-left: 32px;">v-model="selectedOption"</div>
                <div style="margin-left: 32px;">:options="options"</div>
                <div style="margin-left: 32px;">label="{{ t('translate.showcase.getting_started.usage.choose_one') }}"</div>
                <div style="margin-left: 16px;"/&gt;</div>
                <div>&lt;/template&gt;</div>
              </div>
            </div>

            <!-- Button Example -->
            <div style="margin-bottom: 40px;">
              <h3 style="
                font-size: 18px;
                font-weight: 600;
                color: #2c3e50;
                margin: 0 0 12px 0;
              ">
                {{ t('translate.showcase.getting_started.usage.button') }}
              </h3>
              <div style="
                background: #f5f5f5;
                padding: 16px;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                font-size: 13px;
                overflow-x: auto;
                border-left: 4px solid #667eea;
              ">
                <div>&lt;template&gt;</div>
                <div style="margin-left: 16px;">&lt;c-button</div>
                <div style="margin-left: 32px;">@click="handleClick"</div>
                <div style="margin-left: 32px;">variant="primary"</div>
                <div style="margin-left: 16px;">&gt;</div>
                <div style="margin-left: 32px;">{{ t('translate.showcase.getting_started.usage.click_me') }}</div>
                <div style="margin-left: 16px;">&lt;/c-button&gt;</div>
                <div>&lt;/template&gt;</div>
              </div>
            </div>

            <!-- Icon Example -->
            <div>
              <h3 style="
                font-size: 18px;
                font-weight: 600;
                color: #2c3e50;
                margin: 0 0 12px 0;
              ">
                {{ t('translate.showcase.getting_started.usage.icons') }}
              </h3>
              <div style="
                background: #f5f5f5;
                padding: 16px;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                font-size: 13px;
                overflow-x: auto;
                border-left: 4px solid #667eea;
              ">
                <div>&lt;template&gt;</div>
                <div style="margin-left: 16px;">&lt;c-icon</div>
                <div style="margin-left: 32px;">name="check"</div>
                <div style="margin-left: 32px;">color="#00ECCB"</div>
                <div style="margin-left: 32px;">:width="24"</div>
                <div style="margin-left: 32px;">:height="24"</div>
                <div style="margin-left: 16px;"/&gt;</div>
                <div>&lt;/template&gt;</div>
              </div>
            </div>
          </section>

          <!-- Component Categories Section -->
          <section style="
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          ">
            <h2 style="
              font-size: 28px;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 30px 0;
              padding-bottom: 10px;
              border-bottom: 2px solid #667eea;
            ">
              4. {{ t('translate.showcase.getting_started.explore.title') }}
            </h2>

            <p style="color: #666; line-height: 1.6; margin: 0 0 30px 0;">
              {{ t('translate.showcase.getting_started.explore.description') }}
            </p>

            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 20px;
            ">
              <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 8px;
              ">
                <div style="font-weight: 600; margin-bottom: 8px;">🎨 {{ t('translate.showcase.getting_started.explore.ui.title') }}</div>
                <div style="font-size: 13px; opacity: 0.9;">{{ t('translate.showcase.getting_started.explore.ui.description') }}</div>
              </div>

              <div style="
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                padding: 20px;
                border-radius: 8px;
              ">
                <div style="font-weight: 600; margin-bottom: 8px;">✏️ {{ t('translate.showcase.getting_started.explore.form.title') }}</div>
                <div style="font-size: 13px; opacity: 0.9;">{{ t('translate.showcase.getting_started.explore.form.description') }}</div>
              </div>

              <div style="
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                color: white;
                padding: 20px;
                border-radius: 8px;
              ">
                <div style="font-weight: 600; margin-bottom: 8px;">🎯 {{ t('translate.showcase.getting_started.explore.icons.title') }}</div>
                <div style="font-size: 13px; opacity: 0.9;">{{ t('translate.showcase.getting_started.explore.icons.description') }}</div>
              </div>

              <div style="
                background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
                color: white;
                padding: 20px;
                border-radius: 8px;
              ">
                <div style="font-weight: 600; margin-bottom: 8px;">📊 {{ t('translate.showcase.getting_started.explore.charts.title') }}</div>
                <div style="font-size: 13px; opacity: 0.9;">{{ t('translate.showcase.getting_started.explore.charts.description') }}</div>
              </div>
            </div>
          </section>

          <!-- Tips Section -->
          <section style="
            background: #e8f4f8;
            border-radius: 12px;
            padding: 40px;
            border-left: 4px solid #667eea;
            margin-bottom: 40px;
          ">
            <h3 style="
              font-size: 20px;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 20px 0;
            ">
              💡 {{ t('translate.showcase.getting_started.tips.title') }}
            </h3>

            <ul style="
              color: #666;
              line-height: 1.8;
              margin: 0;
              padding-left: 20px;
            ">
              <li><strong>{{ t('translate.showcase.getting_started.tips.use_v_model_title') }}</strong> {{ t('translate.showcase.getting_started.tips.use_v_model_description') }}</li>
              <li><strong>{{ t('translate.showcase.getting_started.tips.check_storybook_title') }}</strong> {{ t('translate.showcase.getting_started.tips.check_storybook_description') }}</li>
              <li><strong>{{ t('translate.showcase.getting_started.tips.import_styles_title') }}</strong> {{ t('translate.showcase.getting_started.tips.import_styles_description') }}</li>
              <li><strong>{{ t('translate.showcase.getting_started.tips.customize_themes_title') }}</strong> {{ t('translate.showcase.getting_started.tips.customize_themes_description') }}</li>
              <li><strong>{{ t('translate.showcase.getting_started.tips.use_typescript_title') }}</strong> {{ t('translate.showcase.getting_started.tips.use_typescript_description') }}</li>
            </ul>
          </section>

          <!-- Resources Section -->
          <section style="
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
          ">
            <h2 style="
              font-size: 28px;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 30px 0;
              padding-bottom: 10px;
              border-bottom: 2px solid #667eea;
            ">
              5. {{ t('translate.showcase.getting_started.resources.title') }}
            </h2>

            <div style="
              display: flex;
              gap: 20px;
              justify-content: center;
              flex-wrap: wrap;
            ">
              <a href="https://github.com/rottenronin/cresh-ui" target="_blank" style="
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-weight: 500;
                transition: transform 0.2s;
                cursor: pointer;
              " onmouseover="this.style.transform = 'translateY(-2px)'" onmouseout="this.style.transform = 'translateY(0)'">
                📚 {{ t('translate.showcase.getting_started.resources.github') }}
              </a>
              <a href="https://www.npmjs.com/package/@long2x/cresh-ui" target="_blank" style="
                display: inline-block;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-weight: 500;
                transition: transform 0.2s;
                cursor: pointer;
              " onmouseover="this.style.transform = 'translateY(-2px)'" onmouseout="this.style.transform = 'translateY(0)'">
                📦 {{ t('translate.showcase.getting_started.resources.npm') }}
              </a>
            </div>

            <p style="
              color: #999;
              font-size: 13px;
              margin: 40px 0 0 0;
            ">
              {{ t('translate.showcase.getting_started.resources.help') }}
            </p>
          </section>

        </div>
      </div>
    `,
    setup() {
      const { t } = useI18n()

      return { t }
    },
  }),
}
