import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'
import CVerticalStepperAlt from './CVerticalStepperAlt.vue'

const meta = {
  title: 'UI/CVerticalStepperAlt',
  component: CVerticalStepperAlt,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: { type: 'object' },
      description: 'Array of step items with state',
    },
  },
} satisfies Meta<typeof CVerticalStepperAlt>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
  render: args => ({
    components: { CVerticalStepperAlt },
    setup() {
      const { t } = useI18n()
      const steps = args.steps ?? [
        { id: '1', text: t('translate.showcase.vertical_stepper_alt.basic.steps.account_verification'), subtitle: t('translate.showcase.vertical_stepper_alt.basic.subtitles.account_verification'), state: 'completed' as const },
        { id: '2', text: t('translate.showcase.vertical_stepper_alt.basic.steps.profile_setup'), subtitle: t('translate.showcase.vertical_stepper_alt.basic.subtitles.profile_setup'), state: 'completed' as const },
        { id: '3', text: t('translate.showcase.vertical_stepper_alt.basic.steps.payment_method'), subtitle: t('translate.showcase.vertical_stepper_alt.basic.subtitles.payment_method'), state: 'active' as const },
        { id: '4', text: t('translate.showcase.vertical_stepper_alt.basic.steps.subscription_plan'), subtitle: t('translate.showcase.vertical_stepper_alt.basic.subtitles.subscription_plan'), state: 'unComplete' as const },
        { id: '5', text: t('translate.showcase.vertical_stepper_alt.basic.steps.complete'), subtitle: t('translate.showcase.vertical_stepper_alt.basic.subtitles.complete'), state: 'unComplete' as const },
      ]
      return { steps, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.vertical_stepper_alt.basic.title') }}</h3>
        <c-vertical-stepper-alt :steps="steps" />
      </div>
    `,
  }),
}

export const AllCompleted: Story = {
  render: () => ({
    components: { CVerticalStepperAlt },
    setup() {
      const { t } = useI18n()
      const steps = [
        { id: '1', text: t('translate.showcase.vertical_stepper_alt.all_completed.steps.order_placed'), subtitle: t('translate.showcase.vertical_stepper_alt.all_completed.subtitles.order_placed'), state: 'completed' as const },
        { id: '2', text: t('translate.showcase.vertical_stepper_alt.all_completed.steps.payment_confirmed'), subtitle: t('translate.showcase.vertical_stepper_alt.all_completed.subtitles.payment_confirmed'), state: 'completed' as const },
        { id: '3', text: t('translate.showcase.vertical_stepper_alt.all_completed.steps.shipped'), subtitle: t('translate.showcase.vertical_stepper_alt.all_completed.subtitles.shipped'), state: 'completed' as const },
        { id: '4', text: t('translate.showcase.vertical_stepper_alt.all_completed.steps.delivered'), subtitle: t('translate.showcase.vertical_stepper_alt.all_completed.subtitles.delivered'), state: 'completed' as const },
      ]
      return { steps, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">✓ {{ t('translate.showcase.vertical_stepper_alt.all_completed.title') }}</h3>
        <c-vertical-stepper-alt :steps="steps" />
      </div>
    `,
  }),
}

export const InProgress: Story = {
  render: () => ({
    components: { CVerticalStepperAlt },
    setup() {
      const { t } = useI18n()
      const steps = [
        { id: '1', text: t('translate.showcase.vertical_stepper_alt.in_progress.steps.request_submitted'), subtitle: t('translate.showcase.vertical_stepper_alt.in_progress.subtitles.request_submitted'), state: 'completed' as const },
        { id: '2', text: t('translate.showcase.vertical_stepper_alt.in_progress.steps.processing'), subtitle: t('translate.showcase.vertical_stepper_alt.in_progress.subtitles.processing'), state: 'active' as const },
        { id: '3', text: t('translate.showcase.vertical_stepper_alt.in_progress.steps.approved'), subtitle: t('translate.showcase.vertical_stepper_alt.in_progress.subtitles.approved'), state: 'unComplete' as const },
        { id: '4', text: t('translate.showcase.vertical_stepper_alt.in_progress.steps.completed'), subtitle: t('translate.showcase.vertical_stepper_alt.in_progress.subtitles.completed'), state: 'unComplete' as const },
      ]
      return { steps, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.vertical_stepper_alt.in_progress.title') }}</h3>
        <c-vertical-stepper-alt :steps="steps" />
        <div style="margin-top: 20px; padding: 12px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; color: #155724; font-size: 14px;">
          {{ t('translate.showcase.vertical_stepper_alt.in_progress.note') }}
        </div>
      </div>
    `,
  }),
}

export const OnboardingFlow: Story = {
  render: () => ({
    components: { CVerticalStepperAlt },
    setup() {
      const { t } = useI18n()
      const steps = [
        { id: '1', text: t('translate.showcase.vertical_stepper_alt.onboarding.steps.welcome'), subtitle: t('translate.showcase.vertical_stepper_alt.onboarding.subtitles.welcome'), state: 'completed' as const },
        { id: '2', text: t('translate.showcase.vertical_stepper_alt.onboarding.steps.connect_social_media'), subtitle: t('translate.showcase.vertical_stepper_alt.onboarding.subtitles.connect_social_media'), state: 'completed' as const },
        { id: '3', text: t('translate.showcase.vertical_stepper_alt.onboarding.steps.customize_profile'), subtitle: t('translate.showcase.vertical_stepper_alt.onboarding.subtitles.customize_profile'), state: 'active' as const },
        { id: '4', text: t('translate.showcase.vertical_stepper_alt.onboarding.steps.invite_friends'), subtitle: t('translate.showcase.vertical_stepper_alt.onboarding.subtitles.invite_friends'), state: 'unComplete' as const },
        { id: '5', text: t('translate.showcase.vertical_stepper_alt.onboarding.steps.explore_features'), subtitle: t('translate.showcase.vertical_stepper_alt.onboarding.subtitles.explore_features'), state: 'unComplete' as const },
      ]
      return { steps, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.vertical_stepper_alt.onboarding.title') }}</h3>
        <c-vertical-stepper-alt :steps="steps" />
        <div style="margin-top: 20px; display: flex; gap: 8px;">
          <button style="flex: 1; padding: 10px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer;">
            {{ t('translate.showcase.vertical_stepper_alt.onboarding.skip') }}
          </button>
          <button style="flex: 1; padding: 10px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
            {{ t('translate.showcase.vertical_stepper_alt.onboarding.next') }}
          </button>
        </div>
      </div>
    `,
  }),
}

export const LongDescription: Story = {
  render: () => ({
    components: { CVerticalStepperAlt },
    setup() {
      const { t } = useI18n()
      const steps = [
        { id: '1', text: t('translate.showcase.vertical_stepper_alt.long_description.steps.create_account'), subtitle: t('translate.showcase.vertical_stepper_alt.long_description.subtitles.create_account'), state: 'completed' as const },
        { id: '2', text: t('translate.showcase.vertical_stepper_alt.long_description.steps.verify_email'), subtitle: t('translate.showcase.vertical_stepper_alt.long_description.subtitles.verify_email'), state: 'completed' as const },
        { id: '3', text: t('translate.showcase.vertical_stepper_alt.long_description.steps.set_up_security'), subtitle: t('translate.showcase.vertical_stepper_alt.long_description.subtitles.set_up_security'), state: 'active' as const },
        { id: '4', text: t('translate.showcase.vertical_stepper_alt.long_description.steps.complete_profile'), subtitle: t('translate.showcase.vertical_stepper_alt.long_description.subtitles.complete_profile'), state: 'unComplete' as const },
        { id: '5', text: t('translate.showcase.vertical_stepper_alt.long_description.steps.start_using_app'), subtitle: t('translate.showcase.vertical_stepper_alt.long_description.subtitles.start_using_app'), state: 'unComplete' as const },
      ]
      return { steps, t }
    },
    template: `
      <div style="max-width: 600px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.vertical_stepper_alt.long_description.title') }}</h3>
        <c-vertical-stepper-alt :steps="steps" />
      </div>
    `,
  }),
}

export const MultiStep: Story = {
  render: () => ({
    components: { CVerticalStepperAlt },
    setup() {
      const { t } = useI18n()
      const steps = Array.from({ length: 7 }, (_, i) => {
        let state: 'completed' | 'active' | 'unComplete' = 'unComplete'
        if (i < 4) state = 'completed'
        if (i === 4) state = 'active'
        return {
          id: String(i + 1),
          text: t('translate.showcase.vertical_stepper_alt.multi_step.phase', { number: i + 1 }),
          subtitle: t('translate.showcase.vertical_stepper_alt.multi_step.phase_description', { number: i + 1 }),
          state,
        }
      })
      return { steps, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.vertical_stepper_alt.multi_step.title') }}</h3>
        <c-vertical-stepper-alt :steps="steps" />
        <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 4px;">
          <p style="margin: 0; font-weight: 500;">{{ t('translate.showcase.vertical_stepper_alt.multi_step.progress', { current: 5, total: 7 }) }}</p>
          <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.3); border-radius: 3px; margin: 8px 0;">
            <div style="width: 71%; height: 100%; background: white; border-radius: 3px;"></div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const ErrorState: Story = {
  render: () => ({
    components: { CVerticalStepperAlt },
    setup() {
      const { t } = useI18n()
      const steps = [
        { id: '1', text: t('translate.showcase.vertical_stepper_alt.error_state.steps.submit_application'), subtitle: t('translate.showcase.vertical_stepper_alt.error_state.subtitles.submit_application'), state: 'completed' as const },
        { id: '2', text: t('translate.showcase.vertical_stepper_alt.error_state.steps.review'), subtitle: t('translate.showcase.vertical_stepper_alt.error_state.subtitles.review'), state: 'active' as const },
        { id: '3', text: t('translate.showcase.vertical_stepper_alt.error_state.steps.approved'), subtitle: t('translate.showcase.vertical_stepper_alt.error_state.subtitles.approved'), state: 'unComplete' as const },
      ]
      return { steps, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.vertical_stepper_alt.error_state.title') }}</h3>
        <c-vertical-stepper-alt :steps="steps" />
        <div style="margin-top: 20px; padding: 16px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; color: #856404;">
          <strong>⚠️ {{ t('translate.showcase.vertical_stepper_alt.error_state.note_title') }}</strong>
          <p style="margin: 8px 0 0 0;">{{ t('translate.showcase.vertical_stepper_alt.error_state.note_content') }}</p>
        </div>
      </div>
    `,
  }),
}
