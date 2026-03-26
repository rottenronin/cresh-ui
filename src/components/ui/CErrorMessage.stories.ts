import type { Meta, StoryObj } from '@storybook/vue3'
import CErrorMessage from './CErrorMessage.vue'

const meta = {
  title: 'UI / Error Message',
  component: CErrorMessage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: { type: 'object' },
      description: 'Error message (string, array, or object with message property)',
    },
    hideIcon: {
      control: { type: 'boolean' },
      description: 'Hide the error icon',
    },
  },
} satisfies Meta<typeof CErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

export const StringError: Story = {
  args: {
    error: 'Something went wrong. Please try again.',
    hideIcon: false,
  },
  render: (args) => ({
    components: { CErrorMessage },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 500px;">
        <c-error-message v-bind="args" />
      </div>
    `,
  }),
}

export const ArrayError: Story = {
  args: {
    error: [
      'Email is required',
      'Email should be valid',
      'Password must be at least 8 characters',
    ],
    hideIcon: false,
  },
  render: (args) => ({
    components: { CErrorMessage },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 500px;">
        <c-error-message v-bind="args" />
      </div>
    `,
  }),
}

export const ObjectError: Story = {
  args: {
    error: {
      message: 'Authentication failed. Invalid credentials.',
      code: 'AUTH_FAILED',
    },
    hideIcon: false,
  },
  render: (args) => ({
    components: { CErrorMessage },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 500px;">
        <c-error-message v-bind="args" />
      </div>
    `,
  }),
}

export const HideIcon: Story = {
  args: {
    error: 'This error message does not display an icon.',
    hideIcon: true,
  },
  render: (args) => ({
    components: { CErrorMessage },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 500px;">
        <c-error-message v-bind="args" />
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  args: {
    hideIcon: false,
  },
  render: (args) => ({
    components: { CErrorMessage },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 500px;">
        <c-error-message v-bind="args">
          <div>
            <strong>Validation Error</strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px;">
              <li>Field is required</li>
              <li>Must be at least 5 characters</li>
            </ul>
          </div>
        </c-error-message>
      </div>
    `,
  }),
}

export const FormValidationErrors: Story = {
  args: {
    error: [
      'First name is required',
      'Last name is required',
      'Email format is invalid',
      'Password is too weak',
    ],
    hideIcon: false,
  },
  render: (args) => ({
    components: { CErrorMessage },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">Form Validation</h3>
        <form style="display: grid; gap: 12px; margin-bottom: 16px;">
          <input type="text" placeholder="First name" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          <input type="text" placeholder="Last name" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          <input type="email" placeholder="Email" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          <input type="password" placeholder="Password" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
        </form>
        <c-error-message v-bind="args" />
      </div>
    `,
  }),
}
