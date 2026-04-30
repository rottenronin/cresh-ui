import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CSlider from './CSlider.vue'

const meta = {
  title: 'UI/CSlider',
  component: CSlider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Slider value (v-model binding)',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
    },
    step: {
      control: { type: 'number' },
      description: 'Step value',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the slider',
    },
  },
} satisfies Meta<typeof CSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { CSlider },
    setup() {
      const value = ref(50)
      return { value }
    },
    template: `
        <div style="max-width: 300px;">
          <c-slider
            v-model="value"
            :min="0"
            :max="100"
          />
          <p style="margin-top: 16px; font-size: 12px;">
            Value: {{ value }}
          </p>
        </div>
      `,
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { CSlider },
    setup() {
      const volume = ref(30)
      return { volume }
    },
    template: `
        <div style="max-width: 300px;">
          <label style="display: block; margin-bottom: 8px; font-size: 14px;">
            Volume: {{ volume }}%
          </label>
          <c-slider
            v-model="volume"
            :min="0"
            :max="100"
          />
        </div>
      `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CSlider },
    setup() {
      const value = ref(50)
      return { value }
    },
    template: `
        <div style="max-width: 300px;">
          <c-slider
            v-model="value"
            :min="0"
            :max="100"
            disabled
          />
        </div>
      `,
  }),
}

export const CustomRange: Story = {
  render: () => ({
    components: { CSlider },
    setup() {
      const value = ref(25)
      return { value }
    },
    template: `
        <div style="max-width: 300px;">
          <label style="display: block; margin-bottom: 8px; font-size: 14px;">
            Value: {{ value }}
          </label>
          <c-slider
            v-model="value"
            :min="0"
            :max="200"
            :step="10"
          />
        </div>
      `,
  }),
}
