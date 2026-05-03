import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'

import CDivider from './CDivider.vue'

const meta = {
  title: 'UI/CDivider',
  component: CDivider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Divider direction',
    },
    text: {
      control: { type: 'text' },
      description: 'Optional text to display',
    },
  },
} satisfies Meta<typeof CDivider>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => ({
    components: { CDivider },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <div>
        <p>{{ t('translate.showcase.divider.horizontal.above') }}</p>
        <c-divider />
        <p>{{ t('translate.showcase.divider.horizontal.below') }}</p>
      </div>
    `,
  }),
}

export const WithText: Story = {
  render: args => ({
    components: { CDivider },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div>
        <p>{{ t('translate.showcase.divider.with_text.email') }}</p>
        <c-divider v-bind="args" :text="args.text ?? t('translate.showcase.divider.with_text.or')" />
        <p>{{ t('translate.showcase.divider.with_text.social') }}</p>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
  render: args => ({
    components: { CDivider },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <span>{{ t('translate.showcase.divider.vertical.item_1') }}</span>
        <c-divider v-bind="args" />
        <span>{{ t('translate.showcase.divider.vertical.item_2') }}</span>
        <c-divider v-bind="args" />
        <span>{{ t('translate.showcase.divider.vertical.item_3') }}</span>
      </div>
    `,
  }),
}
