import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CMenu from './CMenu.vue'
import CMenuItem from './CMenuItem.vue'

const meta = {
  title: 'UI/CMenu',
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

function createMenuItems(t: (key: string) => string) {
  return [
    { id: 'dashboard', label: t('translate.showcase.menu.items.dashboard'), icon: 'chart-line' },
    { id: 'users', label: t('translate.showcase.menu.items.users'), icon: 'people' },
    { id: 'settings', label: t('translate.showcase.menu.items.settings'), icon: 'settings' },
    { id: 'reports', label: t('translate.showcase.menu.items.reports'), icon: 'document' },
  ]
}

export const Basic: Story = {
  args: {
    title: 'Navigation Menu',
  },
  render: args => ({
    components: { CMenu, CMenuItem },
    setup() {
      const { t } = useI18n()
      const selectedItem = ref<{ id: string; index: number } | undefined>()
      const menuItems = computed(() => createMenuItems(t))
      const storyArgs = computed(() => ({ ...args, title: t('translate.showcase.menu.basic.title') }))
      return { args: storyArgs, selectedItem, menuItems, t }
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
          <h3>{{ t('translate.showcase.menu.selected.title') }}</h3>
          <p v-if="selectedItem">
            {{ t('translate.showcase.menu.selected.id') }}: {{ selectedItem.id }}<br/>
            {{ t('translate.showcase.menu.selected.index') }}: {{ selectedItem.index }}
          </p>
          <p v-else>{{ t('translate.showcase.menu.selected.empty') }}</p>
        </div>
      </div>
    `,
  }),
}

export const WithCustomHeader: Story = {
  args: {
    title: 'Custom Menu',
  },
  render: args => ({
    components: { CMenu, CMenuItem },
    setup() {
      const { t } = useI18n()
      const selectedItem = ref<{ id: string; index: number } | undefined>()
      const menuItems = computed(() => createMenuItems(t))
      const storyArgs = computed(() => ({ ...args, title: t('translate.showcase.menu.custom_header.title') }))
      return { args: storyArgs, selectedItem, menuItems, t }
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
              <p style="margin: 4px 0 0 0; font-size: 12px;">{{ t('translate.showcase.menu.custom_header.version') }}</p>
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
          <h3>{{ t('translate.showcase.menu.selected.title') }}</h3>
          <p v-if="selectedItem">
            {{ t('translate.showcase.menu.selected.id') }}: {{ selectedItem.id }}<br/>
            {{ t('translate.showcase.menu.selected.index') }}: {{ selectedItem.index }}
          </p>
          <p v-else>{{ t('translate.showcase.menu.selected.empty') }}</p>
        </div>
      </div>
    `,
  }),
}

export const WithFooter: Story = {
  args: {
    title: 'Menu with Footer',
  },
  render: args => ({
    components: { CMenu, CMenuItem },
    setup() {
      const { t } = useI18n()
      const selectedItem = ref<{ id: string; index: number } | undefined>()
      const menuItems = computed(() => createMenuItems(t))
      const storyArgs = computed(() => ({ ...args, title: t('translate.showcase.menu.with_footer.title') }))
      return { args: storyArgs, selectedItem, menuItems, t }
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
                {{ t('translate.showcase.menu.with_footer.add_new') }}
              </button>
            </div>
          </template>
        </c-menu>
        <div style="flex: 1; padding: 20px; background: #f5f5f5; border-radius: 4px;">
          <h3>{{ t('translate.showcase.menu.selected.title') }}</h3>
          <p v-if="selectedItem">
            {{ t('translate.showcase.menu.selected.id') }}: {{ selectedItem.id }}<br/>
            {{ t('translate.showcase.menu.selected.index') }}: {{ selectedItem.index }}
          </p>
          <p v-else>{{ t('translate.showcase.menu.selected.empty') }}</p>
        </div>
      </div>
    `,
  }),
}

export const Compact: Story = {
  args: {
    title: 'Compact Menu',
  },
  render: args => ({
    components: { CMenu, CMenuItem },
    setup() {
      const { t } = useI18n()
      const selectedItem = ref<{ id: string; index: number } | undefined>()
      const items = computed(() => [
        { id: 'home', label: t('translate.showcase.menu.compact.items.home') },
        { id: 'about', label: t('translate.showcase.menu.compact.items.about') },
        { id: 'contact', label: t('translate.showcase.menu.compact.items.contact') },
      ])
      const storyArgs = computed(() => ({ ...args, title: t('translate.showcase.menu.compact.title') }))
      return { args: storyArgs, selectedItem, items }
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
