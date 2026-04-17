import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CCreditCardInput from './CCreditCardInput.vue'

const meta = {
  title: 'Form Controls / Credit Card Input',
  component: CCreditCardInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CCreditCardInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { CCreditCardInput },
    setup() {
      const { t } = useI18n()
      const cardNumber = ref('')
      return { cardNumber, t }
    },
    template: `
      <div style="width: 300px;">
        <c-credit-card-input
          v-model="cardNumber"
          name="cardNumber"
          :label="t('translate.showcase.credit_card.label')"
          :placeholder="t('translate.showcase.credit_card.placeholder')"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          {{ t('translate.showcase.credit_card.input_value') }} {{ cardNumber }}
        </p>
      </div>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { CCreditCardInput },
    setup() {
      const { t } = useI18n()
      const cardNumber = ref('')
      return { cardNumber, t }
    },
    template: `
      <div style="width: 300px;">
        <c-credit-card-input
          v-model="cardNumber"
          name="cardNumber"
          :label="t('translate.showcase.credit_card.label')"
          :placeholder="t('translate.showcase.credit_card.placeholder')"
          bordered
          :error-message="t('translate.showcase.credit_card.invalid')"
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CCreditCardInput },
    setup() {
      const { t } = useI18n()
      const cardNumber = ref('4532 1488 0343 6467')
      return { cardNumber, t }
    },
    template: `
      <div style="width: 300px;">
        <c-credit-card-input
          v-model="cardNumber"
          name="cardNumber"
          :label="t('translate.showcase.credit_card.label')"
          :placeholder="t('translate.showcase.credit_card.placeholder')"
          bordered
          disabled
        />
      </div>
    `,
  }),
}

export const NotBordered: Story = {
  render: () => ({
    components: { CCreditCardInput },
    setup() {
      const { t } = useI18n()
      const cardNumber = ref('')
      return { cardNumber, t }
    },
    template: `
      <div style="width: 300px;">
        <c-credit-card-input
          v-model="cardNumber"
          name="cardNumber"
          :label="t('translate.showcase.credit_card.label')"
          :placeholder="t('translate.showcase.credit_card.placeholder')"
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          {{ t('translate.showcase.credit_card.input_value') }} {{ cardNumber }}
        </p>
      </div>
    `,
  }),
}
