import type { Meta, StoryObj } from '@storybook/vue3'
import CVerticalStepperAlt from './CVerticalStepperAlt.vue'

const meta = {
  title: 'UI / Vertical Stepper Alt',
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

const steps = [
  {
    id: '1',
    text: 'Account Verification',
    subtitle: 'Confirm your email address',
    state: 'completed' as const,
  },
  {
    id: '2',
    text: 'Profile Setup',
    subtitle: 'Add your personal information',
    state: 'completed' as const,
  },
  {
    id: '3',
    text: 'Payment Method',
    subtitle: 'Add your payment information',
    state: 'active' as const,
  },
  {
    id: '4',
    text: 'Subscription Plan',
    subtitle: 'Choose your plan',
    state: 'unComplete' as const,
  },
  {
    id: '5',
    text: 'Complete',
    subtitle: 'You are all set!',
    state: 'unComplete' as const,
  },
]

export const Basic: Story = {
  args: {
    steps,
  },
  render: (args) => ({
    components: { CVerticalStepperAlt },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">Registration Progress</h3>
        <c-vertical-stepper-alt :steps="args.steps" />
      </div>
    `,
  }),
}

export const AllCompleted: Story = {
  render: () => ({
    components: { CVerticalStepperAlt },
    setup() {
      const steps = [
        {
          id: '1',
          text: 'Order Placed',
          subtitle: 'March 25, 2024',
          state: 'completed' as const,
        },
        {
          id: '2',
          text: 'Payment Confirmed',
          subtitle: 'Payment received',
          state: 'completed' as const,
        },
        {
          id: '3',
          text: 'Shipped',
          subtitle: 'In transit',
          state: 'completed' as const,
        },
        {
          id: '4',
          text: 'Delivered',
          subtitle: 'At your location',
          state: 'completed' as const,
        },
      ]
      return { steps }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">✓ Order Complete</h3>
        <c-vertical-stepper-alt :steps="steps" />
      </div>
    `,
  }),
}

export const InProgress: Story = {
  render: () => ({
    components: { CVerticalStepperAlt },
    setup() {
      const steps = [
        {
          id: '1',
          text: 'Request Submitted',
          subtitle: 'Your request has been received',
          state: 'completed' as const,
        },
        {
          id: '2',
          text: 'Processing',
          subtitle: 'We are reviewing your request',
          state: 'active' as const,
        },
        {
          id: '3',
          text: 'Approved',
          subtitle: 'Waiting for approval',
          state: 'unComplete' as const,
        },
        {
          id: '4',
          text: 'Completed',
          subtitle: 'Your request is complete',
          state: 'unComplete' as const,
        },
      ]
      return { steps }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">Processing Your Request</h3>
        <c-vertical-stepper-alt :steps="steps" />
        <div style="margin-top: 20px; padding: 12px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; color: #155724; font-size: 14px;">
          This usually takes 2-3 business days.
        </div>
      </div>
    `,
  }),
}

export const OnboardingFlow: Story = {
  render: () => ({
    components: { CVerticalStepperAlt },
    setup() {
      const steps = [
        {
          id: '1',
          text: 'Welcome',
          subtitle: 'Get started with us',
          state: 'completed' as const,
        },
        {
          id: '2',
          text: 'Connect Social Media',
          subtitle: 'Link your social accounts',
          state: 'completed' as const,
        },
        {
          id: '3',
          text: 'Customize Profile',
          subtitle: 'Set up your profile',
          state: 'active' as const,
        },
        {
          id: '4',
          text: 'Invite Friends',
          subtitle: 'Build your network',
          state: 'unComplete' as const,
        },
        {
          id: '5',
          text: 'Explore Features',
          subtitle: 'Discover what we offer',
          state: 'unComplete' as const,
        },
      ]
      return { steps }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">Welcome! Let's Get Started</h3>
        <c-vertical-stepper-alt :steps="steps" />
        <div style="margin-top: 20px; display: flex; gap: 8px;">
          <button style="flex: 1; padding: 10px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Skip
          </button>
          <button style="flex: 1; padding: 10px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Next
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
      const steps = [
        {
          id: '1',
          text: 'Create Your Account',
          subtitle: 'Sign up with your email or social media',
          state: 'completed' as const,
        },
        {
          id: '2',
          text: 'Verify Your Email',
          subtitle: 'Click the link in the verification email we sent you',
          state: 'completed' as const,
        },
        {
          id: '3',
          text: 'Set Up Security',
          subtitle: 'Configure two-factor authentication for extra security',
          state: 'active' as const,
        },
        {
          id: '4',
          text: 'Complete Your Profile',
          subtitle: 'Add a photo and personal information to your profile',
          state: 'unComplete' as const,
        },
        {
          id: '5',
          text: 'Start Using the App',
          subtitle: 'You are ready to explore all features',
          state: 'unComplete' as const,
        },
      ]
      return { steps }
    },
    template: `
      <div style="max-width: 600px;">
        <h3 style="margin-top: 0;">Account Setup Wizard</h3>
        <c-vertical-stepper-alt :steps="steps" />
      </div>
    `,
  }),
}

export const MultiStep: Story = {
  render: () => ({
    components: { CVerticalStepperAlt },
    setup() {
      const steps = Array.from({ length: 7 }, (_, i) => {
        let state: 'completed' | 'active' | 'unComplete' = 'unComplete'
        if (i < 4) state = 'completed'
        if (i === 4) state = 'active'
        return {
          id: String(i + 1),
          text: `Phase ${i + 1}`,
          subtitle: `Step ${i + 1} description`,
          state,
        }
      })
      return { steps }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">Project Timeline</h3>
        <c-vertical-stepper-alt :steps="steps" />
        <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 4px;">
          <p style="margin: 0; font-weight: 500;">Progress: Step 5 of 7</p>
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
      const steps = [
        {
          id: '1',
          text: 'Submit Application',
          subtitle: 'Application submitted',
          state: 'completed' as const,
        },
        {
          id: '2',
          text: 'Review',
          subtitle: 'Currently under review',
          state: 'active' as const,
        },
        {
          id: '3',
          text: 'Approved',
          subtitle: 'Awaiting approval',
          state: 'unComplete' as const,
        },
      ]
      return { steps }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">Application Status</h3>
        <c-vertical-stepper-alt :steps="steps" />
        <div style="margin-top: 20px; padding: 16px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; color: #856404;">
          <strong>⚠️ Please Note</strong>
          <p style="margin: 8px 0 0 0;">Your application is pending review. You will be notified once a decision has been made.</p>
        </div>
      </div>
    `,
  }),
}
