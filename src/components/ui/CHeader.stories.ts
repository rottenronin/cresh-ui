import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'
import CHeader from './CHeader.vue'

const meta = {
  title: 'UI / Header',
  component: CHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: () => ({
    components: { CHeader },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <div>
        <c-header>
          <template #title>
            <h1 style="margin: 0;">{{ t('translate.showcase.header.simple.title') }}</h1>
          </template>
        </c-header>
        <div style="padding: 20px;">
          <p>{{ t('translate.showcase.header.simple.content') }}</p>
        </div>
      </div>
    `,
  }),
}

export const WithDefaultSlot: Story = {
  render: () => ({
    components: { CHeader },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <div>
        <c-header>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <h1 style="margin: 0;">{{ t('translate.showcase.header.default_slot.title') }}</h1>
            <div style="color: #666;">{{ t('translate.showcase.header.default_slot.welcome') }}</div>
          </div>
        </c-header>
        <div style="padding: 20px;">
          <p>{{ t('translate.showcase.header.default_slot.content') }}</p>
        </div>
      </div>
    `,
  }),
}

export const WithNavigation: Story = {
  render: () => ({
    components: { CHeader },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <div>
        <c-header>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 20px;">
            <h1 style="margin: 0; flex: 1;">{{ t('translate.showcase.header.navigation.title') }}</h1>
            <nav style="display: flex; gap: 20px;">
              <a href="#" style="color: #667eea; text-decoration: none; font-weight: 500;">{{ t('translate.showcase.header.navigation.home') }}</a>
              <a href="#" style="color: #667eea; text-decoration: none; font-weight: 500;">{{ t('translate.showcase.header.navigation.about') }}</a>
              <a href="#" style="color: #667eea; text-decoration: none; font-weight: 500;">{{ t('translate.showcase.header.navigation.services') }}</a>
              <a href="#" style="color: #667eea; text-decoration: none; font-weight: 500;">{{ t('translate.showcase.header.navigation.contact') }}</a>
            </nav>
            <button style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
              {{ t('translate.showcase.header.navigation.sign_in') }}
            </button>
          </div>
        </c-header>
        <div style="padding: 20px;">
          <p>{{ t('translate.showcase.header.navigation.content') }}</p>
        </div>
      </div>
    `,
  }),
}

export const WithBadges: Story = {
  render: () => ({
    components: { CHeader },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <div>
        <c-header>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <h1 style="margin: 0;">{{ t('translate.showcase.header.badges.title') }}</h1>
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="position: relative;">
                <span style="cursor: pointer; font-size: 20px;">📧</span>
                <span style="position: absolute; top: -5px; right: -8px; background: #ff6b6b; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">3</span>
              </div>
              <div style="position: relative;">
                <span style="cursor: pointer; font-size: 20px;">🔔</span>
                <span style="position: absolute; top: -5px; right: -8px; background: #ff6b6b; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">5</span>
              </div>
              <div style="width: 36px; height: 36px; border-radius: 50%; background: #667eea; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; cursor: pointer;">JD</div>
            </div>
          </div>
        </c-header>
        <div style="padding: 20px;">
          <p>{{ t('translate.showcase.header.badges.content') }}</p>
        </div>
      </div>
    `,
  }),
}

export const SearchBar: Story = {
  render: () => ({
    components: { CHeader },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <div>
        <c-header>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 20px;">
            <h1 style="margin: 0;">{{ t('translate.showcase.header.search.title') }}</h1>
            <input
              type="search"
              :placeholder="t('translate.showcase.header.search.placeholder')"
              style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; width: 300px;"
            />
            <button style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
              {{ t('translate.showcase.header.search.filter') }}
            </button>
          </div>
        </c-header>
        <div style="padding: 20px;">
          <p>{{ t('translate.showcase.header.search.content') }}</p>
        </div>
      </div>
    `,
  }),
}

export const DemoWithTab: Story = {
  render: () => ({
    components: { CHeader },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <div>
        <c-header>
          <template #title>
            <div>
              <h2 style="margin: 0 0 12px 0;">{{ t('translate.showcase.header.tabs.title') }}</h2>
              <div style="display: flex; gap: 16px; border-bottom: 2px solid #f0f0f0;">
                <button style="padding: 8px 12px; border: none; background: none; color: #667eea; font-weight: 600; cursor: pointer; border-bottom: 3px solid #667eea; margin-bottom: -2px;">
                  {{ t('translate.showcase.header.tabs.all') }}
                </button>
                <button style="padding: 8px 12px; border: none; background: none; color: #999; cursor: pointer;">
                  {{ t('translate.showcase.header.tabs.active') }}
                </button>
                <button style="padding: 8px 12px; border: none; background: none; color: #999; cursor: pointer;">
                  {{ t('translate.showcase.header.tabs.archived') }}
                </button>
              </div>
            </div>
          </template>
        </c-header>
        <div style="padding: 20px;">
          <p>{{ t('translate.showcase.header.tabs.content') }}</p>
        </div>
      </div>
    `,
  }),
}

export const Colored: Story = {
  render: () => ({
    components: { CHeader },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <div>
        <c-header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-bottom: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <h1 style="margin: 0; color: white;">{{ t('translate.showcase.header.colored.title') }}</h1>
            <button style="padding: 8px 16px; background: white; color: #667eea; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
              {{ t('translate.showcase.header.colored.upgrade') }}
            </button>
          </div>
        </c-header>
        <div style="padding: 20px;">
          <p>{{ t('translate.showcase.header.colored.content') }}</p>
        </div>
      </div>
    `,
  }),
}
