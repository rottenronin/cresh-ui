import type { Meta, StoryObj } from '@storybook/vue3'
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
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the input',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Show error state',
    },
  },
} satisfies Meta<typeof CInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Email',
    modelValue: 'user@example.com',
    placeholder: 'Enter your email',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    modelValue: 'Disabled value',
    disabled: true,
  },
}

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    modelValue: 'Invalid input',
    error: true,
  },
}
