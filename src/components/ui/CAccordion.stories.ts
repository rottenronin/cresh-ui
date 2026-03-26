import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
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
      const selectedItem = ref<string | undefined>()
      return { args, selectedItem }
    },
    template: `
      <div>
        <c-accordion
          @accordion-change="selectedItem = $event"
        >
          <c-accordion-item name="item-1">
            <template #title>
              <span>Introduction</span>
            </template>
            <template #content>
              <p>This is the introduction section of the accordion. You can add any content here.</p>
            </template>
          </c-accordion-item>
          <c-accordion-item name="item-2">
            <template #title>
              <span>Features</span>
            </template>
            <template #content>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Smooth animations</li>
                <li>Easy to customize</li>
                <li>Accessible</li>
                <li>Multiple items can be tracked</li>
              </ul>
            </template>
          </c-accordion-item>
          <c-accordion-item name="item-3">
            <template #title>
              <span>Questions</span>
            </template>
            <template #content>
              <p>Have any questions? Feel free to ask! This section can contain FAQs or additional information.</p>
            </template>
          </c-accordion-item>
        </c-accordion>
        <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
          <p>Currently selected: {{ selectedItem || 'None' }}</p>
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
      const selectedItem = ref<string | undefined>()
      return { args, selectedItem }
    },
    template: `
      <div>
        <c-accordion :selected-name="args.selectedName">
          <c-accordion-item name="item-1">
            <template #title>
              <span>Getting Started</span>
            </template>
            <template #content>
              <p>Welcome to the getting started guide. This will help you set up the component.</p>
            </template>
          </c-accordion-item>
          <c-accordion-item name="item-2">
            <template #title>
              <span>Installation</span>
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
              <span>Usage</span>
            </template>
            <template #content>
              <p>Import the component and use it in your application.</p>
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
      return { args }
    },
    template: `
      <div>
        <c-accordion>
          <c-accordion-item name="settings">
            <template #title>
              <span style="font-weight: 600; color: #667eea;">⚙️ Settings</span>
            </template>
            <template #content>
              <div style="display: grid; gap: 12px;">
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <input type="checkbox" checked /> Enable notifications
                </label>
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <input type="checkbox" /> Dark mode
                </label>
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <input type="checkbox" checked /> Auto-save
                </label>
              </div>
            </template>
          </c-accordion-item>
          <c-accordion-item name="advanced">
            <template #title>
              <span style="font-weight: 600; color: #667eea;">🔧 Advanced</span>
            </template>
            <template #content>
              <div style="display: grid; gap: 12px;">
                <div>
                  <label style="display: block; margin-bottom: 4px; font-weight: 500;">Cache size (MB):</label>
                  <input type="number" value="256" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
                </div>
                <div>
                  <label style="display: block; margin-bottom: 4px; font-weight: 500;">Timeout (seconds):</label>
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
      const items = Array.from({ length: 5 }, (_, i) => ({
        id: `item-${i + 1}`,
        title: `Item ${i + 1}`,
        content: `Content for item ${i + 1}. You can add rich content here.`,
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
