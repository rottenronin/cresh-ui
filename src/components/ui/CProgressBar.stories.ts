import type { Meta, StoryObj } from '@storybook/vue3'
import CProgressBar from './CProgressBar.vue'

const meta = {
  title: 'UI/CProgressBar',
  component: CProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progress value (0-100)',
    },
    type: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error', 'info'],
      description: 'Progress bar type',
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Show percentage label',
    },
  },
} satisfies Meta<typeof CProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 50,
  },
}

export const Success: Story = {
  args: {
    value: 100,
    type: 'success',
  },
}

export const Warning: Story = {
  args: {
    value: 75,
    type: 'warning',
  },
}

export const Error: Story = {
  args: {
    value: 25,
    type: 'error',
  },
}

export const WithLabel: Story = {
  args: {
    value: 60,
    showLabel: true,
  },
}

export const Multiple: Story = {
  render: () => ({
    components: { CProgressBar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <p style="margin: 0 0 8px 0; font-size: 12px;">Project A</p>
          <c-progress-bar :value="30" type="primary" />
        </div>
        <div>
          <p style="margin: 0 0 8px 0; font-size: 12px;">Project B</p>
          <c-progress-bar :value="60" type="warning" />
        </div>
        <div>
          <p style="margin: 0 0 8px 0; font-size: 12px;">Project C</p>
          <c-progress-bar :value="100" type="success" />
        </div>
      </div>
    `,
  }),
}
