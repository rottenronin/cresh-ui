import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CModal from './CModal.vue'

const meta = {
  title: 'UI / Modal',
  component: CModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'boolean' },
      description: 'Show/hide modal',
    },
    title: {
      control: { type: 'text' },
      description: 'Modal title',
    },
    persistent: {
      control: { type: 'boolean' },
      description: 'Prevent closing on background click',
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Show close button',
    },
    width: {
      control: { type: 'number' },
      description: 'Modal width in pixels',
    },
    noFooter: {
      control: { type: 'boolean' },
      description: 'Hide footer with action buttons',
    },
  },
} satisfies Meta<typeof CModal>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    modelValue: true,
    persistent: false,
    closable: true,
    width: 500,
    noFooter: false,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.modal.basic.open_button') }}
        </button>
        <c-modal
          v-model="isOpen"
          :title="args.title ?? t('translate.showcase.modal.basic.title')"
          :persistent="args.persistent"
          :closable="args.closable"
          :width="args.width"
          :no-footer="args.noFooter"
          @cancel="isOpen = false"
          @ok="isOpen = false"
        >
          <p>{{ t('translate.showcase.modal.basic.content') }}</p>
        </c-modal>
      </div>
    `,
  }),
}

export const NoFooter: Story = {
  args: {
    modelValue: true,
    persistent: false,
    closable: true,
    width: 450,
    noFooter: true,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.modal.no_footer.open_button') }}
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
          :title="args.title ?? t('translate.showcase.modal.no_footer.title')"
        >
          <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 48px; margin-bottom: 12px;">✓</div>
            <h3 style="margin: 0 0 8px 0;">{{ t('translate.showcase.modal.no_footer.success_title') }}</h3>
            <p style="margin: 0; color: #666;">{{ t('translate.showcase.modal.no_footer.content') }}</p>
          </div>
        </c-modal>
      </div>
    `,
  }),
}

export const Persistent: Story = {
  args: {
    modelValue: true,
    persistent: true,
    closable: true,
    width: 500,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.modal.persistent.open_button') }}
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
          :title="args.title ?? t('translate.showcase.modal.persistent.title')"
          @ok="isOpen = false"
          @cancel="isOpen = false"
        >
          <p>{{ t('translate.showcase.modal.persistent.content') }}</p>
        </c-modal>
      </div>
    `,
  }),
}

export const LargeSize: Story = {
  args: {
    modelValue: true,
    persistent: false,
    closable: true,
    width: 800,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      const formData = ref({
        name: '',
        email: '',
        message: '',
      })
      return { args, isOpen, formData, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.modal.large.open_button') }}
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
          :title="args.title ?? t('translate.showcase.modal.large.title')"
          @ok="isOpen = false"
          @cancel="isOpen = false"
        >
          <div style="display: grid; gap: 16px;">
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">{{ t('translate.showcase.modal.large.full_name') }}</label>
              <input v-model="formData.name" type="text" :placeholder="t('translate.showcase.modal.large.full_name_placeholder')" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;" />
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">{{ t('translate.showcase.modal.large.email') }}</label>
              <input v-model="formData.email" type="email" :placeholder="t('translate.showcase.modal.large.email_placeholder')" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;" />
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">{{ t('translate.showcase.modal.large.message') }}</label>
              <textarea v-model="formData.message" :placeholder="t('translate.showcase.modal.large.message_placeholder')" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; min-height: 120px;"></textarea>
            </div>
          </div>
        </c-modal>
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  args: {
    modelValue: true,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.modal.custom.open_button') }}
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
          :title="args.title ?? t('translate.showcase.modal.custom.title')"
        >
          <template #header>
            <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0;">{{ args.title ?? t('translate.showcase.modal.custom.title') }}</h3>
              <button @click="isOpen = false" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer;">×</button>
            </div>
          </template>

          <div style="padding: 20px;">
            <h4>{{ t('translate.showcase.modal.custom.welcome') }}</h4>
            <p>{{ t('translate.showcase.modal.custom.content') }}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div style="padding: 12px; background: #f0f0f0; border-radius: 4px; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 8px;">📊</div>
                <span>{{ t('translate.showcase.modal.custom.reports') }}</span>
              </div>
              <div style="padding: 12px; background: #f0f0f0; border-radius: 4px; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 8px;">⚙️</div>
                <span>{{ t('translate.showcase.modal.custom.settings') }}</span>
              </div>
            </div>
          </div>

          <template #footer>
            <div style="padding: 16px; background: #f5f5f5; display: flex; gap: 8px;">
              <button @click="isOpen = false" style="flex: 1; padding: 10px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer;">
                {{ t('translate.showcase.modal.custom.decline') }}
              </button>
              <button @click="isOpen = false" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
                {{ t('translate.showcase.modal.custom.accept') }}
              </button>
            </div>
          </template>
        </c-modal>
      </div>
    `,
  }),
}

export const WarningModal: Story = {
  args: {
    modelValue: true,
    persistent: true,
    closable: false,
    width: 400,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.modal.warning.open_button') }}
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
          :title="args.title ?? t('translate.showcase.modal.warning.title')"
        >
          <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 48px; margin-bottom: 12px; color: #ff6b6b;">⚠️</div>
            <h3 style="margin: 0 0 8px 0; color: #ff6b6b;">{{ t('translate.showcase.modal.warning.heading') }}</h3>
            <p style="margin: 0; color: #666;">{{ t('translate.showcase.modal.warning.content') }}</p>
          </div>
        </c-modal>
      </div>
    `,
  }),
}

export const SmallModal: Story = {
  args: {
    modelValue: true,
    width: 350,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.modal.small.open_button') }}
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
          :title="args.title ?? t('translate.showcase.modal.small.title')"
          @ok="isOpen = false"
          @cancel="isOpen = false"
        >
          <p style="text-align: center;">{{ t('translate.showcase.modal.small.content') }}</p>
        </c-modal>
      </div>
    `,
  }),
}
