import type { Meta, StoryObj } from '@storybook/vue3'
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
    template: `
      <div>
        <p>Content above divider</p>
        <c-divider />
        <p>Content below divider</p>
      </div>
    `,
  }),
}

export const WithText: Story = {
  args: {
    text: 'OR',
  },
  render: (args) => ({
    components: { CDivider },
    setup() {
      return { args }
    },
    template: `
      <div>
        <p>Sign in with email</p>
        <c-divider v-bind="args" />
        <p>Sign in with social account</p>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
  render: (args) => ({
    components: { CDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <span>Item 1</span>
        <c-divider v-bind="args" />
        <span>Item 2</span>
        <c-divider v-bind="args" />
        <span>Item 3</span>
      </div>
    `,
  }),
}
