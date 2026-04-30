import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CModal from './CModal.vue'

const meta = {
  title: 'UI/CModal',
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
  render: args => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
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
  render: args => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <c-modal
        v-model="isOpen"
        v-bind="args"
        :title="args.title ?? t('translate.showcase.modal.no_footer.title')"
      >
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-size: 48px; margin-bottom: 12px;">✓</div>
          <h3>{{ t('translate.showcase.modal.no_footer.success_title') }}</h3>
          <p>{{ t('translate.showcase.modal.no_footer.content') }}</p>
        </div>
      </c-modal>
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
  render: args => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <c-modal
        v-model="isOpen"
        v-bind="args"
        :title="args.title ?? t('translate.showcase.modal.persistent.title')"
        @ok="isOpen = false"
        @cancel="isOpen = false"
      >
        <p>{{ t('translate.showcase.modal.persistent.content') }}</p>
        <p><em>Cannot close by clicking outside (persistent mode).</em></p>
      </c-modal>
    `,
  }),
}

export const CustomWidth: Story = {
  args: {
    modelValue: true,
    persistent: false,
    closable: true,
    width: 800,
    noFooter: false,
  },
  render: args => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <c-modal
        v-model="isOpen"
        v-bind="args"
        :title="args.title ?? 'Wide Modal'"
        @ok="isOpen = false"
        @cancel="isOpen = false"
      >
        <p>This modal uses a custom width ({{ args.width }}px).</p>
        <p>Use the <code>width</code> prop to control modal size.</p>
      </c-modal>
    `,
  }),
}

export const WithSlots: Story = {
  args: {
    modelValue: true,
    persistent: false,
    closable: true,
    width: 500,
  },
  render: args => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <c-modal
        v-model="isOpen"
        v-bind="args"
        :title="args.title ?? 'Modal with Slots'"
        @ok="isOpen = false"
        @cancel="isOpen = false"
      >
        <p>This demonstrates the default slot.</p>
        <template #header>
          <div style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb;">
            <h2 style="margin: 0;">Custom Header Slot</h2>
          </div>
        </template>
      </c-modal>
    `,
  }),
}

export const CustomContent: Story = {
  args: {
    modelValue: true,
  },
  render: args => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <c-modal
        v-model="isOpen"
        v-bind="args"
        :title="args.title ?? 'Custom Content Modal'"
      >
        <template #header>
          <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <h3 style="margin: 0;">{{ args.title ?? 'Custom Header' }}</h3>
          </div>
        </template>

        <div>
          <h4>Custom content demonstration</h4>
          <p>This modal demonstrates using slots to customize header and footer.</p>
        </div>

        <template #footer>
          <div style="display: flex; gap: 8px;">
            <button @click="isOpen = false" style="flex: 1; padding: 10px; background: #999; color: white; border: none; border-radius: 4px;">Decline</button>
            <button @click="isOpen = false" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 4px;">Accept</button>
          </div>
        </template>
      </c-modal>
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
  render: args => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <c-modal
        v-model="isOpen"
        v-bind="args"
        :title="args.title ?? 'Warning'"
      >
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-size: 48px; margin-bottom: 12px;">⚠️</div>
          <h3 style="margin: 0 0 8px 0; color: #ff6b6b;">Warning</h3>
          <p>This modal is persistent and cannot be closed by clicking outside.</p>
        </div>
      </c-modal>
    `,
  }),
}

export const SmallModal: Story = {
  args: {
    modelValue: true,
    width: 350,
  },
  render: args => ({
    components: { CModal },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <c-modal
        v-model="isOpen"
        v-bind="args"
        :title="args.title ?? 'Compact Modal'"
        @ok="isOpen = false"
        @cancel="isOpen = false"
      >
        <p style="text-align: center;">This is a smaller modal ({{ args.width }}px width).</p>
      </c-modal>
    `,
  }),
}
