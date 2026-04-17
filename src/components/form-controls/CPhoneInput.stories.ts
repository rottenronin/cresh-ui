import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CPhoneInput from './CPhoneInput.vue'

const meta = {
  title: 'Form Controls / Phone Input',
  component: CPhoneInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CPhoneInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { CPhoneInput },
    setup() {
      const { t } = useI18n()
      const phone = ref('')
      return { phone, t }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          :label="t('translate.showcase.phone.label')"
          :placeholder="t('translate.showcase.phone.placeholder')"
          country-code="FR"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          {{ t('translate.showcase.phone.value') }} {{ phone || t('translate.showcase.phone.not_set') }}
        </p>
      </div>
    `,
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { CPhoneInput },
    setup() {
      const { t } = useI18n()
      const phone = ref('+33612345678')
      return { phone, t }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          :label="t('translate.showcase.phone.label')"
          :placeholder="t('translate.showcase.phone.placeholder')"
          country-code="FR"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          {{ t('translate.showcase.phone.value') }} {{ phone }}
        </p>
      </div>
    `,
  }),
}

export const UsaCountry: Story = {
  render: () => ({
    components: { CPhoneInput },
    setup() {
      const { t } = useI18n()
      const phone = ref('')
      return { phone, t }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          :label="t('translate.showcase.phone.us_label')"
          :placeholder="t('translate.showcase.phone.placeholder')"
          country-code="US"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          {{ t('translate.showcase.phone.value') }} {{ phone || t('translate.showcase.phone.not_set') }}
        </p>
      </div>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { CPhoneInput },
    setup() {
      const { t } = useI18n()
      const phone = ref('')
      return { phone, t }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          :label="t('translate.showcase.phone.label')"
          :placeholder="t('translate.showcase.phone.placeholder')"
          country-code="FR"
          bordered
          :error-message="t('translate.validation_messages.phone_number_rule')"
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CPhoneInput },
    setup() {
      const { t } = useI18n()
      const phone = ref('+33 6 12 34 56 78')
      return { phone, t }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          :label="t('translate.showcase.phone.label')"
          :placeholder="t('translate.showcase.phone.placeholder')"
          country-code="FR"
          bordered
          disabled
        />
      </div>
    `,
  }),
}

export const DisableBlurValidation: Story = {
  render: () => ({
    components: { CPhoneInput },
    setup() {
      const { t } = useI18n()
      const phone = ref('')
      return { phone, t }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          :label="t('translate.showcase.phone.no_blur_label')"
          :placeholder="t('translate.showcase.phone.placeholder')"
          country-code="FR"
          bordered
          :disable-blur-validation="true"
        />
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          {{ t('translate.showcase.phone.blur_hint') }}
        </p>
      </div>
    `,
  }),
}
