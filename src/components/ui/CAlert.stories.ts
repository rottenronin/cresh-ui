import type { Meta, StoryObj } from '@storybook/vue3'
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
    title: 'Success!',
  },
  render: (args) => ({
    components: { CAlert },
    setup() {
      return { args }
    },
    template: '<c-alert v-bind="args">Operation completed successfully!</c-alert>',
  }),
}

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
  },
  render: (args) => ({
    components: { CAlert },
    setup() {
      return { args }
    },
    template: '<c-alert v-bind="args">Something went wrong. Please try again.</c-alert>',
  }),
}

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
  },
  render: (args) => ({
    components: { CAlert },
    setup() {
      return { args }
    },
    template: '<c-alert v-bind="args">Please review this action before proceeding.</c-alert>',
  }),
}

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
  },
  render: (args) => ({
    components: { CAlert },
    setup() {
      return { args }
    },
    template: '<c-alert v-bind="args">This is an informational message.</c-alert>',
  }),
}

export const Closable: Story = {
  args: {
    type: 'info',
    title: 'Closable Alert',
    closable: true,
  },
  render: (args) => ({
    components: { CAlert },
    setup() {
      return { args }
    },
    template: '<c-alert v-bind="args">You can close this alert by clicking the X button.</c-alert>',
  }),
}
