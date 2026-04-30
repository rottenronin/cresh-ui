import type { Meta, StoryObj } from '@storybook/vue3'
import CSpinner from './CSpinner.vue'

const meta = {
  title: 'UI/CSpinner',
  component: CSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    color: {
      control: { type: 'text' },
      description: 'Spinner color',
    },
  },
} satisfies Meta<typeof CSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { CSpinner },
    template: '<c-spinner />',
  }),
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: args => ({
    components: { CSpinner },
    setup() {
      return { args }
    },
    template: '<c-spinner v-bind="args" />',
  }),
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
  render: args => ({
    components: { CSpinner },
    setup() {
      return { args }
    },
    template: '<c-spinner v-bind="args" />',
  }),
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: args => ({
    components: { CSpinner },
    setup() {
      return { args }
    },
    template: '<c-spinner v-bind="args" />',
  }),
}

export const WithText: Story = {
  render: () => ({
    components: { CSpinner },
    template: `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
        <c-spinner size="md" />
        <p>Loading...</p>
      </div>
    `,
  }),
}
