import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
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
  render: () => ({
    components: { CInput },
    setup() {
      const { t } = useI18n()
      const fullName = ref('')
      return { fullName, t }
    },
    template: `
        <div style="max-width: 300px;">
          <c-input
            v-model="fullName"
            name="fullname"
            :label="t('translate.showcase.input.full_name')"
            :placeholder="t('translate.showcase.input.full_name_placeholder')"
          />
          <p style="margin-top: 16px; font-size: 12px; color: #999;">
            {{ t('translate.showcase.input.value') }} {{ fullName }}
          </p>
        </div>
      `,
  }),
}

export const Email: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const { t } = useI18n()
      const email = ref('')
      return { email, t }
    },
    template: `
        <div style="max-width: 300px;">
          <c-input
            v-model="email"
            name="email"
            type="email"
            :label="t('translate.showcase.input.email')"
            :placeholder="t('translate.showcase.input.email_placeholder')"
          />
          <p style="margin-top: 16px; font-size: 12px; color: #999;">
            {{ t('translate.showcase.input.value') }} {{ email }}
          </p>
        </div>
      `,
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const { t } = useI18n()
      const email = ref('user@example.com')
      return { email, t }
    },
    template: `
        <div style="max-width: 300px;">
          <c-input
            v-model="email"
            name="email"
            type="email"
            :label="t('translate.showcase.input.email')"
            :placeholder="t('translate.showcase.input.email_placeholder')"
          />
          <p style="margin-top: 16px; font-size: 12px; color: #999;">
            {{ t('translate.showcase.input.value') }} {{ email }}
          </p>
        </div>
      `,
  }),
}

export const Password: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const { t } = useI18n()
      const password = ref('')
      return { password, t }
    },
    template: `
        <div style="max-width: 300px;">
          <c-input
            v-model="password"
            name="password"
            type="password"
            :label="t('translate.showcase.input.password')"
            :placeholder="t('translate.showcase.input.password_placeholder')"
          />
        </div>
      `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const { t } = useI18n()
      const value = ref('Disabled value')
      return { value, t }
    },
    template: `
        <div style="max-width: 300px;">
          <c-input
            v-model="value"
            name="disabled"
            :label="t('translate.showcase.input.disabled_input')"
            disabled
          />
        </div>
      `,
  }),
}

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    modelValue: 'Invalid input',
    error: true,
  },
  render: args => ({
    components: { CInput },
    setup() {
      const { t } = useI18n()

      return { args, t }
    },
    template: '<div style="max-width: 300px;"><c-input v-bind="{ ...args, label: t(\'translate.showcase.input.with_error\'), modelValue: t(\'translate.showcase.input.invalid_input\') }" /></div>',
  }),
}
