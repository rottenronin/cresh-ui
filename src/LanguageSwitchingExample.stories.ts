import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import {
  CCheckbox,
  CDatetimeInput,
  CFileInput,
  CInput,
  CSelect,
  CTextarea,
} from './components'

const meta = {
  title: 'Examples',
  parameters: {
    layout: 'centered',
  },
  tags: ['!autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const LocalizationExample: Story = {
  render: () => ({
    components: {
      CCheckbox,
      CDatetimeInput,
      CFileInput,
      CInput,
      CSelect,
      CTextarea,
    },
    setup() {
      const { t, locale } = useI18n()
      const password = ref('')
      const confirmPassword = ref('')
      const selectedDate = ref('')
      const uploadedFile = ref<File | undefined>()
      const selectedCountry = ref('')
      const acceptTerms = ref(false)
      const notes = ref('')
      const passwordMismatch = computed(
        () => password.value.length > 0
            && confirmPassword.value.length > 0
            && password.value !== confirmPassword.value,
      )

      return {
        acceptTerms,
        confirmPassword,
        locale,
        notes,
        password,
        passwordMismatch,
        selectedCountry,
        selectedDate,
        t,
        uploadedFile,
      }
    },
    template: `
        <div>
          <h2>{{ t('translate.showcase.language_switching.title') }} ({{ locale.toUpperCase() }})</h2>
          <p>{{ t('translate.showcase.language_switching.try_text') }}</p>
          
          <c-input
            v-model="password"
            name="password"
            type="password"
            bordered
            :label="t('translate.showcase.input.password')"
            :placeholder="t('translate.showcase.input.password_placeholder')"
            :error-message="password && password.length < 8 ? t('translate.validation_messages.password_validation_rule') : undefined"
          />

          <c-input
            v-model="confirmPassword"
            name="confirm-password"
            type="password"
            bordered
            :label="t('translate.showcase.language_switching.confirm_password_label')"
            :placeholder="t('translate.showcase.language_switching.confirm_password_placeholder')"
            :error-message="passwordMismatch ? t('translate.validation_messages.passwords_match_rule') : undefined"
          />

          <c-datetime-input
            v-model="selectedDate"
            name="start-date"
            bordered
            :label="t('translate.showcase.datetime.label')"
            :placeholder="t('translate.showcase.datetime.placeholder')"
          />

          <c-file-input
            v-model="uploadedFile"
            name="identity-document"
            bordered
            :label="t('translate.document.upload')"
            :placeholder="t('translate.document.upload')"
          />

          <c-select
            v-model="selectedCountry"
            name="country"
            bordered
            :label="t('translate.showcase.select.country_label')"
            :placeholder="t('translate.showcase.select.country_placeholder')"
          >
            <option value="">{{ t('translate.showcase.select.select_country') }}</option>
            <option value="us">{{ t('translate.showcase.select.country_us') }}</option>
            <option value="uk">{{ t('translate.showcase.select.country_uk') }}</option>
            <option value="ca">{{ t('translate.showcase.select.country_ca') }}</option>
            <option value="fr">{{ t('translate.showcase.select.country_fr') }}</option>
            <option value="de">{{ t('translate.showcase.select.country_de') }}</option>
          </c-select>

          <c-checkbox
            v-model="acceptTerms"
            name="accept-terms"
            :label="t('translate.showcase.checkbox.accept_terms')"
          />

          <c-textarea
            v-model="notes"
            name="notes"
            bordered
            :label="t('translate.showcase.textarea.message')"
            :placeholder="t('translate.showcase.textarea.placeholder')"
          />

          <div><strong>{{ t('translate.showcase.datetime.selected') }}</strong>: {{ selectedDate || t('translate.showcase.datetime.not_set') }}</div>
          <div><strong>{{ t('translate.showcase.select.selected') }}</strong>: {{ selectedCountry || t('translate.showcase.select.select_option') }}</div>
          <div><strong>{{ t('translate.showcase.checkbox.checked') }}</strong>: {{ acceptTerms }}</div>
          <div><strong>{{ t('translate.document.upload') }}</strong>: {{ uploadedFile?.name || t('translate.common.errors.no_data') }}</div>
        </div>
      `,
  }),
}

export const CompactExamples: Story = {
  render: () => ({
    components: {
      CCheckbox,
      CInput,
      CSelect,
      CTextarea,
    },
    setup() {
      const { t } = useI18n()
      const email = ref('team@cresh-ui.dev')
      const country = ref('fr')
      const isChecked = ref(true)
      const message = ref('')

      return {
        country,
        email,
        isChecked,
        message,
        t,
      }
    },
    template: `
        <div style="
          width: min(960px, 100%);
          display: grid;
          gap: 20px;
          padding: 24px;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        ">
          <div style="padding: 20px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px;">
            <c-input
              v-model="email"
              name="email"
              type="email"
              bordered
              :label="t('translate.showcase.input.email')"
              :placeholder="t('translate.showcase.input.email_placeholder')"
            />
            <p style="margin: 14px 0 0; color: #64748b; font-size: 13px;">
              {{ t('translate.showcase.input.value') }} {{ email }}
            </p>
          </div>

          <div style="padding: 20px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px;">
            <c-select
              v-model="country"
              name="country-inline"
              bordered
              :label="t('translate.showcase.select.choose_option')"
              :placeholder="t('translate.showcase.select.choose_placeholder')"
            >
              <option value="">{{ t('translate.showcase.select.select_option') }}</option>
              <option value="fr">{{ t('translate.showcase.select.country_fr') }}</option>
              <option value="de">{{ t('translate.showcase.select.country_de') }}</option>
              <option value="uk">{{ t('translate.showcase.select.country_uk') }}</option>
            </c-select>
            <p style="margin: 14px 0 0; color: #64748b; font-size: 13px;">
              {{ t('translate.showcase.select.selected') }} {{ country || t('translate.showcase.select.select_option') }}
            </p>
          </div>

          <div style="padding: 20px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; display: grid; gap: 16px;">
            <c-checkbox
              v-model="isChecked"
              name="newsletter"
              :label="t('translate.showcase.checkbox.i_agree')"
            />
            <c-textarea
              v-model="message"
              name="message-inline"
              bordered
              :rows="4"
              :label="t('translate.showcase.textarea.short')"
              :placeholder="t('translate.showcase.textarea.type_here')"
            />
            <p style="margin: 0; color: #64748b; font-size: 13px;">
              {{ t('translate.showcase.checkbox.checked') }} {{ isChecked }}
            </p>
          </div>
        </div>
      `,
  }),
}

export const ValidationExamples: Story = {
  render: () => ({
    components: {
      CDatetimeInput,
      CInput,
      CTextarea,
    },
    setup() {
      const { t } = useI18n()
      const password = ref('short')
      const date = ref('13/99/2026')
      const message = ref('Hi')

      return {
        date,
        message,
        password,
        t,
      }
    },
    template: `
        <div style="
          width: min(760px, 100%);
          display: grid;
          gap: 16px;
          padding: 24px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
        ">
          <c-input
            v-model="password"
            name="password-validation"
            type="password"
            bordered
            :label="t('translate.showcase.input.password')"
            :placeholder="t('translate.showcase.input.password_placeholder')"
            :error-message="t('translate.validation_messages.password_validation_rule')"
          />

          <c-datetime-input
            v-model="date"
            name="date-validation"
            bordered
            :label="t('translate.showcase.datetime.label')"
            :placeholder="t('translate.showcase.datetime.placeholder')"
            :error-message="t('translate.validation_messages.date_validation_rule')"
          />

          <c-textarea
            v-model="message"
            name="message-validation"
            bordered
            :label="t('translate.showcase.textarea.message')"
            :placeholder="t('translate.showcase.textarea.placeholder')"
            :error-message="t('translate.showcase.textarea.error')"
          />
        </div>
      `,
  }),
}
