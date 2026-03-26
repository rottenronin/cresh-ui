import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CDropdown from './CDropdown.vue'

const meta = {
  title: 'UI / Dropdown',
  component: CDropdown,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array of items with key and value',
    },
    modelValue: {
      control: { type: 'boolean' },
      description: 'Dropdown open/closed state',
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Show chevron icon',
    },
    preSelectedItem: {
      control: { type: 'object' },
      description: 'Pre-selected item',
    },
  },
} satisfies Meta<typeof CDropdown>

export default meta
type Story = StoryObj<typeof meta>

const countries = [
  { key: 'United States', value: 'us' },
  { key: 'Canada', value: 'ca' },
  { key: 'Mexico', value: 'mx' },
  { key: 'France', value: 'fr' },
  { key: 'Germany', value: 'de' },
]

export const Basic: Story = {
  args: {
    items: countries,
    modelValue: false,
    showIcon: true,
    preSelectedItem: countries[0],
  },
  render: (args) => ({
    components: { CDropdown },
    setup() {
      const isOpen = ref(false)
      const selectedItem = ref(args.preSelectedItem)
      return { args, isOpen, selectedItem }
    },
    template: `
      <div style="max-width: 300px;">
        <c-dropdown
          v-model="isOpen"
          :items="args.items"
          :show-icon="args.showIcon"
          :pre-selected-item="selectedItem"
          @select="(item) => selectedItem = item"
        >
          <div style="padding: 8px 16px;">
            {{ selectedItem?.key || 'Select a country' }}
          </div>
        </c-dropdown>
        <div v-if="selectedItem" style="margin-top: 12px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <p style="margin: 0;"><strong>Selected:</strong> {{ selectedItem.key }}</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Value: {{ selectedItem.value }}</p>
        </div>
      </div>
    `,
  }),
}

export const WithoutIcon: Story = {
  args: {
    items: countries,
    modelValue: false,
    showIcon: false,
    preSelectedItem: countries[0],
  },
  render: (args) => ({
    components: { CDropdown },
    setup() {
      const isOpen = ref(false)
      const selectedItem = ref(args.preSelectedItem)
      return { args, isOpen, selectedItem }
    },
    template: `
      <div style="max-width: 300px;">
        <c-dropdown
          v-model="isOpen"
          :items="args.items"
          :show-icon="args.showIcon"
          :pre-selected-item="selectedItem"
          @select="(item) => selectedItem = item"
        >
          <div style="padding: 8px 16px;">
            {{ selectedItem?.key || 'Select an option' }}
          </div>
        </c-dropdown>
      </div>
    `,
  }),
}

export const MultipleOptions: Story = {
  args: {
    items: [
      { key: 'Option 1', value: 'opt1' },
      { key: 'Option 2', value: 'opt2' },
      { key: 'Option 3', value: 'opt3' },
      { key: 'Option 4', value: 'opt4' },
      { key: 'Option 5', value: 'opt5' },
      { key: 'Option 6', value: 'opt6' },
    ],
    modelValue: false,
    showIcon: true,
  },
  render: (args) => ({
    components: { CDropdown },
    setup() {
      const isOpen = ref(false)
      const selectedItem = ref(args.items[0])
      return { args, isOpen, selectedItem }
    },
    template: `
      <div style="max-width: 300px;">
        <c-dropdown
          v-model="isOpen"
          :items="args.items"
          :show-icon="args.showIcon"
          :pre-selected-item="selectedItem"
          @select="(item) => selectedItem = item"
        >
          <div style="padding: 8px 16px; font-weight: 500;">
            {{ selectedItem?.key || 'Select' }}
          </div>
        </c-dropdown>
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  args: {
    modelValue: false,
    showIcon: true,
  },
  render: (args) => ({
    components: { CDropdown },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div style="max-width: 400px;">
        <c-dropdown
          v-model="isOpen"
          :show-icon="args.showIcon"
        >
          <div style="padding: 8px 16px; font-weight: 500;">
            Custom Content
          </div>
          <template #content>
            <div style="padding: 16px; min-width: 300px;">
              <h4 style="margin-top: 0;">Custom Dropdown Content</h4>
              <p style="margin: 8px 0;">This dropdown uses a custom content slot.</p>
              <div style="display: grid; gap: 8px;">
                <button style="padding: 8px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  Action 1
                </button>
                <button style="padding: 8px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  Action 2
                </button>
              </div>
            </div>
          </template>
        </c-dropdown>
      </div>
    `,
  }),
}

export const Forms: Story = {
  args: {
    items: [
      { key: 'Full Stack Developer', value: 'full-stack' },
      { key: 'Frontend Developer', value: 'frontend' },
      { key: 'Backend Developer', value: 'backend' },
      { key: 'DevOps Engineer', value: 'devops' },
    ],
    modelValue: false,
    showIcon: true,
  },
  render: (args) => ({
    components: { CDropdown },
    setup() {
      const isOpen = ref(false)
      const selectedRole = ref(args.items[0])
      const formData = ref({
        name: '',
        email: '',
      })
      return { args, isOpen, selectedRole, formData }
    },
    template: `
      <div style="max-width: 400px;">
        <div style="display: grid; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Full Name</label>
            <input v-model="formData.name" type="text" placeholder="John Doe" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;" />
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email</label>
            <input v-model="formData.email" type="email" placeholder="john@example.com" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;" />
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Role</label>
            <c-dropdown
              v-model="isOpen"
              :items="args.items"
              :pre-selected-item="selectedRole"
              @select="(item) => selectedRole = item"
            >
              <div style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer;">
                {{ selectedRole?.key || 'Select role' }}
              </div>
            </c-dropdown>
          </div>
          <button style="padding: 10px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
            Submit
          </button>
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { CDropdown },
    setup() {
      const openSmall = ref(false)
      const openMedium = ref(false)
      const openLarge = ref(false)
      const items = [{ key: 'Option', value: 'opt' }]
      return { openSmall, openMedium, openLarge, items }
    },
    template: `
      <div style="display: grid; gap: 24px;">
        <div>
          <h4>Small</h4>
          <c-dropdown
            v-model="openSmall"
            :items="items"
          >
            <div style="padding: 4px 8px; font-size: 12px;">
              Small Dropdown
            </div>
          </c-dropdown>
        </div>
        <div>
          <h4>Medium</h4>
          <c-dropdown
            v-model="openMedium"
            :items="items"
          >
            <div style="padding: 8px 16px;">
              Medium Dropdown
            </div>
          </c-dropdown>
        </div>
        <div>
          <h4>Large</h4>
          <c-dropdown
            v-model="openLarge"
            :items="items"
          >
            <div style="padding: 12px 20px; font-size: 16px; font-weight: 600;">
              Large Dropdown
            </div>
          </c-dropdown>
        </div>
      </div>
    `,
  }),
}
