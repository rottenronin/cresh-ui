import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'
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
  },
  render: (args) => ({
    components: { CEmpty },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px;">
        <c-empty v-bind="args" :message="args.message ?? t('translate.showcase.empty.default.message')" />
      </div>
    `,
  }),
}

export const NoResults: Story = {
  args: {
    icon: 'search',
  },
  render: (args) => ({
    components: { CEmpty },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px;">
        <c-empty v-bind="args" :message="args.message ?? t('translate.showcase.empty.no_results.message')" />
      </div>
    `,
  }),
}

export const NoNotifications: Story = {
  args: {
    icon: 'bell',
  },
  render: (args) => ({
    components: { CEmpty },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px;">
        <c-empty v-bind="args" :message="args.message ?? t('translate.showcase.empty.no_notifications.message')" />
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
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px;">
        <c-empty v-bind="args">
          <template #content>
            <h3 style="margin-top: 12px; margin-bottom: 8px;">{{ t('translate.showcase.empty.custom_content.title') }}</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">{{ t('translate.showcase.empty.custom_content.description') }}</p>
            <button style="margin-top: 16px; padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
              {{ t('translate.showcase.empty.custom_content.button') }}
            </button>
          </template>
        </c-empty>
      </div>
    `,
  }),
}

export const WithCustomIcon: Story = {
  args: {
  },
  render: (args) => ({
    components: { CEmpty },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px;">
        <c-empty v-bind="args" :message="args.message ?? t('translate.showcase.empty.with_custom_icon.message')">
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
      const { t } = useI18n()
      return { t }
    },
    template: `
      <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
        <c-empty>
          <div style="text-align: center;">
            <div style="font-size: 60px; margin-bottom: 16px;">🎉</div>
            <h2 style="margin: 0 0 8px 0; color: #2d3748;">{{ t('translate.showcase.empty.full_custom.title') }}</h2>
            <p style="margin: 0 0 16px 0; color: #718096; font-size: 14px;">{{ t('translate.showcase.empty.full_custom.description') }}</p>
            <button style="padding: 10px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
              {{ t('translate.showcase.empty.full_custom.button') }}
            </button>
          </div>
        </c-empty>
      </div>
    `,
  }),
}
