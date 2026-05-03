import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CDatetimeInput from './CDatetimeInput.vue'

const meta = {
  title: 'Form Controls/CDatetimeInput',
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
      const { t } = useI18n()
      const date = ref('')
      return { date, t }
    },
    template: `
      <div style="width: 300px;">
        <c-datetime-input
          v-model="date"
          name="date"
          :label="t('translate.showcase.datetime.label')"
          :placeholder="t('translate.showcase.datetime.placeholder')"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          {{ t('translate.showcase.datetime.selected') }} {{ date || t('translate.showcase.datetime.not_set') }}
        </p>
      </div>
    `,
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { CDatetimeInput },
    setup() {
      const { t } = useI18n()
      const date = ref('12/25/2024')
      return { date, t }
    },
    template: `
      <div style="width: 300px;">
        <c-datetime-input
          v-model="date"
          name="date"
          :label="t('translate.showcase.datetime.label')"
          :placeholder="t('translate.showcase.datetime.placeholder')"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          {{ t('translate.showcase.datetime.selected') }} {{ date }}
        </p>
      </div>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { CDatetimeInput },
    setup() {
      const { t } = useI18n()
      const date = ref('')
      return { date, t }
    },
    template: `
      <div style="width: 300px;">
        <c-datetime-input
          v-model="date"
          name="date"
          :label="t('translate.showcase.datetime.label')"
          :placeholder="t('translate.showcase.datetime.placeholder')"
          bordered
          :error-message="t('translate.validation_messages.date_validation_rule')"
        />
      </div>
    `,
  }),
}

export const Required: Story = {
  render: () => ({
    components: { CDatetimeInput },
    setup() {
      const { t } = useI18n()
      const date = ref('')
      return { date, t }
    },
    template: `
      <div style="width: 300px;">
        <c-datetime-input
          v-model="date"
          name="date"
          :label="t('translate.showcase.datetime.required_label')"
          :placeholder="t('translate.showcase.datetime.placeholder')"
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
      const { t } = useI18n()
      const date = ref('01/15/2024')
      return { date, t }
    },
    template: `
      <div style="width: 300px;">
        <c-datetime-input
          v-model="date"
          name="date"
          :label="t('translate.showcase.datetime.label')"
          :placeholder="t('translate.showcase.datetime.placeholder')"
          bordered
          disabled
        />
      </div>
    `,
  }),
}
