import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'

import CAlert from './CAlert.vue'

const meta = {
  title: 'UI/CAlert',
  component: CAlert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'Alert type',
    },
    title: {
      control: { type: 'text' },
      description: 'Alert title',
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Show close button',
    },
  },
} satisfies Meta<typeof CAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    type: 'success',
  },
  render: args => ({
    components: { CAlert },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <c-alert v-bind="args" :title="args.title ?? t('translate.showcase.alert.success.title')">
        {{ t('translate.showcase.alert.success.message') }}
      </c-alert>
    `,
  }),
}

export const Error: Story = {
  args: {
    type: 'error',
  },
  render: args => ({
    components: { CAlert },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <c-alert v-bind="args" :title="args.title ?? t('translate.showcase.alert.error.title')">
        {{ t('translate.showcase.alert.error.message') }}
      </c-alert>
    `,
  }),
}

export const Warning: Story = {
  args: {
    type: 'warning',
  },
  render: args => ({
    components: { CAlert },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <c-alert v-bind="args" :title="args.title ?? t('translate.showcase.alert.warning.title')">
        {{ t('translate.showcase.alert.warning.message') }}
      </c-alert>
    `,
  }),
}

export const Info: Story = {
  args: {
    type: 'info',
  },
  render: args => ({
    components: { CAlert },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <c-alert v-bind="args" :title="args.title ?? t('translate.showcase.alert.info.title')">
        {{ t('translate.showcase.alert.info.message') }}
      </c-alert>
    `,
  }),
}

export const Closable: Story = {
  args: {
    type: 'info',
    closable: true,
  },
  render: args => ({
    components: { CAlert },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <c-alert v-bind="args" :title="args.title ?? t('translate.showcase.alert.closable.title')">
        {{ t('translate.showcase.alert.closable.message') }}
      </c-alert>
    `,
  }),
}
