import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, computed } from 'vue'
import CTextarea from './CTextarea.vue'

const meta = {
  title: 'Form Controls / Textarea',
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
      const text = ref('')
      return { text }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          label="Message"
          placeholder="Enter your message..."
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          Content: {{ text || '(empty)' }}
        </p>
      </div>
    `,
  }),
}

export const WithCharacterLimit: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const text = ref('')
      const maxChars = 150
      const remaining = computed(() => maxChars - text.value.length)
      return { text, maxChars, remaining }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          label="Message (Max 150 characters)"
          placeholder="Enter your message..."
          :max-length="maxChars"
          bordered
        />
        <p style="margin-top: 10px; font-size: 12px; color: #999;">
          {{ text.length }} / {{ maxChars }} characters ({{ remaining }} remaining)
        </p>
      </div>
    `,
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const text = ref('This is a sample message with some pre-filled content.')
      return { text }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          label="Message"
          placeholder="Enter your message..."
          bordered
        />
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          Content length: {{ text.length }} characters
        </p>
      </div>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const text = ref('')
      return { text }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          label="Message"
          placeholder="Enter your message..."
          bordered
          error-message="Please enter at least 10 characters"
        />
      </div>
    `,
  }),
}

export const LargeFixed: Story = {
  render: () => ({
    components: { CTextarea },
    setup() {
      const text = ref('')
      return { text }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          label="Large Textarea"
          placeholder="Enter your message..."
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
      const text = ref('This textarea is disabled and cannot be edited.')
      return { text }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          label="Message"
          placeholder="Enter your message..."
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
      const text = ref('')
      return { text }
    },
    template: `
      <div style="width: 400px;">
        <c-textarea
          v-model="text"
          name="message"
          label="Message *"
          placeholder="Enter your message..."
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
      const text = ref('')
      return { text }
    },
    template: `
      <div style="width: 300px;">
        <c-textarea
          v-model="text"
          name="message"
          label="Short Message"
          placeholder="Type here..."
          :rows="3"
          :cols="20"
          bordered
        />
      </div>
    `,
  }),
}
