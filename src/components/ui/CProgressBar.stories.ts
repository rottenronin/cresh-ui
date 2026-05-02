import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'
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
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'warning', 'info', 'success', 'error'],
      description: 'Progress bar color',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Indeterminate loading state',
    },
  },
} satisfies Meta<typeof CProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 50,
  },
  render: args => ({
    components: { CProgressBar },
    setup() {
      return { args }
    },
    template: '<div style="width: 500px;"><c-progress-bar v-bind="args" /></div>',
  }),
}

export const Success: Story = {
  args: {
    value: 100,
    color: 'success',
  },
  render: args => ({
    components: { CProgressBar },
    setup() {
      return { args }
    },
    template: '<div style="width: 500px;"><c-progress-bar v-bind="args" /></div>',
  }),
}

export const Warning: Story = {
  args: {
    value: 75,
    color: 'warning',
  },
  render: args => ({
    components: { CProgressBar },
    setup() {
      return { args }
    },
    template: '<div style="width: 500px;"><c-progress-bar v-bind="args" /></div>',
  }),
}

export const Error: Story = {
  args: {
    value: 25,
    color: 'error',
  },
  render: args => ({
    components: { CProgressBar },
    setup() {
      return { args }
    },
    template: '<div style="width: 500px;"><c-progress-bar v-bind="args" /></div>',
  }),
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    color: 'primary',
  },
  render: args => ({
    components: { CProgressBar },
    setup() {
      return { args }
    },
    template: '<div style="width: 500px;"><c-progress-bar v-bind="args" /></div>',
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { CProgressBar },
    setup() {
      const { t } = useI18n()
      return { t }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 500px;">
        <div>
          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">{{ t('translate.showcase.progress_bar.multiple.project_a') }}</p>
          <c-progress-bar :value="30" color="primary" />
        </div>
        <div>
          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">{{ t('translate.showcase.progress_bar.multiple.project_b') }}</p>
          <c-progress-bar :value="60" color="warning" />
        </div>
        <div>
          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">{{ t('translate.showcase.progress_bar.multiple.project_c') }}</p>
          <c-progress-bar :value="100" color="success" />
        </div>
        <div>
          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">{{ t('translate.showcase.progress_bar.multiple.loading') }}</p>
          <c-progress-bar :indeterminate="true" color="info" />
        </div>
      </div>
    `,
  }),
}
