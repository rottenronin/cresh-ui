import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
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
  render: () => ({
    components: { CCheckbox },
    setup() {
      const { t } = useI18n()
      const isChecked = ref(false)
      return { isChecked, t }
    },
    template: `
        <div>
          <c-checkbox
            v-model="isChecked"
            name="accept"
            :label="t('translate.showcase.checkbox.accept_terms')"
          />
          <p style="margin-top: 16px; font-size: 12px;">
            {{ t('translate.showcase.checkbox.checked') }} {{ isChecked }}
          </p>
        </div>
      `,
  }),
}

export const Checked: Story = {
  render: () => ({
    components: { CCheckbox },
    setup() {
      const { t } = useI18n()
      const isChecked = ref(true)
      return { isChecked, t }
    },
    template: `
        <div>
          <c-checkbox
            v-model="isChecked"
            name="agree"
            :label="t('translate.showcase.checkbox.i_agree')"
          />
          <p style="margin-top: 16px; font-size: 12px;">
            {{ t('translate.showcase.checkbox.checked') }} {{ isChecked }}
          </p>
        </div>
      `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CCheckbox },
    setup() {
      const { t } = useI18n()
      const isChecked = ref(false)
      return { isChecked, t }
    },
    template: `
        <c-checkbox
          v-model="isChecked"
          name="disabled"
          :label="t('translate.showcase.checkbox.disabled_option')"
          disabled
        />
      `,
  }),
}

export const DisabledChecked: Story = {
  render: () => ({
    components: { CCheckbox },
    setup() {
      const { t } = useI18n()
      const isChecked = ref(true)
      return { isChecked, t }
    },
    template: `
        <c-checkbox
          v-model="isChecked"
          name="disabled-checked"
          :label="t('translate.showcase.checkbox.disabled_checked')"
          disabled
        />
      `,
  }),
}
