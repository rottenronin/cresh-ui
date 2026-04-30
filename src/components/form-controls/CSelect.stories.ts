import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CSelect from './CSelect.vue'

const meta = {
  title: 'Form Controls/CSelect',
  component: CSelect,
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
      description: 'Label for the select',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    name: {
      control: { type: 'text' },
      description: 'Input name attribute',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the select',
    },
  },
} satisfies Meta<typeof CSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { CSelect },
    setup() {
      const { t } = useI18n()
      const selected = ref('')
      return { selected, t }
    },
    template: `
        <div>
          <c-select
            v-model="selected"
            name="choose-option"
            :label="t('translate.showcase.select.choose_option')"
            :placeholder="t('translate.showcase.select.select_placeholder')"
            style="max-width: 300px;"
          >
            <option value="">{{ t('translate.showcase.select.select_option') }}</option>
            <option value="option1">{{ t('translate.showcase.select.option_1') }}</option>
            <option value="option2">{{ t('translate.showcase.select.option_2') }}</option>
            <option value="option3">{{ t('translate.showcase.select.option_3') }}</option>
          </c-select>
          <p style="margin-top: 16px; font-size: 12px;">
            {{ t('translate.showcase.select.selected') }} {{ selected }}
          </p>
        </div>
      `,
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { CSelect },
    setup() {
      const { t } = useI18n()
      const selected = ref('option2')
      return { selected, t }
    },
    template: `
        <div>
          <c-select
            v-model="selected"
            name="choose-option"
            :label="t('translate.showcase.select.choose_option')"
            :placeholder="t('translate.showcase.select.choose_placeholder')"
            style="max-width: 300px;"
          >
            <option value="">{{ t('translate.showcase.select.select_option') }}</option>
            <option value="option1">{{ t('translate.showcase.select.option_1') }}</option>
            <option value="option2">{{ t('translate.showcase.select.option_2') }}</option>
            <option value="option3">{{ t('translate.showcase.select.option_3') }}</option>
          </c-select>
          <p style="margin-top: 16px; font-size: 12px;">
            {{ t('translate.showcase.select.selected') }} {{ selected }}
          </p>
        </div>
      `,
  }),
}

export const WithCountries: Story = {
  render: () => ({
    components: { CSelect },
    setup() {
      const { t } = useI18n()
      const country = ref('')
      return { country, t }
    },
    template: `
        <div>
          <c-select
            v-model="country"
            name="country"
            :label="t('translate.showcase.select.country_label')"
            :placeholder="t('translate.showcase.select.country_placeholder')"
            style="max-width: 300px;"
          >
            <option value="">{{ t('translate.showcase.select.select_country') }}</option>
            <option value="us">{{ t('translate.showcase.select.country_us') }}</option>
            <option value="uk">{{ t('translate.showcase.select.country_uk') }}</option>
            <option value="ca">{{ t('translate.showcase.select.country_ca') }}</option>
            <option value="fr">{{ t('translate.showcase.select.country_fr') }}</option>
            <option value="de">{{ t('translate.showcase.select.country_de') }}</option>
          </c-select>
          <p style="margin-top: 16px; font-size: 12px;">
            {{ t('translate.showcase.select.selected') }} {{ country }}
          </p>
        </div>
      `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CSelect },
    setup() {
      const { t } = useI18n()
      const selected = ref('option1')
      return { selected, t }
    },
    template: `
        <c-select
          v-model="selected"
          name="disabled"
          :label="t('translate.showcase.select.disabled')"
          disabled
          style="max-width: 300px;"
        >
          <option value="">{{ t('translate.showcase.select.select_option') }}</option>
          <option value="option1">{{ t('translate.showcase.select.option_1') }}</option>
          <option value="option2">{{ t('translate.showcase.select.option_2') }}</option>
        </c-select>
      `,
  }),
}
