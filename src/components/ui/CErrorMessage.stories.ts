import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'
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
    hideIcon: false,
  },
  render: (args) => ({
    components: { CErrorMessage },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="max-width: 500px;">
        <c-error-message v-bind="args" :error="args.error ?? t('translate.showcase.error_message.string_error.message')" />
      </div>
    `,
  }),
}

export const ArrayError: Story = {
  args: {
    hideIcon: false,
  },
  render: (args) => ({
    components: { CErrorMessage },
    setup() {
      const { t } = useI18n()
      const defaultErrors = [
        t('translate.showcase.error_message.array_error.email_required'),
        t('translate.showcase.error_message.array_error.email_valid'),
        t('translate.showcase.error_message.array_error.password_length'),
      ]
      return { args, t, defaultErrors }
    },
    template: `
      <div style="max-width: 500px;">
        <c-error-message v-bind="args" :error="args.error ?? defaultErrors" />
      </div>
    `,
  }),
}

export const ObjectError: Story = {
  args: {
    hideIcon: false,
  },
  render: (args) => ({
    components: { CErrorMessage },
    setup() {
      const { t } = useI18n()
      const defaultError = {
        message: t('translate.showcase.error_message.object_error.message'),
        code: 'AUTH_FAILED',
      }
      return { args, defaultError }
    },
    template: `
      <div style="max-width: 500px;">
        <c-error-message v-bind="args" :error="args.error ?? defaultError" />
      </div>
    `,
  }),
}

export const HideIcon: Story = {
  args: {
    hideIcon: true,
  },
  render: (args) => ({
    components: { CErrorMessage },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="max-width: 500px;">
        <c-error-message v-bind="args" :error="args.error ?? t('translate.showcase.error_message.hide_icon.message')" />
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
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="max-width: 500px;">
        <c-error-message v-bind="args">
          <div>
            <strong>{{ t('translate.showcase.error_message.custom_content.title') }}</strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px;">
              <li>{{ t('translate.showcase.error_message.custom_content.field_required') }}</li>
              <li>{{ t('translate.showcase.error_message.custom_content.min_length') }}</li>
            </ul>
          </div>
        </c-error-message>
      </div>
    `,
  }),
}

export const FormValidationErrors: Story = {
  args: {
    hideIcon: false,
  },
  render: (args) => ({
    components: { CErrorMessage },
    setup() {
      const { t } = useI18n()
      const defaultErrors = [
        t('translate.showcase.error_message.form_validation.first_name_required'),
        t('translate.showcase.error_message.form_validation.last_name_required'),
        t('translate.showcase.error_message.form_validation.email_invalid'),
        t('translate.showcase.error_message.form_validation.password_weak'),
      ]
      return { args, t, defaultErrors }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.error_message.form_validation.title') }}</h3>
        <form style="display: grid; gap: 12px; margin-bottom: 16px;">
          <input type="text" :placeholder="t('translate.showcase.error_message.form_validation.first_name')" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          <input type="text" :placeholder="t('translate.showcase.error_message.form_validation.last_name')" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          <input type="email" :placeholder="t('translate.showcase.error_message.form_validation.email')" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          <input type="password" :placeholder="t('translate.showcase.error_message.form_validation.password')" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
        </form>
        <c-error-message v-bind="args" :error="args.error ?? defaultErrors" />
      </div>
    `,
  }),
}
