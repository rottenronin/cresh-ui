import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
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
      const cardNumber = ref('')
      return { cardNumber }
    },
    template: `
      <div style="width: 300px;">
        <c-credit-card-input
          v-model="cardNumber"
          name="cardNumber"
          label="Card Number"
          placeholder="Enter card number"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          Input: {{ cardNumber }}
        </p>
      </div>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { CCreditCardInput },
    setup() {
      const cardNumber = ref('')
      return { cardNumber }
    },
    template: `
      <div style="width: 300px;">
        <c-credit-card-input
          v-model="cardNumber"
          name="cardNumber"
          label="Card Number"
          placeholder="Enter card number"
          bordered
          error-message="Invalid card number"
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CCreditCardInput },
    setup() {
      const cardNumber = ref('4532 1488 0343 6467')
      return { cardNumber }
    },
    template: `
      <div style="width: 300px;">
        <c-credit-card-input
          v-model="cardNumber"
          name="cardNumber"
          label="Card Number"
          placeholder="Enter card number"
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
      const cardNumber = ref('')
      return { cardNumber }
    },
    template: `
      <div style="width: 300px;">
        <c-credit-card-input
          v-model="cardNumber"
          name="cardNumber"
          label="Card Number"
          placeholder="Enter card number"
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          Input: {{ cardNumber }}
        </p>
      </div>
    `,
  }),
}
