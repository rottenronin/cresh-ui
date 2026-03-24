import type { Meta, StoryObj } from '@storybook/vue3'
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
  args: {
    title: 'Card Title',
  },
  render: (args) => ({
    components: { CCard },
    setup() {
      return { args }
    },
    template: `
      <c-card v-bind="args" style="max-width: 400px;">
        <p>This is the card content. You can add any content here.</p>
      </c-card>
    `,
  }),
}

export const WithBorder: Story = {
  args: {
    title: 'Card with Border',
    bordered: true,
  },
  render: (args) => ({
    components: { CCard },
    setup() {
      return { args }
    },
    template: `
      <c-card v-bind="args" style="max-width: 400px;">
        <p>This card has a border.</p>
      </c-card>
    `,
  }),
}

export const WithShadow: Story = {
  args: {
    title: 'Card with Shadow',
    shadow: true,
  },
  render: (args) => ({
    components: { CCard },
    setup() {
      return { args }
    },
    template: `
      <c-card v-bind="args" style="max-width: 400px;">
        <p>This card has a shadow effect.</p>
      </c-card>
    `,
  }),
}

export const NoTitle: Story = {
  render: () => ({
    components: { CCard },
    template: `
      <c-card style="max-width: 400px;">
        <p>A card without a title.</p>
      </c-card>
    `,
  }),
}
