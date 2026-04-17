import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
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
        const { t } = useI18n()
        const enabled = ref(false)
        return { enabled, t }
      },
      template: `
        <div>
          <c-switch
            v-model="enabled"
            name="toggle"
            :label="t('translate.showcase.switch.off.label')"
          />
          <p style="margin-top: 16px; font-size: 12px;">
            {{ t('translate.showcase.switch.state') }} {{ enabled ? t('translate.showcase.switch.on_value') : t('translate.showcase.switch.off_value') }}
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
        const { t } = useI18n()
        const enabled = ref(true)
        return { enabled, t }
      },
      template: `
        <div>
          <c-switch
            v-model="enabled"
            name="toggle-on"
            :label="t('translate.showcase.switch.on.label')"
          />
          <p style="margin-top: 16px; font-size: 12px;">
            {{ t('translate.showcase.switch.state') }} {{ enabled ? t('translate.showcase.switch.on_value') : t('translate.showcase.switch.off_value') }}
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
        const { t } = useI18n()
        const enabled = ref(false)
        return { enabled, t }
      },
      template: `
        <c-switch
          v-model="enabled"
          name="disabled"
          :label="t('translate.showcase.switch.disabled.label')"
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
        const { t } = useI18n()
        const enabled = ref(true)
        return { enabled, t }
      },
      template: `
        <c-switch
          v-model="enabled"
          name="disabled-on"
          :label="t('translate.showcase.switch.disabled_on.label')"
          disabled
        />
      `,
    }
  },
}
