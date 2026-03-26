import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CDrawer from './CDrawer.vue'

const meta = {
  title: 'UI / Drawer',
  component: CDrawer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Drawer placement position',
    },
    width: {
      control: { type: 'number' },
      description: 'Drawer width in pixels (for left/right placement)',
    },
    height: {
      control: { type: 'number' },
      description: 'Drawer height in pixels (for top/bottom placement)',
    },
    mobileBreakingpoint: {
      control: { type: 'number' },
      description: 'Mobile breakpoint width to auto-close drawer',
    },
    modelValue: {
      control: { type: 'boolean' },
      description: 'Whether the drawer is open',
    },
  },
} satisfies Meta<typeof CDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const LeftDrawer: Story = {
  args: {
    modelValue: true,
    placement: 'left',
    width: 300,
  },
  render: (args) => ({
    components: { CDrawer },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args: { ...args, modelValue: isOpen }, isOpen }
    },
    template: `
      <div style="display: flex; min-height: 400px; border: 1px solid #ccc;">
        <c-drawer
          v-model="isOpen"
          :placement="args.placement"
          :width="args.width"
          :height="args.height"
        >
          <div style="padding: 20px;">
            <h3>Left Drawer</h3>
            <p>This is a drawer positioned on the left side.</p>
            <button @click="isOpen = false">Close</button>
          </div>
        </c-drawer>
        <div style="flex: 1; padding: 20px; background: #f5f5f5;">
          <h2>Main Content</h2>
          <p>Click the button to open the drawer again.</p>
          <button @click="isOpen = true">Open Drawer</button>
        </div>
      </div>
    `,
  }),
}

export const RightDrawer: Story = {
  args: {
    modelValue: true,
    placement: 'right',
    width: 300,
  },
  render: (args) => ({
    components: { CDrawer },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args: { ...args, modelValue: isOpen }, isOpen }
    },
    template: `
      <div style="display: flex; min-height: 400px; border: 1px solid #ccc;">
        <div style="flex: 1; padding: 20px; background: #f5f5f5;">
          <h2>Main Content</h2>
          <p>Click the button to open the drawer.</p>
          <button @click="isOpen = true">Open Drawer</button>
        </div>
        <c-drawer
          v-model="isOpen"
          :placement="args.placement"
          :width="args.width"
          :height="args.height"
        >
          <div style="padding: 20px;">
            <h3>Right Drawer</h3>
            <p>This is a drawer positioned on the right side.</p>
            <button @click="isOpen = false">Close</button>
          </div>
        </c-drawer>
      </div>
    `,
  }),
}

export const TopDrawer: Story = {
  args: {
    modelValue: true,
    placement: 'top',
    height: 200,
  },
  render: (args) => ({
    components: { CDrawer },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args: { ...args, modelValue: isOpen }, isOpen }
    },
    template: `
      <div style="min-height: 400px; border: 1px solid #ccc;">
        <c-drawer
          v-model="isOpen"
          :placement="args.placement"
          :width="args.width"
          :height="args.height"
        >
          <div style="padding: 20px;">
            <h3>Top Drawer</h3>
            <p>This is a drawer positioned on the top.</p>
            <button @click="isOpen = false">Close</button>
          </div>
        </c-drawer>
        <div style="padding: 20px; background: #f5f5f5;">
          <h2>Main Content</h2>
          <p>Click the button to open the drawer.</p>
          <button @click="isOpen = true">Open Drawer</button>
        </div>
      </div>
    `,
  }),
}

export const BottomDrawer: Story = {
  args: {
    modelValue: true,
    placement: 'bottom',
    height: 200,
  },
  render: (args) => ({
    components: { CDrawer },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args: { ...args, modelValue: isOpen }, isOpen }
    },
    template: `
      <div style="min-height: 400px; border: 1px solid #ccc; display: flex; flex-direction: column;">
        <div style="flex: 1; padding: 20px; background: #f5f5f5;">
          <h2>Main Content</h2>
          <p>Click the button to open the drawer.</p>
          <button @click="isOpen = true">Open Drawer</button>
        </div>
        <c-drawer
          v-model="isOpen"
          :placement="args.placement"
          :width="args.width"
          :height="args.height"
        >
          <div style="padding: 20px;">
            <h3>Bottom Drawer</h3>
            <p>This is a drawer positioned at the bottom.</p>
            <button @click="isOpen = false">Close</button>
          </div>
        </c-drawer>
      </div>
    `,
  }),
}

export const MobileResponsive: Story = {
  args: {
    modelValue: true,
    placement: 'left',
    width: 300,
    mobileBreakingpoint: 768,
  },
  render: (args) => ({
    components: { CDrawer },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args, isOpen }
    },
    template: `
      <div style="display: flex; min-height: 400px; border: 1px solid #ccc;">
        <c-drawer
          v-model="isOpen"
          v-bind="args"
        >
          <div style="padding: 20px;">
            <h3>Responsive Drawer</h3>
            <p>This drawer will close automatically on screens smaller than 768px.</p>
            <button @click="isOpen = false">Close</button>
          </div>
        </c-drawer>
        <div style="flex: 1; padding: 20px; background: #f5f5f5;">
          <h2>Main Content</h2>
          <p>Resize the window to see the mobile behavior.</p>
          <button @click="isOpen = true">Open Drawer</button>
        </div>
      </div>
    `,
  }),
}
