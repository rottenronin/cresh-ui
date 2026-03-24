import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CCheckbox from './CCheckbox.vue'

const meta = {
  title: 'Form Controls/CCheckbox',
  component: CCheckbox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'boolean' },
      description: 'Checked state (v-model binding)',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text',
    },
    name: {
      control: { type: 'text' },
      description: 'Input name attribute',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the checkbox',
    },
  },
} satisfies Meta<typeof CCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return {
      components: { CCheckbox },
      setup() {
        const isChecked = ref(false)
        return { isChecked }
      },
      template: `
        <div>
          <c-checkbox
            v-model="isChecked"
            name="accept"
            label="Accept terms and conditions"
          />
          <p style="margin-top: 16px; font-size: 12px;">
            Checked: {{ isChecked }}
          </p>
        </div>
      `,
    }
  },
}

export const Checked: Story = {
  render: () => {
    return {
      components: { CCheckbox },
      setup() {
        const isChecked = ref(true)
        return { isChecked }
      },
      template: `
        <div>
          <c-checkbox
            v-model="isChecked"
            name="agree"
            label="I agree"
          />
          <p style="margin-top: 16px; font-size: 12px;">
            Checked: {{ isChecked }}
          </p>
        </div>
      `,
    }
  },
}

export const Disabled: Story = {
  render: () => {
    return {
      components: { CCheckbox },
      setup() {
        const isChecked = ref(false)
        return { isChecked }
      },
      template: `
        <c-checkbox
          v-model="isChecked"
          name="disabled"
          label="This option is disabled"
          disabled
        />
      `,
    }
  },
}

export const DisabledChecked: Story = {
  render: () => {
    return {
      components: { CCheckbox },
      setup() {
        const isChecked = ref(true)
        return { isChecked }
      },
      template: `
        <c-checkbox
          v-model="isChecked"
          name="disabled-checked"
          label="Disabled and checked"
          disabled
        />
      `,
    }
  },
}
