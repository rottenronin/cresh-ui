import type { Meta, StoryObj } from '@storybook/vue3'

import CButton from './CButton.vue'

const meta = {
  title: 'UI/CButton',
  component: CButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'success', 'warning'],
      description: 'Button variant/style',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
  },
} satisfies Meta<typeof CButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: args => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<c-button v-bind="args">Primary Button</c-button>',
  }),
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: args => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<c-button v-bind="args">Secondary Button</c-button>',
  }),
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  render: args => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<c-button v-bind="args">Delete</c-button>',
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<c-button v-bind="args">Disabled Button</c-button>',
  }),
}

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: args => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<c-button v-bind="args">Loading...</c-button>',
  }),
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: args => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<c-button v-bind="args">Small</c-button>',
  }),
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: args => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<c-button v-bind="args">Large Button</c-button>',
  }),
}
