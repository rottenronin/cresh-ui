import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CEmpty from './CEmpty.vue'

const meta = {
  title: 'UI / Empty',
  component: CEmpty,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'text' },
      description: 'Icon name from icon library',
    },
    message: {
      control: { type: 'text' },
      description: 'Empty state message',
    },
  },
} satisfies Meta<typeof CEmpty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: 'table',
    message: 'No data available',
  },
  render: (args) => ({
    components: { CEmpty },
    setup() {
      return { args }
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px;">
        <c-empty v-bind="args" />
      </div>
    `,
  }),
}

export const NoResults: Story = {
  args: {
    icon: 'search',
    message: 'No results found',
  },
  render: (args) => ({
    components: { CEmpty },
    setup() {
      return { args }
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px;">
        <c-empty v-bind="args" />
      </div>
    `,
  }),
}

export const NoNotifications: Story = {
  args: {
    icon: 'bell',
    message: 'No notifications yet',
  },
  render: (args) => ({
    components: { CEmpty },
    setup() {
      return { args }
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px;">
        <c-empty v-bind="args" />
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  args: {
    icon: 'inbox',
  },
  render: (args) => ({
    components: { CEmpty },
    setup() {
      return { args }
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px;">
        <c-empty v-bind="args">
          <template #content>
            <h3 style="margin-top: 12px; margin-bottom: 8px;">Your inbox is empty</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">You're all caught up! Check back later.</p>
            <button style="margin-top: 16px; padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Go Back
            </button>
          </template>
        </c-empty>
      </div>
    `,
  }),
}

export const WithCustomIcon: Story = {
  args: {
    message: 'No messages',
  },
  render: (args) => ({
    components: { CEmpty },
    setup() {
      return { args }
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px;">
        <c-empty v-bind="args">
          <template #icon>
            <div style="font-size: 45px;">💌</div>
          </template>
        </c-empty>
      </div>
    `,
  }),
}

export const FullCustom: Story = {
  render: () => ({
    components: { CEmpty },
    setup() {
      return {}
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
        <c-empty>
          <div style="text-align: center;">
            <div style="font-size: 60px; margin-bottom: 16px;">🎉</div>
            <h2 style="margin: 0 0 8px 0; color: #2d3748;">All caught up!</h2>
            <p style="margin: 0 0 16px 0; color: #718096; font-size: 14px;">You have no pending items. Great job!</p>
            <button style="padding: 10px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
              Create New Item
            </button>
          </div>
        </c-empty>
      </div>
    `,
  }),
}
