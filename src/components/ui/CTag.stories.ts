import type { Meta, StoryObj } from '@storybook/vue3'
import CTag from './CTag.vue'

const meta = {
  title: 'UI/CTag',
  component: CTag,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Tag type/color',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tag size',
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
    type: 'primary',
  },
  render: (args) => ({
    components: { CTag },
    setup() {
      return { args }
    },
    template: '<c-tag v-bind="args">Primary Tag</c-tag>',
  }),
}

export const Success: Story = {
  args: {
    type: 'success',
  },
  render: (args) => ({
    components: { CTag },
    setup() {
      return { args }
    },
    template: '<c-tag v-bind="args">Active</c-tag>',
  }),
}

export const Warning: Story = {
  args: {
    type: 'warning',
  },
  render: (args) => ({
    components: { CTag },
    setup() {
      return { args }
    },
    template: '<c-tag v-bind="args">Pending</c-tag>',
  }),
}

export const Error: Story = {
  args: {
    type: 'error',
  },
  render: (args) => ({
    components: { CTag },
    setup() {
      return { args }
    },
    template: '<c-tag v-bind="args">Inactive</c-tag>',
  }),
}

export const Closable: Story = {
  args: {
    type: 'info',
    closable: true,
  },
  render: (args) => ({
    components: { CTag },
    setup() {
      return { args }
    },
    template: '<c-tag v-bind="args">Closable Tag</c-tag>',
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { CTag },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <c-tag type="primary">Vue</c-tag>
        <c-tag type="success">Active</c-tag>
        <c-tag type="warning">Beta</c-tag>
        <c-tag type="error">Deprecated</c-tag>
      </div>
    `,
  }),
}
