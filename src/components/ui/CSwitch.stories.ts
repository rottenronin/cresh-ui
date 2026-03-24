import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CSwitch from './CSwitch.vue'

const meta = {
  title: 'UI/CSwitch',
  component: CSwitch,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'boolean' },
      description: 'Switch state (v-model binding)',
    },
    label: {
      control: { type: 'text' },
      description: 'Switch label',
    },
    name: {
      control: { type: 'text' },
      description: 'Input name attribute',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the switch',
    },
  },
} satisfies Meta<typeof CSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {
  render: () => {
    return {
      components: { CSwitch },
      setup() {
        const enabled = ref(false)
        return { enabled }
      },
      template: `
        <div>
          <c-switch
            v-model="enabled"
            name="toggle"
            label="Toggle me"
          />
          <p style="margin-top: 16px; font-size: 12px;">
            State: {{ enabled ? 'ON' : 'OFF' }}
          </p>
        </div>
      `,
    }
  },
}

export const On: Story = {
  render: () => {
    return {
      components: { CSwitch },
      setup() {
        const enabled = ref(true)
        return { enabled }
      },
      template: `
        <div>
          <c-switch
            v-model="enabled"
            name="toggle-on"
            label="Enabled"
          />
          <p style="margin-top: 16px; font-size: 12px;">
            State: {{ enabled ? 'ON' : 'OFF' }}
          </p>
        </div>
      `,
    }
  },
}

export const Disabled: Story = {
  render: () => {
    return {
      components: { CSwitch },
      setup() {
        const enabled = ref(false)
        return { enabled }
      },
      template: `
        <c-switch
          v-model="enabled"
          name="disabled"
          label="Disabled switch"
          disabled
        />
      `,
    }
  },
}

export const DisabledOn: Story = {
  render: () => {
    return {
      components: { CSwitch },
      setup() {
        const enabled = ref(true)
        return { enabled }
      },
      template: `
        <c-switch
          v-model="enabled"
          name="disabled-on"
          label="Disabled and on"
          disabled
        />
      `,
    }
  },
}
