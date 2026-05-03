import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CDrawer from './CDrawer.vue'

const meta = {
  title: 'UI/CDrawer',
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
  render: args => ({
    components: { CDrawer },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args: { ...args, modelValue: isOpen }, isOpen, t }
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
            <h3>{{ t('translate.showcase.drawer.left.title') }}</h3>
            <p>{{ t('translate.showcase.drawer.left.description') }}</p>
            <button @click="isOpen = false">{{ t('translate.showcase.drawer.actions.close') }}</button>
          </div>
        </c-drawer>
        <div style="flex: 1; padding: 20px; background: #f5f5f5;">
          <h2>{{ t('translate.showcase.drawer.main_content_title') }}</h2>
          <p>{{ t('translate.showcase.drawer.left.open_description') }}</p>
          <button @click="isOpen = true">{{ t('translate.showcase.drawer.actions.open') }}</button>
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
  render: args => ({
    components: { CDrawer },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args: { ...args, modelValue: isOpen }, isOpen, t }
    },
    template: `
      <div style="display: flex; min-height: 400px; border: 1px solid #ccc;">
        <div style="flex: 1; padding: 20px; background: #f5f5f5;">
          <h2>{{ t('translate.showcase.drawer.main_content_title') }}</h2>
          <p>{{ t('translate.showcase.drawer.right.open_description') }}</p>
          <button @click="isOpen = true">{{ t('translate.showcase.drawer.actions.open') }}</button>
        </div>
        <c-drawer
          v-model="isOpen"
          :placement="args.placement"
          :width="args.width"
          :height="args.height"
        >
          <div style="padding: 20px;">
            <h3>{{ t('translate.showcase.drawer.right.title') }}</h3>
            <p>{{ t('translate.showcase.drawer.right.description') }}</p>
            <button @click="isOpen = false">{{ t('translate.showcase.drawer.actions.close') }}</button>
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
  render: args => ({
    components: { CDrawer },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args: { ...args, modelValue: isOpen }, isOpen, t }
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
            <h3>{{ t('translate.showcase.drawer.top.title') }}</h3>
            <p>{{ t('translate.showcase.drawer.top.description') }}</p>
            <button @click="isOpen = false">{{ t('translate.showcase.drawer.actions.close') }}</button>
          </div>
        </c-drawer>
        <div style="padding: 20px; background: #f5f5f5;">
          <h2>{{ t('translate.showcase.drawer.main_content_title') }}</h2>
          <p>{{ t('translate.showcase.drawer.top.open_description') }}</p>
          <button @click="isOpen = true">{{ t('translate.showcase.drawer.actions.open') }}</button>
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
  render: args => ({
    components: { CDrawer },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args: { ...args, modelValue: isOpen }, isOpen, t }
    },
    template: `
      <div style="min-height: 400px; border: 1px solid #ccc; display: flex; flex-direction: column;">
        <div style="flex: 1; padding: 20px; background: #f5f5f5;">
          <h2>{{ t('translate.showcase.drawer.main_content_title') }}</h2>
          <p>{{ t('translate.showcase.drawer.bottom.open_description') }}</p>
          <button @click="isOpen = true">{{ t('translate.showcase.drawer.actions.open') }}</button>
        </div>
        <c-drawer
          v-model="isOpen"
          :placement="args.placement"
          :width="args.width"
          :height="args.height"
        >
          <div style="padding: 20px;">
            <h3>{{ t('translate.showcase.drawer.bottom.title') }}</h3>
            <p>{{ t('translate.showcase.drawer.bottom.description') }}</p>
            <button @click="isOpen = false">{{ t('translate.showcase.drawer.actions.close') }}</button>
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
  render: args => ({
    components: { CDrawer },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      return { args, isOpen, t }
    },
    template: `
      <div style="display: flex; min-height: 400px; border: 1px solid #ccc;">
        <c-drawer
          v-model="isOpen"
          v-bind="args"
        >
          <div style="padding: 20px;">
            <h3>{{ t('translate.showcase.drawer.responsive.title') }}</h3>
            <p>{{ t('translate.showcase.drawer.responsive.description') }}</p>
            <button @click="isOpen = false">{{ t('translate.showcase.drawer.actions.close') }}</button>
          </div>
        </c-drawer>
        <div style="flex: 1; padding: 20px; background: #f5f5f5;">
          <h2>{{ t('translate.showcase.drawer.main_content_title') }}</h2>
          <p>{{ t('translate.showcase.drawer.responsive.open_description') }}</p>
          <button @click="isOpen = true">{{ t('translate.showcase.drawer.actions.open') }}</button>
        </div>
      </div>
    `,
  }),
}
