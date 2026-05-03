import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

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
  args: {
    value: 'option1',
  },
  render: () => ({
    components: { CRadio },
    setup() {
      const { t } = useI18n()
      const selected = ref('')
      return { selected, t }
    },
    template: `
        <div>
          <c-radio
            v-model="selected"
            name="option-default"
            value="option1"
            :label="t('translate.showcase.radio.option_1')"
          />
          <p style="margin-top: 16px; font-size: 12px;">
            {{ t('translate.showcase.radio.selected') }} {{ selected }}
          </p>
        </div>
      `,
  }),
}

export const Selected: Story = {
  args: {
    value: 'option1',
  },
  render: () => ({
    components: { CRadio },
    setup() {
      const { t } = useI18n()
      const selected = ref('option1')
      return { selected, t }
    },
    template: `
        <c-radio
          v-model="selected"
          name="option-selected"
          value="option1"
          :label="t('translate.showcase.radio.option_1')"
        />
      `,
  }),
}

export const Disabled: Story = {
  args: {
    value: 'disabled',
  },
  render: () => ({
    components: { CRadio },
    setup() {
      const { t } = useI18n()
      const selected = ref('')
      return { selected, t }
    },
    template: `
        <c-radio
          v-model="selected"
          name="option-disabled"
          value="disabled"
          :label="t('translate.showcase.radio.disabled_option')"
          disabled
        />
      `,
  }),
}

export const Group: Story = {
  render: () => ({
    components: { CRadio },
    setup() {
      const { t } = useI18n()
      const selected = ref('opt1')
      return { selected, t }
    },
    template: `
        <div>
          <div style="margin-bottom: 12px;">
            <c-radio
              v-model="selected"
              name="option-group"
              value="opt1"
              :label="t('translate.showcase.radio.option_1')"
            />
          </div>
          <div style="margin-bottom: 12px;">
            <c-radio
              v-model="selected"
              name="option-group"
              value="opt2"
              :label="t('translate.showcase.radio.option_2')"
            />
          </div>
          <div style="margin-bottom: 12px;">
            <c-radio
              v-model="selected"
              name="option-group"
              value="opt3"
              :label="t('translate.showcase.radio.option_3')"
            />
          </div>
          <p style="margin-top: 16px; font-size: 12px;">
            {{ t('translate.showcase.radio.selected') }} {{ selected }}
          </p>
        </div>
      `,
  }),
}
