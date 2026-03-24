import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CTextarea from './CTextarea.vue'

const meta = {
  title: 'Form Controls/CTextarea',
  component: CTextarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'The textarea value (v-model binding)',
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the textarea',
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
      description: 'Disable the textarea',
    },
    rows: {
      control: { type: 'number' },
      description: 'Number of rows',
    },
  },
} satisfies Meta<typeof CTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return {
      components: { CTextarea },
      setup() {
        const comment = ref('')
        return { comment }
      },
      template: `
        <div style="max-width: 400px;">
          <c-textarea
            v-model="comment"
            name="comments"
            label="Comments"
            placeholder="Enter your comments here..."
            :rows="4"
          />
          <p style="margin-top: 16px; font-size: 12px; color: #999;">
            Characters: {{ comment.length }}
          </p>
        </div>
      `,
    }
  },
}

export const WithContent: Story = {
  render: () => {
    return {
      components: { CTextarea },
      setup() {
        const description = ref('This is a sample text in the textarea.')
        return { description }
      },
      template: `
        <div style="max-width: 400px;">
          <c-textarea
            v-model="description"
            name="description"
            label="Description"
            :rows="4"
          />
          <p style="margin-top: 16px; font-size: 12px; color: #999;">
            Characters: {{ description.length }}
          </p>
        </div>
      `,
    }
  },
}

export const Disabled: Story = {
  render: () => {
    return {
      components: { CTextarea },
      setup() {
        const content = ref('This textarea is disabled')
        return { content }
      },
      template: `
        <div style="max-width: 400px;">
          <c-textarea
            v-model="content"
            name="disabled"
            label="Disabled textarea"
            disabled
            :rows="3"
          />
        </div>
      `,
    }
  },
}

export const Large: Story = {
  render: () => {
    return {
      components: { CTextarea },
      setup() {
        const content = ref('')
        return { content }
      },
      template: `
        <div style="max-width: 500px;">
          <c-textarea
            v-model="content"
            name="content"
            label="Long form content"
            placeholder="Write your long content here..."
            :rows="8"
          />
          <p style="margin-top: 16px; font-size: 12px; color: #999;">
            Characters: {{ content.length }}
          </p>
        </div>
      `,
    }
  },
}
