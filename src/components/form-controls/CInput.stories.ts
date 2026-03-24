import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CInput from './CInput.vue'

const meta = {
  title: 'Form Controls/CInput',
  component: CInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'The input value (v-model binding)',
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the input field',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel'],
      description: 'Input type',
    },
    name: {
      control: { type: 'text' },
      description: 'Input name attribute',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the input',
    },
  },
} satisfies Meta<typeof CInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return {
      components: { CInput },
      setup() {
        const fullName = ref('')
        return { fullName }
      },
      template: `
        <div style="max-width: 300px;">
          <c-input
            v-model="fullName"
            name="fullname"
            label="Full Name"
            placeholder="Enter your full name"
          />
          <p style="margin-top: 16px; font-size: 12px; color: #999;">
            Value: {{ fullName }}
          </p>
        </div>
      `,
    }
  },
}

export const Email: Story = {
  render: () => {
    return {
      components: { CInput },
      setup() {
        const email = ref('')
        return { email }
      },
      template: `
        <div style="max-width: 300px;">
          <c-input
            v-model="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <p style="margin-top: 16px; font-size: 12px; color: #999;">
            Value: {{ email }}
          </p>
        </div>
      `,
    }
  },
}

export const WithValue: Story = {
  render: () => {
    return {
      components: { CInput },
      setup() {
        const email = ref('user@example.com')
        return { email }
      },
      template: `
        <div style="max-width: 300px;">
          <c-input
            v-model="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <p style="margin-top: 16px; font-size: 12px; color: #999;">
            Value: {{ email }}
          </p>
        </div>
      `,
    }
  },
}

export const Password: Story = {
  render: () => {
    return {
      components: { CInput },
      setup() {
        const password = ref('')
        return { password }
      },
      template: `
        <div style="max-width: 300px;">
          <c-input
            v-model="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
          />
        </div>
      `,
    }
  },
}

export const Disabled: Story = {
  render: () => {
    return {
      components: { CInput },
      setup() {
        const value = ref('Disabled value')
        return { value }
      },
      template: `
        <div style="max-width: 300px;">
          <c-input
            v-model="value"
            name="disabled"
            label="Disabled Input"
            disabled
          />
        </div>
      `,
    }
  },
}

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    modelValue: 'Invalid input',
    error: true,
  },
}
