import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
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
      const phone = ref('')
      return { phone }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          label="Phone Number"
          placeholder="Enter phone number"
          country-code="FR"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          Phone: {{ phone || 'Not set' }}
        </p>
      </div>
    `,
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { CPhoneInput },
    setup() {
      const phone = ref('+33612345678')
      return { phone }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          label="Phone Number"
          placeholder="Enter phone number"
          country-code="FR"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          Phone: {{ phone }}
        </p>
      </div>
    `,
  }),
}

export const UsaCountry: Story = {
  render: () => ({
    components: { CPhoneInput },
    setup() {
      const phone = ref('')
      return { phone }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          label="US Phone Number"
          placeholder="Enter phone number"
          country-code="US"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          Phone: {{ phone || 'Not set' }}
        </p>
      </div>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { CPhoneInput },
    setup() {
      const phone = ref('')
      return { phone }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          label="Phone Number"
          placeholder="Enter phone number"
          country-code="FR"
          bordered
          error-message="Invalid phone number"
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CPhoneInput },
    setup() {
      const phone = ref('+33 6 12 34 56 78')
      return { phone }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          label="Phone Number"
          placeholder="Enter phone number"
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
      const phone = ref('')
      return { phone }
    },
    template: `
      <div style="width: 300px;">
        <c-phone-input
          v-model="phone"
          name="phone"
          label="Phone Number (No Blur Validation)"
          placeholder="Enter phone number"
          country-code="FR"
          bordered
          :disable-blur-validation="true"
        />
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          Validation happens only on input, not on blur.
        </p>
      </div>
    `,
  }),
}
