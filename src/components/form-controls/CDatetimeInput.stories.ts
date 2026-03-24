import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CDatetimeInput from './CDatetimeInput.vue'

const meta = {
  title: 'Form Controls / Datetime Input',
  component: CDatetimeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CDatetimeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { CDatetimeInput },
    setup() {
      const date = ref('')
      return { date }
    },
    template: `
      <div style="width: 300px;">
        <c-datetime-input
          v-model="date"
          name="date"
          label="Select Date"
          placeholder="MM/DD/YYYY"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          Selected: {{ date || 'Not set' }}
        </p>
      </div>
    `,
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { CDatetimeInput },
    setup() {
      const date = ref('12/25/2024')
      return { date }
    },
    template: `
      <div style="width: 300px;">
        <c-datetime-input
          v-model="date"
          name="date"
          label="Select Date"
          placeholder="MM/DD/YYYY"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          Selected: {{ date }}
        </p>
      </div>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { CDatetimeInput },
    setup() {
      const date = ref('')
      return { date }
    },
    template: `
      <div style="width: 300px;">
        <c-datetime-input
          v-model="date"
          name="date"
          label="Select Date"
          placeholder="MM/DD/YYYY"
          bordered
          error-message="Invalid date format"
        />
      </div>
    `,
  }),
}

export const Required: Story = {
  render: () => ({
    components: { CDatetimeInput },
    setup() {
      const date = ref('')
      return { date }
    },
    template: `
      <div style="width: 300px;">
        <c-datetime-input
          v-model="date"
          name="date"
          label="Select Date *"
          placeholder="MM/DD/YYYY"
          bordered
          required
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CDatetimeInput },
    setup() {
      const date = ref('01/15/2024')
      return { date }
    },
    template: `
      <div style="width: 300px;">
        <c-datetime-input
          v-model="date"
          name="date"
          label="Select Date"
          placeholder="MM/DD/YYYY"
          bordered
          disabled
        />
      </div>
    `,
  }),
}
