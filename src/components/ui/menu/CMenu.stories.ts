import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CMenu from './CMenu.vue'
import CMenuItem from './CMenuItem.vue'

const meta = {
  title: 'UI / Menu',
  component: CMenu,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Menu title',
    },
    selectedItem: {
      control: { type: 'object' },
      description: 'Currently selected menu item',
    },
  },
} satisfies Meta<typeof CMenu>

export default meta
type Story = StoryObj<typeof meta>

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'chart-line' },
  { id: 'users', label: 'Users', icon: 'people' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'reports', label: 'Reports', icon: 'document' },
]

export const Basic: Story = {
  args: {
    title: 'Navigation Menu',
  },
  render: (args) => ({
    components: { CMenu, CMenuItem },
    setup() {
      const selectedItem = ref<{ id: string; index: number } | undefined>()
      return { args, selectedItem, menuItems }
    },
    template: `
      <div style="display: flex; gap: 20px;">
        <c-menu
          v-bind="args"
          @select="selectedItem = $event"
        >
          <c-menu-item
            v-for="(item, index) in menuItems"
            :key="item.id"
            :id="item.id"
            :index="index"
          >
            <div style="padding: 12px 16px; cursor: pointer;">
              {{ item.label }}
            </div>
          </c-menu-item>
        </c-menu>
        <div style="flex: 1; padding: 20px; background: #f5f5f5; border-radius: 4px;">
          <h3>Selected Item</h3>
          <p v-if="selectedItem">
            ID: {{ selectedItem.id }}<br/>
            Index: {{ selectedItem.index }}
          </p>
          <p v-else>No item selected</p>
        </div>
      </div>
    `,
  }),
}

export const WithCustomHeader: Story = {
  args: {
    title: 'Custom Menu',
  },
  render: (args) => ({
    components: { CMenu, CMenuItem },
    setup() {
      const selectedItem = ref<{ id: string; index: number } | undefined>()
      return { args, selectedItem, menuItems }
    },
    template: `
      <div style="display: flex; gap: 20px;">
        <c-menu
          v-bind="args"
          @select="selectedItem = $event"
        >
          <template #header>
            <div style="padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 4px 4px 0 0;">
              <h2 style="margin: 0; font-size: 18px;">{{ args.title }}</h2>
              <p style="margin: 4px 0 0 0; font-size: 12px;">v1.0.0</p>
            </div>
          </template>
          <c-menu-item
            v-for="(item, index) in menuItems"
            :key="item.id"
            :id="item.id"
            :index="index"
          >
            <div style="padding: 12px 16px; cursor: pointer; border-left: 3px solid transparent; transition: all 0.2s;">
              {{ item.label }}
            </div>
          </c-menu-item>
        </c-menu>
        <div style="flex: 1; padding: 20px; background: #f5f5f5; border-radius: 4px;">
          <h3>Selected Item</h3>
          <p v-if="selectedItem">
            ID: {{ selectedItem.id }}<br/>
            Index: {{ selectedItem.index }}
          </p>
          <p v-else>No item selected</p>
        </div>
      </div>
    `,
  }),
}

export const WithFooter: Story = {
  args: {
    title: 'Menu with Footer',
  },
  render: (args) => ({
    components: { CMenu, CMenuItem },
    setup() {
      const selectedItem = ref<{ id: string; index: number } | undefined>()
      return { args, selectedItem, menuItems }
    },
    template: `
      <div style="display: flex; gap: 20px;">
        <c-menu
          v-bind="args"
          @select="selectedItem = $event"
        >
          <c-menu-item
            v-for="(item, index) in menuItems"
            :key="item.id"
            :id="item.id"
            :index="index"
          >
            <div style="padding: 12px 16px; cursor: pointer;">
              {{ item.label }}
            </div>
          </c-menu-item>
          <template #footer>
            <div style="padding: 16px; border-top: 1px solid #eee; background: #fafafa;">
              <button style="width: 100%; padding: 8px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                + Add New
              </button>
            </div>
          </template>
        </c-menu>
        <div style="flex: 1; padding: 20px; background: #f5f5f5; border-radius: 4px;">
          <h3>Selected Item</h3>
          <p v-if="selectedItem">
            ID: {{ selectedItem.id }}<br/>
            Index: {{ selectedItem.index }}
          </p>
          <p v-else>No item selected</p>
        </div>
      </div>
    `,
  }),
}

export const Compact: Story = {
  args: {
    title: 'Compact Menu',
  },
  render: (args) => ({
    components: { CMenu, CMenuItem },
    setup() {
      const selectedItem = ref<{ id: string; index: number } | undefined>()
      const items = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' },
      ]
      return { args, selectedItem, items }
    },
    template: `
      <c-menu
        v-bind="args"
        @select="selectedItem = $event"
        style="max-width: 200px;"
      >
        <c-menu-item
          v-for="(item, index) in items"
          :key="item.id"
          :id="item.id"
          :index="index"
        >
          <div style="padding: 8px 12px; cursor: pointer; font-size: 14px;">
            {{ item.label }}
          </div>
        </c-menu-item>
      </c-menu>
    `,
  }),
}
