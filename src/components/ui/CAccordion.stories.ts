import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CAccordion from './CAccordion.vue'
import CAccordionItem from './CAccordionItem.vue'

const meta = {
  title: 'UI / Accordion',
  component: CAccordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedName: {
      control: { type: 'text' },
      description: 'Initially selected accordion item name',
    },
  },
} satisfies Meta<typeof CAccordion>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    selectedName: undefined,
  },
  render: (args) => ({
    components: { CAccordion, CAccordionItem },
    setup() {
      const { t } = useI18n()
      const selectedItem = ref<string | undefined>()
      return { args, selectedItem, t }
    },
    template: `
      <div>
        <c-accordion
          @accordion-change="selectedItem = $event"
        >
          <c-accordion-item name="item-1">
            <template #title>
              <span>{{ t('translate.showcase.accordion.basic.introduction_title') }}</span>
            </template>
            <template #content>
              <p>{{ t('translate.showcase.accordion.basic.introduction_content') }}</p>
            </template>
          </c-accordion-item>
          <c-accordion-item name="item-2">
            <template #title>
              <span>{{ t('translate.showcase.accordion.basic.features_title') }}</span>
            </template>
            <template #content>
              <ul style="margin: 0; padding-left: 20px;">
                <li>{{ t('translate.showcase.accordion.basic.feature_1') }}</li>
                <li>{{ t('translate.showcase.accordion.basic.feature_2') }}</li>
                <li>{{ t('translate.showcase.accordion.basic.feature_3') }}</li>
                <li>{{ t('translate.showcase.accordion.basic.feature_4') }}</li>
              </ul>
            </template>
          </c-accordion-item>
          <c-accordion-item name="item-3">
            <template #title>
              <span>{{ t('translate.showcase.accordion.basic.questions_title') }}</span>
            </template>
            <template #content>
              <p>{{ t('translate.showcase.accordion.basic.questions_content') }}</p>
            </template>
          </c-accordion-item>
        </c-accordion>
        <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
          <p>{{ t('translate.showcase.accordion.basic.currently_selected') }} {{ selectedItem || t('translate.showcase.accordion.basic.none') }}</p>
        </div>
      </div>
    `,
  }),
}

export const InitiallyOpen: Story = {
  args: {
    selectedName: 'item-2',
  },
  render: (args) => ({
    components: { CAccordion, CAccordionItem },
    setup() {
      const { t } = useI18n()
      const selectedItem = ref<string | undefined>()
      return { args, selectedItem, t }
    },
    template: `
      <div>
        <c-accordion :selected-name="args.selectedName">
          <c-accordion-item name="item-1">
            <template #title>
              <span>{{ t('translate.showcase.accordion.initially_open.getting_started_title') }}</span>
            </template>
            <template #content>
              <p>{{ t('translate.showcase.accordion.initially_open.getting_started_content') }}</p>
            </template>
          </c-accordion-item>
          <c-accordion-item name="item-2">
            <template #title>
              <span>{{ t('translate.showcase.accordion.initially_open.installation_title') }}</span>
            </template>
            <template #content>
              <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto;">
npm install my-component
# or
yarn add my-component</pre>
            </template>
          </c-accordion-item>
          <c-accordion-item name="item-3">
            <template #title>
              <span>{{ t('translate.showcase.accordion.initially_open.usage_title') }}</span>
            </template>
            <template #content>
              <p>{{ t('translate.showcase.accordion.initially_open.usage_content') }}</p>
            </template>
          </c-accordion-item>
        </c-accordion>
      </div>
    `,
  }),
}

export const WithCustomContent: Story = {
  args: {
    selectedName: undefined,
  },
  render: (args) => ({
    components: { CAccordion, CAccordionItem },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div>
        <c-accordion>
          <c-accordion-item name="settings">
            <template #title>
              <span style="font-weight: 600; color: #667eea;">⚙️ {{ t('translate.showcase.accordion.custom.settings_title') }}</span>
            </template>
            <template #content>
              <div style="display: grid; gap: 12px;">
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <input type="checkbox" checked /> {{ t('translate.showcase.accordion.custom.enable_notifications') }}
                </label>
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <input type="checkbox" /> {{ t('translate.showcase.accordion.custom.dark_mode') }}
                </label>
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <input type="checkbox" checked /> {{ t('translate.showcase.accordion.custom.auto_save') }}
                </label>
              </div>
            </template>
          </c-accordion-item>
          <c-accordion-item name="advanced">
            <template #title>
              <span style="font-weight: 600; color: #667eea;">🔧 {{ t('translate.showcase.accordion.custom.advanced_title') }}</span>
            </template>
            <template #content>
              <div style="display: grid; gap: 12px;">
                <div>
                  <label style="display: block; margin-bottom: 4px; font-weight: 500;">{{ t('translate.showcase.accordion.custom.cache_size') }}</label>
                  <input type="number" value="256" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
                </div>
                <div>
                  <label style="display: block; margin-bottom: 4px; font-weight: 500;">{{ t('translate.showcase.accordion.custom.timeout') }}</label>
                  <input type="number" value="30" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
                </div>
              </div>
            </template>
          </c-accordion-item>
        </c-accordion>
      </div>
    `,
  }),
}

export const Multiple: Story = {
  args: {
    selectedName: undefined,
  },
  render: (args) => ({
    components: { CAccordion, CAccordionItem },
    setup() {
      const { t } = useI18n()
      const items = Array.from({ length: 5 }, (_, i) => ({
        id: `item-${i + 1}`,
        title: t('translate.showcase.accordion.multiple.item_title', { index: i + 1 }),
        content: t('translate.showcase.accordion.multiple.item_content', { index: i + 1 }),
      }))
      return { args, items }
    },
    template: `
      <div>
        <c-accordion>
          <c-accordion-item
            v-for="item in items"
            :key="item.id"
            :name="item.id"
          >
            <template #title>
              <span>{{ item.title }}</span>
            </template>
            <template #content>
              <p>{{ item.content }}</p>
            </template>
          </c-accordion-item>
        </c-accordion>
      </div>
    `,
  }),
}
