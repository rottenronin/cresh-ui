import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CVerticalStepper from './CVerticalStepper.vue'

const meta = {
  title: 'UI/CVerticalStepper',
  component: CVerticalStepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: { type: 'object' },
      description: 'Array of step items',
    },
    selectable: {
      control: { type: 'boolean' },
      description: 'Allow clicking on steps to navigate',
    },
    selectedIndex: {
      control: { type: 'number' },
      description: 'Currently selected step index',
    },
  },
} satisfies Meta<typeof CVerticalStepper>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    selectable: true,
    selectedIndex: 0,
  },
  render: args => ({
    components: { CVerticalStepper },
    setup() {
      const { t } = useI18n()
      const selectedIndex = ref(args.selectedIndex)
      const stepContent = [
        t('translate.showcase.vertical_stepper.basic.content.personal_information'),
        t('translate.showcase.vertical_stepper.basic.content.address_details'),
        t('translate.showcase.vertical_stepper.basic.content.verification'),
        t('translate.showcase.vertical_stepper.basic.content.complete'),
      ]
      const steps = args.steps ?? [
        { id: '1', text: t('translate.showcase.vertical_stepper.basic.steps.personal_information') },
        { id: '2', text: t('translate.showcase.vertical_stepper.basic.steps.address_details') },
        { id: '3', text: t('translate.showcase.vertical_stepper.basic.steps.verification') },
        { id: '4', text: t('translate.showcase.vertical_stepper.basic.steps.complete') },
      ]
      return { args, steps, selectedIndex, stepContent, t }
    },
    template: `
      <div style="display: flex; gap: 40px;">
        <div style="flex: 0 0 250px;">
          <c-vertical-stepper
            :steps="steps"
            :selectable="args.selectable"
            :selected-index="selectedIndex"
            @select="selectedIndex = $event"
          />
        </div>
        <div style="flex: 1;">
          <div style="padding: 20px; background: #f5f5f5; border-radius: 4px;">
            <h3 style="margin-top: 0;">{{ steps[selectedIndex].text }}</h3>
            <p>{{ stepContent[selectedIndex] }}</p>
            <div style="display: flex; gap: 8px; margin-top: 16px;">
              <button
                v-if="selectedIndex > 0"
                @click="selectedIndex--"
                style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                {{ t('translate.showcase.vertical_stepper.basic.previous') }}
              </button>
              <button
                v-if="selectedIndex < steps.length - 1"
                @click="selectedIndex++"
                style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                {{ t('translate.showcase.vertical_stepper.basic.next') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const NonSelectable: Story = {
  args: {
    selectable: false,
    selectedIndex: 1,
  },
  render: args => ({
    components: { CVerticalStepper },
    setup() {
      const { t } = useI18n()
      const selectedIndex = ref(args.selectedIndex)
      const steps = args.steps ?? [
        { id: '1', text: t('translate.showcase.vertical_stepper.basic.steps.personal_information') },
        { id: '2', text: t('translate.showcase.vertical_stepper.basic.steps.address_details') },
        { id: '3', text: t('translate.showcase.vertical_stepper.basic.steps.verification') },
        { id: '4', text: t('translate.showcase.vertical_stepper.basic.steps.complete') },
      ]
      return { args, steps, selectedIndex, t }
    },
    template: `
      <div style="display: flex; gap: 40px;">
        <div style="flex: 0 0 250px;">
          <c-vertical-stepper
            :steps="steps"
            :selectable="args.selectable"
            :selected-index="selectedIndex"
          />
        </div>
        <div style="flex: 1;">
          <div style="padding: 20px; background: #f5f5f5; border-radius: 4px;">
            <h3 style="margin-top: 0;">{{ steps[selectedIndex].text }}</h3>
            <p>{{ t('translate.showcase.vertical_stepper.non_selectable.content') }}</p>
            <button
              @click="selectedIndex = (selectedIndex + 1) % steps.length"
              style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 16px;"
            >
              {{ t('translate.showcase.vertical_stepper.non_selectable.simulate_progress') }}
            </button>
          </div>
        </div>
      </div>
    `,
  }),
}

export const ManySteps: Story = {
  args: {
    selectable: true,
    selectedIndex: 0,
  },
  render: args => ({
    components: { CVerticalStepper },
    setup() {
      const { t } = useI18n()
      const selectedIndex = ref(args.selectedIndex)
      const steps = args.steps ?? Array.from({ length: 8 }, (_, i) => ({
        id: String(i + 1),
        text: t('translate.showcase.vertical_stepper.many_steps.step', { number: i + 1 }),
      }))
      return { args, steps, selectedIndex, t }
    },
    template: `
      <div style="display: flex; gap: 40px;">
        <div style="flex: 0 0 250px; overflow-y: auto; max-height: 600px; border: 1px solid #ddd; border-radius: 4px; padding: 16px;">
          <c-vertical-stepper
            :steps="steps"
            :selectable="args.selectable"
            :selected-index="selectedIndex"
            @select="selectedIndex = $event"
          />
        </div>
        <div style="flex: 1;">
          <div style="padding: 20px; background: #f5f5f5; border-radius: 4px;">
            <h3 style="margin-top: 0;">{{ steps[selectedIndex].text }}</h3>
            <p>{{ t('translate.showcase.vertical_stepper.many_steps.progress', { current: selectedIndex + 1, total: steps.length }) }}</p>
            <div style="width: 100%; height: 8px; background: #e0e0e0; border-radius: 4px; margin: 16px 0;">
              <div
                :style="{ width: ((selectedIndex + 1) / steps.length * 100) + '%' }"
                style="height: 100%; background: #667eea; border-radius: 4px; transition: width 0.3s;"
              ></div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const WithDescription: Story = {
  args: {
    selectable: true,
    selectedIndex: 0,
  },
  render: args => ({
    components: { CVerticalStepper },
    setup() {
      const { t } = useI18n()
      const selectedIndex = ref(args.selectedIndex)
      const descriptions = [
        t('translate.showcase.vertical_stepper.with_description.descriptions.setup'),
        t('translate.showcase.vertical_stepper.with_description.descriptions.configuration'),
        t('translate.showcase.vertical_stepper.with_description.descriptions.testing'),
        t('translate.showcase.vertical_stepper.with_description.descriptions.deployment'),
      ]
      const steps = args.steps ?? [
        { id: '1', text: t('translate.showcase.vertical_stepper.with_description.steps.setup') },
        { id: '2', text: t('translate.showcase.vertical_stepper.with_description.steps.configuration') },
        { id: '3', text: t('translate.showcase.vertical_stepper.with_description.steps.testing') },
        { id: '4', text: t('translate.showcase.vertical_stepper.with_description.steps.deployment') },
      ]
      return { args, steps, selectedIndex, descriptions, t }
    },
    template: `
      <div style="display: flex; gap: 40px;">
        <div style="flex: 0 0 250px;">
          <c-vertical-stepper
            :steps="steps"
            :selectable="args.selectable"
            :selected-index="selectedIndex"
            @select="selectedIndex = $event"
          />
        </div>
        <div style="flex: 1;">
          <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 4px; margin-bottom: 16px;">
            <h2 style="margin-top: 0;">{{ steps[selectedIndex].text }}</h2>
            <p style="margin: 0;">{{ descriptions[selectedIndex] }}</p>
          </div>
          <div style="padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 4px;">
            <h4 style="margin-top: 0;">{{ t('translate.showcase.vertical_stepper.with_description.step_details', { number: selectedIndex + 1 }) }}</h4>
            <ul>
              <li>{{ t('translate.showcase.vertical_stepper.with_description.items.item_1') }}</li>
              <li>{{ t('translate.showcase.vertical_stepper.with_description.items.item_2') }}</li>
              <li>{{ t('translate.showcase.vertical_stepper.with_description.items.item_3') }}</li>
            </ul>
            <div style="display: flex; gap: 8px; margin-top: 16px;">
              <button
                v-if="selectedIndex > 0"
                @click="selectedIndex--"
                style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                {{ t('translate.showcase.vertical_stepper.with_description.back') }}
              </button>
              <button
                v-if="selectedIndex < steps.length - 1"
                @click="selectedIndex++"
                style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                {{ t('translate.showcase.vertical_stepper.with_description.continue') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const CompactLayout: Story = {
  args: {
    selectable: true,
    selectedIndex: 2,
  },
  render: args => ({
    components: { CVerticalStepper },
    setup() {
      const { t } = useI18n()
      const selectedIndex = ref(args.selectedIndex)
      const steps = args.steps ?? Array.from({ length: 5 }, (_, i) => ({
        id: String(i + 1),
        text: t('translate.showcase.vertical_stepper.compact.stage', { number: i + 1 }),
      }))
      return { args, steps, selectedIndex, t }
    },
    template: `
      <div>
        <h3 style="margin-top: 0;">{{ t('translate.showcase.vertical_stepper.compact.title') }}</h3>
        <div style="display: flex; gap: 20px;">
          <div style="flex: 0 0 200px;">
            <c-vertical-stepper
              :steps="steps"
              :selectable="args.selectable"
              :selected-index="selectedIndex"
              @select="selectedIndex = $event"
            />
          </div>
          <div style="flex: 1; padding: 20px; background: #f5f5f5; border-radius: 4px; min-height: 300px;">
            <div style="color: #999; font-size: 12px;">{{ t('translate.showcase.vertical_stepper.compact.progress', { current: selectedIndex + 1, total: steps.length }) }}</div>
            <h4 style="margin: 8px 0 0 0;">{{ steps[selectedIndex].text }}</h4>
            <div style="width: 100%; height: 4px; background: #e0e0e0; border-radius: 2px; margin: 12px 0;">
              <div
                :style="{ width: ((selectedIndex + 1) / steps.length * 100) + '%' }"
                style="height: 100%; background: #10b981; border-radius: 2px;"
              ></div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
