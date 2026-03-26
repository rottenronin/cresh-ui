import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CModal from './CModal.vue'

const meta = {
  title: 'UI / Modal',
  component: CModal,
  parameters: {
    layout: 'padded',
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
    title: 'Confirm Action',
    persistent: false,
    closable: true,
    width: 500,
    noFooter: false,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args, isOpen }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Modal
        </button>
        <c-modal
          v-model="isOpen"
          :title="args.title"
          :persistent="args.persistent"
          :closable="args.closable"
          :width="args.width"
          :no-footer="args.noFooter"
          @cancel="isOpen = false"
          @ok="isOpen = false"
        >
          <p>Are you sure you want to perform this action?</p>
        </c-modal>
      </div>
    `,
  }),
}

export const NoFooter: Story = {
  args: {
    modelValue: true,
    title: 'Information',
    persistent: false,
    closable: true,
    width: 450,
    noFooter: true,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args, isOpen }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Show Info
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
        >
          <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 48px; margin-bottom: 12px;">✓</div>
            <h3 style="margin: 0 0 8px 0;">Success!</h3>
            <p style="margin: 0; color: #666;">Your action was completed successfully.</p>
          </div>
        </c-modal>
      </div>
    `,
  }),
}

export const Persistent: Story = {
  args: {
    modelValue: true,
    title: 'Important',
    persistent: true,
    closable: true,
    width: 500,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args, isOpen }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Persistent Modal
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
          @ok="isOpen = false"
          @cancel="isOpen = false"
        >
          <p>This modal cannot be closed by clicking outside. You must use the buttons or close icon.</p>
        </c-modal>
      </div>
    `,
  }),
}

export const LargeSize: Story = {
  args: {
    modelValue: true,
    title: 'Large Modal with Details',
    persistent: false,
    closable: true,
    width: 800,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const isOpen = ref(args.modelValue)
      const formData = ref({
        name: '',
        email: '',
        message: '',
      })
      return { args, isOpen, formData }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Large Modal
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
          @ok="isOpen = false"
          @cancel="isOpen = false"
        >
          <div style="display: grid; gap: 16px;">
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">Full Name</label>
              <input v-model="formData.name" type="text" placeholder="John Doe" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;" />
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email Address</label>
              <input v-model="formData.email" type="email" placeholder="john@example.com" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;" />
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">Message</label>
              <textarea v-model="formData.message" placeholder="Your message here..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; min-height: 120px;"></textarea>
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
    title: 'Custom Modal Content',
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args, isOpen }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Custom Modal
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
        >
          <template #header>
            <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0;">{{ args.title }}</h3>
              <button @click="isOpen = false" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer;">×</button>
            </div>
          </template>

          <div style="padding: 20px;">
            <h4>Welcome!</h4>
            <p>This is a modal with completely custom header and content.</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div style="padding: 12px; background: #f0f0f0; border-radius: 4px; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 8px;">📊</div>
                <span>Reports</span>
              </div>
              <div style="padding: 12px; background: #f0f0f0; border-radius: 4px; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 8px;">⚙️</div>
                <span>Settings</span>
              </div>
            </div>
          </div>

          <template #footer>
            <div style="padding: 16px; background: #f5f5f5; display: flex; gap: 8px;">
              <button @click="isOpen = false" style="flex: 1; padding: 10px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Decline
              </button>
              <button @click="isOpen = false" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Accept
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
    title: 'Delete Confirmation',
    persistent: true,
    closable: false,
    width: 400,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args, isOpen }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Delete Item
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
        >
          <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 48px; margin-bottom: 12px; color: #ff6b6b;">⚠️</div>
            <h3 style="margin: 0 0 8px 0; color: #ff6b6b;">Delete Permanently?</h3>
            <p style="margin: 0; color: #666;">This action cannot be undone.</p>
          </div>
        </c-modal>
      </div>
    `,
  }),
}

export const SmallModal: Story = {
  args: {
    modelValue: true,
    title: 'Quick Confirmation',
    width: 350,
  },
  render: (args) => ({
    components: { CModal },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args, isOpen }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Small Modal
        </button>
        <c-modal
          v-model="isOpen"
          v-bind="args"
          @ok="isOpen = false"
          @cancel="isOpen = false"
        >
          <p style="text-align: center;">Do you want to continue?</p>
        </c-modal>
      </div>
    `,
  }),
}
