import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CTextarea from './CTextarea.vue'

const meta = {
  title: 'Form Controls/CTextarea',
  component: CTextarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const { t } = useI18n()
      const text = ref('')
      return { text, t }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          :label="t('translate.showcase.textarea.message')"
          :placeholder="t('translate.showcase.textarea.placeholder')"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          {{ t('translate.showcase.textarea.content') }} {{ text || t('translate.showcase.textarea.empty') }}
        </p>
      </div>
    `,
  }),
}

export const WithCharacterLimit: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const { t } = useI18n()
      const text = ref('')
      const maxChars = 150
      const remaining = computed(() => maxChars - text.value.length)
      return { text, maxChars, remaining, t }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          :label="t('translate.showcase.textarea.max_label')"
          :placeholder="t('translate.showcase.textarea.placeholder')"
          :max-length="maxChars"
          bordered
        />
        <p style="margin-top: 10px; font-size: 12px; color: #999;">
          {{ text.length }} / {{ maxChars }} {{ t('translate.showcase.textarea.characters') }} ({{ remaining }} {{ t('translate.showcase.textarea.remaining') }})
        </p>
      </div>
    `,
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const { t } = useI18n()
      const text = ref('This is a sample message with some pre-filled content.')
      return { text, t }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          :label="t('translate.showcase.textarea.message')"
          :placeholder="t('translate.showcase.textarea.placeholder')"
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          {{ t('translate.showcase.textarea.content_length') }} {{ text.length }} {{ t('translate.showcase.textarea.characters') }}
        </p>
      </div>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const { t } = useI18n()
      const text = ref('')
      return { text, t }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          :label="t('translate.showcase.textarea.message')"
          :placeholder="t('translate.showcase.textarea.placeholder')"
          bordered
          :error-message="t('translate.showcase.textarea.error')"
        />
      </div>
    `,
  }),
}

export const LargeFixed: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const { t } = useI18n()
      const text = ref('')
      return { text, t }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          :label="t('translate.showcase.textarea.large')"
          :placeholder="t('translate.showcase.textarea.placeholder')"
          :rows="10"
          :cols="50"
          bordered
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const { t } = useI18n()
      const text = ref('This textarea is disabled and cannot be edited.')
      return { text, t }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          :label="t('translate.showcase.textarea.message')"
          :placeholder="t('translate.showcase.textarea.placeholder')"
          bordered
          disabled
        />
      </div>
    `,
  }),
}

export const Required: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const { t } = useI18n()
      const text = ref('')
      return { text, t }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          :label="t('translate.showcase.textarea.required')"
          :placeholder="t('translate.showcase.textarea.placeholder')"
          bordered
          required
        />
      </div>
    `,
  }),
}

export const Small: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const { t } = useI18n()
      const text = ref('')
      return { text, t }
    },
    template: `
      <div style="width: 300px;">
        <c-textarea
          v-model="text"
          name="message"
          :label="t('translate.showcase.textarea.short')"
          :placeholder="t('translate.showcase.textarea.type_here')"
          :rows="3"
          :cols="20"
          bordered
        />
      </div>
    `,
  }),
}
