import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CVerticalStepper from './CVerticalStepper.vue'

const meta = {
  title: 'UI / Vertical Stepper',
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

const steps = [
  { id: '1', text: 'Personal Information' },
  { id: '2', text: 'Address Details' },
  { id: '3', text: 'Verification' },
  { id: '4', text: 'Complete' },
]

export const Basic: Story = {
  args: {
    steps,
    selectable: true,
    selectedIndex: 0,
  },
  render: (args) => ({
    components: { CVerticalStepper },
    setup() {
      const selectedIndex = ref(args.selectedIndex)
      const stepContent = [
        'Enter your personal details',
        'Enter your address information',
        'Verify your information',
        'Registration complete!',
      ]
      return { args, selectedIndex, stepContent }
    },
    template: `
      <div style="display: flex; gap: 40px;">
        <div style="flex: 0 0 250px;">
          <c-vertical-stepper
            :steps="args.steps"
            :selectable="args.selectable"
            :selected-index="selectedIndex"
            @select="selectedIndex = $event"
          />
        </div>
        <div style="flex: 1;">
          <div style="padding: 20px; background: #f5f5f5; border-radius: 4px;">
            <h3 style="margin-top: 0;">{{ args.steps[selectedIndex].text }}</h3>
            <p>{{ stepContent[selectedIndex] }}</p>
            <div style="display: flex; gap: 8px; margin-top: 16px;">
              <button
                v-if="selectedIndex > 0"
                @click="selectedIndex--"
                style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                Previous
              </button>
              <button
                v-if="selectedIndex < args.steps.length - 1"
                @click="selectedIndex++"
                style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                Next
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
    steps,
    selectable: false,
    selectedIndex: 1,
  },
  render: (args) => ({
    components: { CVerticalStepper },
    setup() {
      const selectedIndex = ref(args.selectedIndex)
      return { args, selectedIndex }
    },
    template: `
      <div style="display: flex; gap: 40px;">
        <div style="flex: 0 0 250px;">
          <c-vertical-stepper
            :steps="args.steps"
            :selectable="args.selectable"
            :selected-index="selectedIndex"
          />
        </div>
        <div style="flex: 1;">
          <div style="padding: 20px; background: #f5f5f5; border-radius: 4px;">
            <h3 style="margin-top: 0;">{{ args.steps[selectedIndex].text }}</h3>
            <p>Steps cannot be clicked in non-selectable mode.</p>
            <button
              @click="selectedIndex = (selectedIndex + 1) % args.steps.length"
              style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 16px;"
            >
              Simulate Progress
            </button>
          </div>
        </div>
      </div>
    `,
  }),
}

export const ManySteps: Story = {
  args: {
    steps: Array.from({ length: 8 }, (_, i) => ({
      id: String(i + 1),
      text: `Step ${i + 1}`,
    })),
    selectable: true,
    selectedIndex: 0,
  },
  render: (args) => ({
    components: { CVerticalStepper },
    setup() {
      const selectedIndex = ref(args.selectedIndex)
      return { args, selectedIndex }
    },
    template: `
      <div style="display: flex; gap: 40px;">
        <div style="flex: 0 0 250px; overflow-y: auto; max-height: 600px; border: 1px solid #ddd; border-radius: 4px; padding: 16px;">
          <c-vertical-stepper
            :steps="args.steps"
            :selectable="args.selectable"
            :selected-index="selectedIndex"
            @select="selectedIndex = $event"
          />
        </div>
        <div style="flex: 1;">
          <div style="padding: 20px; background: #f5f5f5; border-radius: 4px;">
            <h3 style="margin-top: 0;">{{ args.steps[selectedIndex].text }}</h3>
            <p>You are at step {{ selectedIndex + 1 }} of {{ args.steps.length }}</p>
            <div style="width: 100%; height: 8px; background: #e0e0e0; border-radius: 4px; margin: 16px 0;">
              <div
                :style="{ width: ((selectedIndex + 1) / args.steps.length * 100) + '%' }"
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
    steps: [
      { id: '1', text: 'Setup' },
      { id: '2', text: 'Configuration' },
      { id: '3', text: 'Testing' },
      { id: '4', text: 'Deployment' },
    ],
    selectable: true,
    selectedIndex: 0,
  },
  render: (args) => ({
    components: { CVerticalStepper },
    setup() {
      const selectedIndex = ref(args.selectedIndex)
      const descriptions = [
        'Configure your basic settings and preferences',
        'Set up advanced configuration options',
        'Run tests to verify everything works',
        'Deploy to production environment',
      ]
      return { args, selectedIndex, descriptions }
    },
    template: `
      <div style="display: flex; gap: 40px;">
        <div style="flex: 0 0 250px;">
          <c-vertical-stepper
            :steps="args.steps"
            :selectable="args.selectable"
            :selected-index="selectedIndex"
            @select="selectedIndex = $event"
          />
        </div>
        <div style="flex: 1;">
          <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 4px; margin-bottom: 16px;">
            <h2 style="margin-top: 0;">{{ args.steps[selectedIndex].text }}</h2>
            <p style="margin: 0;">{{ descriptions[selectedIndex] }}</p>
          </div>
          <div style="padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 4px;">
            <h4 style="margin-top: 0;">Step {{ selectedIndex + 1 }} Details</h4>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
            <div style="display: flex; gap: 8px; margin-top: 16px;">
              <button
                v-if="selectedIndex > 0"
                @click="selectedIndex--"
                style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                Back
              </button>
              <button
                v-if="selectedIndex < args.steps.length - 1"
                @click="selectedIndex++"
                style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                Continue
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
    steps: Array.from({ length: 5 }, (_, i) => ({
      id: String(i + 1),
      text: `Stage ${i + 1}`,
    })),
    selectable: true,
    selectedIndex: 2,
  },
  render: (args) => ({
    components: { CVerticalStepper },
    setup() {
      const selectedIndex = ref(args.selectedIndex)
      return { args, selectedIndex }
    },
    template: `
      <div>
        <h3 style="margin-top: 0;">Process Progress</h3>
        <div style="display: flex; gap: 20px;">
          <div style="flex: 0 0 200px;">
            <c-vertical-stepper
              :steps="args.steps"
              :selectable="args.selectable"
              :selected-index="selectedIndex"
              @select="selectedIndex = $event"
            />
          </div>
          <div style="flex: 1; padding: 20px; background: #f5f5f5; border-radius: 4px; min-height: 300px;">
            <div style="color: #999; font-size: 12px;">Stage {{ selectedIndex + 1 }} of {{ args.steps.length }}</div>
            <h4 style="margin: 8px 0 0 0;">{{ args.steps[selectedIndex].text }}</h4>
            <div style="width: 100%; height: 4px; background: #e0e0e0; border-radius: 2px; margin: 12px 0;">
              <div
                :style="{ width: ((selectedIndex + 1) / args.steps.length * 100) + '%' }"
                style="height: 100%; background: #10b981; border-radius: 2px;"
              ></div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
