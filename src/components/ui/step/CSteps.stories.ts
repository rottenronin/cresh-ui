import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CSteps from './CSteps.vue'
import CStep from './CStep.vue'

const meta = {
  title: 'UI / Steps',
  component: CSteps,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    enableNavigation: {
      control: { type: 'boolean' },
      description: 'Allow navigation between steps',
    },
  },
} satisfies Meta<typeof CSteps>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => ({
    components: { CSteps, CStep },
    setup() {
      const currentStep = ref(0)
      return { currentStep }
    },
    template: `
      <div>
        <c-steps :selected-index="currentStep">
          <c-step
            name="Step 1"
            identifier="step1"
            :visible="currentStep === 0"
          >
            <div style="padding: 40px 20px;">
              <h3>Step 1: Personal Information</h3>
              <p>Enter your personal details here.</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 1" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  Next
                </button>
              </div>
            </div>
          </c-step>
          <c-step
            name="Step 2"
            identifier="step2"
            :visible="currentStep === 1"
          >
            <div style="padding: 40px 20px;">
              <h3>Step 2: Address Information</h3>
              <p>Enter your address details here.</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 0" style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                  Back
                </button>
                <button @click="currentStep = 2" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  Next
                </button>
              </div>
            </div>
          </c-step>
          <c-step
            name="Step 3"
            identifier="step3"
            :visible="currentStep === 2"
          >
            <div style="padding: 40px 20px;">
              <h3>Step 3: Confirmation</h3>
              <p>Review and confirm your information.</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 1" style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                  Back
                </button>
                <button style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  Complete
                </button>
              </div>
            </div>
          </c-step>
        </c-steps>
      </div>
    `,
  }),
}

export const WithNavigation: Story = {
  render: () => ({
    components: { CSteps, CStep },
    setup() {
      const currentStep = ref(0)
      return { currentStep }
    },
    template: `
      <div>
        <c-steps
          :selected-index="currentStep"
          enable-navigation
          @step-selected="(index) => currentStep = index"
        >
          <c-step
            name="Overview"
            identifier="overview"
            :visible="currentStep === 0"
          >
            <div style="padding: 40px 20px;">
              <h3>Overview</h3>
              <p>Click on any step to navigate. You can click on previous steps.</p>
              <p>Current step: {{ currentStep + 1 }}</p>
            </div>
          </c-step>
          <c-step
            name="Details"
            identifier="details"
            :visible="currentStep === 1"
          >
            <div style="padding: 40px 20px;">
              <h3>Details</h3>
              <p>This step contains detailed information.</p>
              <p>Current step: {{ currentStep + 1 }}</p>
            </div>
          </c-step>
          <c-step
            name="Review"
            identifier="review"
            :visible="currentStep === 2"
          >
            <div style="padding: 40px 20px;">
              <h3>Review</h3>
              <p>Review your information before submitting.</p>
              <p>Current step: {{ currentStep + 1 }}</p>
            </div>
          </c-step>
          <c-step
            name="Submit"
            identifier="submit"
            :visible="currentStep === 3"
          >
            <div style="padding: 40px 20px;">
              <h3>Submit</h3>
              <p>Ready to submit your information.</p>
              <p>Current step: {{ currentStep + 1 }}</p>
            </div>
          </c-step>
        </c-steps>
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { CSteps, CStep },
    setup() {
      const currentStep = ref(0)
      return { currentStep }
    },
    template: `
      <div>
        <c-steps :selected-index="currentStep">
          <c-step
            name="Cart"
            identifier="cart"
            icon="shopping-cart"
            :visible="currentStep === 0"
          >
            <div style="padding: 40px 20px;">
              <h3>Shopping Cart</h3>
              <p>Review your shopping cart.</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 1" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  Continue to Checkout
                </button>
              </div>
            </div>
          </c-step>
          <c-step
            name="Shipping"
            identifier="shipping"
            icon="truck"
            :visible="currentStep === 1"
          >
            <div style="padding: 40px 20px;">
              <h3>Shipping Information</h3>
              <p>Enter your shipping address.</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 0" style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                  Back
                </button>
                <button @click="currentStep = 2" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  Continue to Payment
                </button>
              </div>
            </div>
          </c-step>
          <c-step
            name="Payment"
            identifier="payment"
            icon="credit-card"
            :visible="currentStep === 2"
          >
            <div style="padding: 40px 20px;">
              <h3>Payment</h3>
              <p>Enter your payment information.</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 1" style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                  Back
                </button>
                <button style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  Place Order
                </button>
              </div>
            </div>
          </c-step>
        </c-steps>
      </div>
    `,
  }),
}

export const WithProgress: Story = {
  render: () => ({
    components: { CSteps, CStep },
    setup() {
      const currentStep = ref(1)
      return { currentStep }
    },
    template: `
      <div>
        <c-steps :selected-index="currentStep">
          <c-step
            name="Started"
            identifier="started"
            :visible="currentStep === 0"
            :progression-percentage="100"
          >
            <div style="padding: 40px 20px;">
              <h3>Task Started</h3>
            </div>
          </c-step>
          <c-step
            name="In Progress"
            identifier="in-progress"
            :visible="currentStep === 1"
            :progression-percentage="65"
          >
            <div style="padding: 40px 20px;">
              <h3>Task In Progress</h3>
              <div style="width: 100px; height: 6px; background: #eee; border-radius: 3px; margin: 10px 0;">
                <div style="width: 65%; height: 100%; background: #667eea; border-radius: 3px;"></div>
              </div>
              <p>65% Complete</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 2" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  Mark Complete
                </button>
              </div>
            </div>
          </c-step>
          <c-step
            name="Completed"
            identifier="completed"
            :visible="currentStep === 2"
          >
            <div style="padding: 40px 20px;">
              <h3>Task Completed</h3>
              <p style="color: #10b981; font-size: 18px;">✓ All steps finished!</p>
            </div>
          </c-step>
        </c-steps>
      </div>
    `,
  }),
}
