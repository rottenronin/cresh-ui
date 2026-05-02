import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'
import CHeader from './CHeader.vue'

const meta = {
  title: 'UI/CHeader',
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
      <c-header>
        <template #title>
          <h1>{{ t('translate.showcase.header.simple.title') }}</h1>
        </template>
      </c-header>
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
      <c-header>
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <h1>{{ t('translate.showcase.header.default_slot.title') }}</h1>
          <span>{{ t('translate.showcase.header.default_slot.welcome') }}</span>
        </div>
      </c-header>
    `,
  }),
}

export const WithTitleSlot: Story = {
  render: () => ({
    components: { CHeader },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <c-header>
        <template #title>
          <div>
            <h2>{{ t('translate.showcase.header.tabs.title') }}</h2>
            <div style="display: flex; gap: 16px; margin-top: 8px;">
              <button style="border: none; background: none; color: #667eea; cursor: pointer; font-weight: 600; padding: 0;">Tab 1</button>
              <button style="border: none; background: none; color: #999; cursor: pointer; padding: 0;">Tab 2</button>
            </div>
          </div>
        </template>
      </c-header>
    `,
  }),
}
