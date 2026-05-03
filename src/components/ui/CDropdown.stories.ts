import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CDropdown from './CDropdown.vue'

const meta = {
  title: 'UI/CDropdown',
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

export const Basic: Story = {
  args: {
    modelValue: false,
    showIcon: true,
  },
  render: args => ({
    components: { CDropdown },
    setup() {
      const { t } = useI18n()
      const countries = [
        { key: t('translate.showcase.dropdown.countries.us'), value: 'us' },
        { key: t('translate.showcase.dropdown.countries.ca'), value: 'ca' },
        { key: t('translate.showcase.dropdown.countries.mx'), value: 'mx' },
        { key: t('translate.showcase.dropdown.countries.fr'), value: 'fr' },
        { key: t('translate.showcase.dropdown.countries.de'), value: 'de' },
      ]
      const isOpen = ref(false)
      const items = args.items ?? countries
      const selectedItem = ref(args.preSelectedItem ?? items[0])
      return { args, isOpen, selectedItem, items, t }
    },
    template: `
      <div style="max-width: 300px;">
        <c-dropdown
          v-model="isOpen"
          :items="items"
          :show-icon="args.showIcon"
          :pre-selected-item="selectedItem"
          @select="(item) => selectedItem = item"
        >
          <div style="padding: 8px 16px;">
            {{ selectedItem?.key || t('translate.showcase.dropdown.basic.placeholder') }}
          </div>
        </c-dropdown>
        <div v-if="selectedItem" style="margin-top: 12px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <p style="margin: 0;"><strong>{{ t('translate.showcase.dropdown.basic.selected') }}</strong> {{ selectedItem.key }}</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">{{ t('translate.showcase.dropdown.basic.value') }} {{ selectedItem.value }}</p>
        </div>
      </div>
    `,
  }),
}

export const WithoutIcon: Story = {
  args: {
    modelValue: false,
    showIcon: false,
  },
  render: args => ({
    components: { CDropdown },
    setup() {
      const { t } = useI18n()
      const countries = [
        { key: t('translate.showcase.dropdown.countries.us'), value: 'us' },
        { key: t('translate.showcase.dropdown.countries.ca'), value: 'ca' },
        { key: t('translate.showcase.dropdown.countries.mx'), value: 'mx' },
        { key: t('translate.showcase.dropdown.countries.fr'), value: 'fr' },
        { key: t('translate.showcase.dropdown.countries.de'), value: 'de' },
      ]
      const isOpen = ref(false)
      const items = args.items ?? countries
      const selectedItem = ref(args.preSelectedItem ?? items[0])
      return { args, isOpen, selectedItem, items, t }
    },
    template: `
      <div style="max-width: 300px;">
        <c-dropdown
          v-model="isOpen"
          :items="items"
          :show-icon="args.showIcon"
          :pre-selected-item="selectedItem"
          @select="(item) => selectedItem = item"
        >
          <div style="padding: 8px 16px;">
            {{ selectedItem?.key || t('translate.showcase.dropdown.without_icon.placeholder') }}
          </div>
        </c-dropdown>
      </div>
    `,
  }),
}

export const MultipleOptions: Story = {
  args: {
    modelValue: false,
    showIcon: true,
  },
  render: args => ({
    components: { CDropdown },
    setup() {
      const { t } = useI18n()
      const defaultItems = [
        { key: t('translate.showcase.dropdown.multiple.option_1'), value: 'opt1' },
        { key: t('translate.showcase.dropdown.multiple.option_2'), value: 'opt2' },
        { key: t('translate.showcase.dropdown.multiple.option_3'), value: 'opt3' },
        { key: t('translate.showcase.dropdown.multiple.option_4'), value: 'opt4' },
        { key: t('translate.showcase.dropdown.multiple.option_5'), value: 'opt5' },
        { key: t('translate.showcase.dropdown.multiple.option_6'), value: 'opt6' },
      ]
      const isOpen = ref(false)
      const items = args.items ?? defaultItems
      const selectedItem = ref(items[0])
      return { args, isOpen, selectedItem, items, t }
    },
    template: `
      <div style="max-width: 300px;">
        <c-dropdown
          v-model="isOpen"
          :items="items"
          :show-icon="args.showIcon"
          :pre-selected-item="selectedItem"
          @select="(item) => selectedItem = item"
        >
          <div style="padding: 8px 16px; font-weight: 500;">
            {{ selectedItem?.key || t('translate.showcase.dropdown.multiple.placeholder') }}
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
  render: args => ({
    components: { CDropdown },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(false)
      return { args, isOpen, t }
    },
    template: `
      <div style="max-width: 400px;">
        <c-dropdown
          v-model="isOpen"
          :show-icon="args.showIcon"
        >
          <div style="padding: 8px 16px; font-weight: 500;">
            {{ t('translate.showcase.dropdown.custom.trigger') }}
          </div>
          <template #content>
            <div style="padding: 16px; min-width: 300px;">
              <h4 style="margin-top: 0;">{{ t('translate.showcase.dropdown.custom.title') }}</h4>
              <p style="margin: 8px 0;">{{ t('translate.showcase.dropdown.custom.description') }}</p>
              <div style="display: grid; gap: 8px;">
                <button style="padding: 8px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  {{ t('translate.showcase.dropdown.custom.action_1') }}
                </button>
                <button style="padding: 8px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  {{ t('translate.showcase.dropdown.custom.action_2') }}
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
    modelValue: false,
    showIcon: true,
  },
  render: args => ({
    components: { CDropdown },
    setup() {
      const { t } = useI18n()
      const items = args.items ?? [
        { key: t('translate.showcase.dropdown.forms.roles.full_stack'), value: 'full-stack' },
        { key: t('translate.showcase.dropdown.forms.roles.frontend'), value: 'frontend' },
        { key: t('translate.showcase.dropdown.forms.roles.backend'), value: 'backend' },
        { key: t('translate.showcase.dropdown.forms.roles.devops'), value: 'devops' },
      ]
      const isOpen = ref(false)
      const selectedRole = ref(items[0])
      const formData = ref({
        name: '',
        email: '',
      })
      return { args, isOpen, selectedRole, formData, items, t }
    },
    template: `
      <div style="max-width: 400px;">
        <div style="display: grid; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">{{ t('translate.showcase.dropdown.forms.full_name') }}</label>
            <input v-model="formData.name" type="text" :placeholder="t('translate.showcase.dropdown.forms.full_name_placeholder')" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;" />
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">{{ t('translate.showcase.dropdown.forms.email') }}</label>
            <input v-model="formData.email" type="email" :placeholder="t('translate.showcase.dropdown.forms.email_placeholder')" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;" />
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">{{ t('translate.showcase.dropdown.forms.role') }}</label>
            <c-dropdown
              v-model="isOpen"
              :items="items"
              :pre-selected-item="selectedRole"
              @select="(item) => selectedRole = item"
            >
              <div style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer;">
                {{ selectedRole?.key || t('translate.showcase.dropdown.forms.role_placeholder') }}
              </div>
            </c-dropdown>
          </div>
          <button style="padding: 10px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
            {{ t('translate.showcase.dropdown.forms.submit') }}
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
      const { t } = useI18n()
      const openSmall = ref(false)
      const openMedium = ref(false)
      const openLarge = ref(false)
      const items = [{ key: t('translate.showcase.dropdown.sizes.option'), value: 'opt' }]
      return { openSmall, openMedium, openLarge, items, t }
    },
    template: `
      <div style="display: grid; gap: 24px;">
        <div>
          <h4>{{ t('translate.showcase.dropdown.sizes.small') }}</h4>
          <c-dropdown
            v-model="openSmall"
            :items="items"
          >
            <div style="padding: 4px 8px; font-size: 12px;">
              {{ t('translate.showcase.dropdown.sizes.small_dropdown') }}
            </div>
          </c-dropdown>
        </div>
        <div>
          <h4>{{ t('translate.showcase.dropdown.sizes.medium') }}</h4>
          <c-dropdown
            v-model="openMedium"
            :items="items"
          >
            <div style="padding: 8px 16px;">
              {{ t('translate.showcase.dropdown.sizes.medium_dropdown') }}
            </div>
          </c-dropdown>
        </div>
        <div>
          <h4>{{ t('translate.showcase.dropdown.sizes.large') }}</h4>
          <c-dropdown
            v-model="openLarge"
            :items="items"
          >
            <div style="padding: 12px 20px; font-size: 16px; font-weight: 600;">
              {{ t('translate.showcase.dropdown.sizes.large_dropdown') }}
            </div>
          </c-dropdown>
        </div>
      </div>
    `,
  }),
}
