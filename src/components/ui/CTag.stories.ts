import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'

import CTag from './CTag.vue'

const meta = {
  title: 'UI/CTag',
  component: CTag,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Tag color/type',
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Show close button',
    },
  },
} satisfies Meta<typeof CTag>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    color: 'primary',
  },
  render: args => ({
    components: { CTag },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: '<c-tag v-bind="args">{{ t(\'translate.showcase.tag.primary\') }}</c-tag>',
  }),
}

export const Success: Story = {
  args: {
    color: 'success',
  },
  render: args => ({
    components: { CTag },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: '<c-tag v-bind="args">{{ t(\'translate.showcase.tag.success\') }}</c-tag>',
  }),
}

export const Warning: Story = {
  args: {
    color: 'warning',
  },
  render: args => ({
    components: { CTag },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: '<c-tag v-bind="args">{{ t(\'translate.showcase.tag.warning\') }}</c-tag>',
  }),
}

export const Error: Story = {
  args: {
    color: 'error',
  },
  render: args => ({
    components: { CTag },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: '<c-tag v-bind="args">{{ t(\'translate.showcase.tag.error\') }}</c-tag>',
  }),
}

export const Closable: Story = {
  args: {
    color: 'info',
    closable: true,
  },
  render: args => ({
    components: { CTag },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: '<c-tag v-bind="args">{{ t(\'translate.showcase.tag.closable\') }}</c-tag>',
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { CTag },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <c-tag color="primary">{{ t('translate.showcase.tag.multiple.vue') }}</c-tag>
        <c-tag color="success">{{ t('translate.showcase.tag.multiple.active') }}</c-tag>
        <c-tag color="warning">{{ t('translate.showcase.tag.multiple.beta') }}</c-tag>
        <c-tag color="error">{{ t('translate.showcase.tag.multiple.deprecated') }}</c-tag>
      </div>
    `,
  }),
}
