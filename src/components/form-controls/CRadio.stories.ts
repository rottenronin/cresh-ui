import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CRadio from './CRadio.vue'

const meta = {
  title: 'Form Controls/CRadio',
  component: CRadio,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'Selected value (v-model binding)',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text',
    },
    value: {
      control: { type: 'text' },
      description: 'The value of this radio option',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the radio button',
    },
  },
} satisfies Meta<typeof CRadio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return {
      components: { CRadio },
      setup() {
        const selected = ref('option1')
        return { selected }
      },
      template: `
        <div>
          <c-radio
            v-model="selected"
            name="option"
            value="option1"
            label="Option 1"
          />
          <p style="margin-top: 16px; font-size: 12px;">
            Selected: {{ selected }}
          </p>
        </div>
      `,
    }
  },
}

export const Selected: Story = {
  render: () => {
    return {
      components: { CRadio },
      setup() {
        const selected = ref('option1')
        return { selected }
      },
      template: `
        <c-radio
          v-model="selected"
          name="option"
          value="option1"
          label="Option 1"
        />
      `,
    }
  },
}

export const Disabled: Story = {
  render: () => {
    return {
      components: { CRadio },
      setup() {
        const selected = ref('')
        return { selected }
      },
      template: `
        <c-radio
          v-model="selected"
          name="disabled"
          value="disabled"
          label="Disabled option"
          disabled
        />
      `,
    }
  },
}

export const Group: Story = {
  render: () => {
    return {
      components: { CRadio },
      setup() {
        const selected = ref('opt1')
        return { selected }
      },
      template: `
        <div>
          <div style="margin-bottom: 12px;">
            <c-radio
              v-model="selected"
              name="group"
              value="opt1"
              label="Option 1"
            />
          </div>
          <div style="margin-bottom: 12px;">
            <c-radio
              v-model="selected"
              name="group"
              value="opt2"
              label="Option 2"
            />
          </div>
          <div style="margin-bottom: 12px;">
            <c-radio
              v-model="selected"
              name="group"
              value="opt3"
              label="Option 3"
            />
          </div>
          <p style="margin-top: 16px; font-size: 12px;">
            Selected: {{ selected }}
          </p>
        </div>
      `,
    }
  },
}
