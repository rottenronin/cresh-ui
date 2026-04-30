import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'
import CCard from './CCard.vue'

const meta = {
  title: 'UI/CCard',
  component: CCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Card title',
    },
    bordered: {
      control: { type: 'boolean' },
      description: 'Show card border',
    },
    shadow: {
      control: { type: 'boolean' },
      description: 'Show card shadow',
    },
  },
} satisfies Meta<typeof CCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { CCard },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <c-card v-bind="args" :title="args.title ?? t('translate.showcase.card.default.title')" style="max-width: 400px;">
        <p>{{ t('translate.showcase.card.default.content') }}</p>
      </c-card>
    `,
  }),
}

export const WithBorder: Story = {
  args: {
    bordered: true,
  },
  render: args => ({
    components: { CCard },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <c-card v-bind="args" :title="args.title ?? t('translate.showcase.card.with_border.title')" style="max-width: 400px;">
        <p>{{ t('translate.showcase.card.with_border.content') }}</p>
      </c-card>
    `,
  }),
}

export const WithShadow: Story = {
  args: {
    shadow: true,
  },
  render: args => ({
    components: { CCard },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <c-card v-bind="args" :title="args.title ?? t('translate.showcase.card.with_shadow.title')" style="max-width: 400px;">
        <p>{{ t('translate.showcase.card.with_shadow.content') }}</p>
      </c-card>
    `,
  }),
}

export const NoTitle: Story = {
  render: () => ({
    components: { CCard },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <c-card style="max-width: 400px;">
        <p>{{ t('translate.showcase.card.no_title.content') }}</p>
      </c-card>
    `,
  }),
}
