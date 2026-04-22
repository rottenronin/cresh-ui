import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CSteps from './CSteps.vue'
import CStep from './CStep.vue'

const meta = {
  title: 'UI/CSteps',
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
      const { t } = useI18n()
      const currentStep = ref(0)
      return { currentStep, t }
    },
    template: `
      <div>
        <c-steps :selected-index="currentStep">
          <c-step
            :name="t('translate.showcase.steps.basic.step1.name')"
            identifier="step1"
            :visible="currentStep === 0"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.basic.step1.title') }}</h3>
              <p>{{ t('translate.showcase.steps.basic.step1.description') }}</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 1" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  {{ t('translate.showcase.steps.actions.next') }}
                </button>
              </div>
            </div>
          </c-step>
          <c-step
            :name="t('translate.showcase.steps.basic.step2.name')"
            identifier="step2"
            :visible="currentStep === 1"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.basic.step2.title') }}</h3>
              <p>{{ t('translate.showcase.steps.basic.step2.description') }}</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 0" style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                  {{ t('translate.showcase.steps.actions.back') }}
                </button>
                <button @click="currentStep = 2" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  {{ t('translate.showcase.steps.actions.next') }}
                </button>
              </div>
            </div>
          </c-step>
          <c-step
            :name="t('translate.showcase.steps.basic.step3.name')"
            identifier="step3"
            :visible="currentStep === 2"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.basic.step3.title') }}</h3>
              <p>{{ t('translate.showcase.steps.basic.step3.description') }}</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 1" style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                  {{ t('translate.showcase.steps.actions.back') }}
                </button>
                <button style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  {{ t('translate.showcase.steps.actions.complete') }}
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
      const { t } = useI18n()
      const currentStep = ref(0)
      return { currentStep, t }
    },
    template: `
      <div>
        <c-steps
          :selected-index="currentStep"
          enable-navigation
          @step-selected="(index) => currentStep = index"
        >
          <c-step
            :name="t('translate.showcase.steps.with_navigation.overview.name')"
            identifier="overview"
            :visible="currentStep === 0"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.with_navigation.overview.title') }}</h3>
              <p>{{ t('translate.showcase.steps.with_navigation.overview.description') }}</p>
              <p>{{ t('translate.showcase.steps.with_navigation.current_step', { step: currentStep + 1 }) }}</p>
            </div>
          </c-step>
          <c-step
            :name="t('translate.showcase.steps.with_navigation.details.name')"
            identifier="details"
            :visible="currentStep === 1"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.with_navigation.details.title') }}</h3>
              <p>{{ t('translate.showcase.steps.with_navigation.details.description') }}</p>
              <p>{{ t('translate.showcase.steps.with_navigation.current_step', { step: currentStep + 1 }) }}</p>
            </div>
          </c-step>
          <c-step
            :name="t('translate.showcase.steps.with_navigation.review.name')"
            identifier="review"
            :visible="currentStep === 2"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.with_navigation.review.title') }}</h3>
              <p>{{ t('translate.showcase.steps.with_navigation.review.description') }}</p>
              <p>{{ t('translate.showcase.steps.with_navigation.current_step', { step: currentStep + 1 }) }}</p>
            </div>
          </c-step>
          <c-step
            :name="t('translate.showcase.steps.with_navigation.submit.name')"
            identifier="submit"
            :visible="currentStep === 3"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.with_navigation.submit.title') }}</h3>
              <p>{{ t('translate.showcase.steps.with_navigation.submit.description') }}</p>
              <p>{{ t('translate.showcase.steps.with_navigation.current_step', { step: currentStep + 1 }) }}</p>
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
      const { t } = useI18n()
      const currentStep = ref(0)
      return { currentStep, t }
    },
    template: `
      <div>
        <c-steps :selected-index="currentStep">
          <c-step
            :name="t('translate.showcase.steps.with_icons.cart.name')"
            identifier="cart"
            icon="shopping-cart"
            :visible="currentStep === 0"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.with_icons.cart.title') }}</h3>
              <p>{{ t('translate.showcase.steps.with_icons.cart.description') }}</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 1" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  {{ t('translate.showcase.steps.with_icons.actions.checkout') }}
                </button>
              </div>
            </div>
          </c-step>
          <c-step
            :name="t('translate.showcase.steps.with_icons.shipping.name')"
            identifier="shipping"
            icon="truck"
            :visible="currentStep === 1"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.with_icons.shipping.title') }}</h3>
              <p>{{ t('translate.showcase.steps.with_icons.shipping.description') }}</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 0" style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                  {{ t('translate.showcase.steps.actions.back') }}
                </button>
                <button @click="currentStep = 2" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  {{ t('translate.showcase.steps.with_icons.actions.payment') }}
                </button>
              </div>
            </div>
          </c-step>
          <c-step
            :name="t('translate.showcase.steps.with_icons.payment.name')"
            identifier="payment"
            icon="credit-card"
            :visible="currentStep === 2"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.with_icons.payment.title') }}</h3>
              <p>{{ t('translate.showcase.steps.with_icons.payment.description') }}</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 1" style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                  {{ t('translate.showcase.steps.actions.back') }}
                </button>
                <button style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  {{ t('translate.showcase.steps.with_icons.actions.place_order') }}
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
      const { t } = useI18n()
      const currentStep = ref(1)
      return { currentStep, t }
    },
    template: `
      <div>
        <c-steps :selected-index="currentStep">
          <c-step
            :name="t('translate.showcase.steps.with_progress.started.name')"
            identifier="started"
            :visible="currentStep === 0"
            :progression-percentage="100"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.with_progress.started.title') }}</h3>
            </div>
          </c-step>
          <c-step
            :name="t('translate.showcase.steps.with_progress.in_progress.name')"
            identifier="in-progress"
            :visible="currentStep === 1"
            :progression-percentage="65"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.with_progress.in_progress.title') }}</h3>
              <div style="width: 100px; height: 6px; background: #eee; border-radius: 3px; margin: 10px 0;">
                <div style="width: 65%; height: 100%; background: #667eea; border-radius: 3px;"></div>
              </div>
              <p>{{ t('translate.showcase.steps.with_progress.in_progress.percent_complete') }}</p>
              <div style="margin-top: 20px;">
                <button @click="currentStep = 2" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  {{ t('translate.showcase.steps.with_progress.in_progress.mark_complete') }}
                </button>
              </div>
            </div>
          </c-step>
          <c-step
            :name="t('translate.showcase.steps.with_progress.completed.name')"
            identifier="completed"
            :visible="currentStep === 2"
          >
            <div style="padding: 40px 20px;">
              <h3>{{ t('translate.showcase.steps.with_progress.completed.title') }}</h3>
              <p style="color: #10b981; font-size: 18px;">{{ t('translate.showcase.steps.with_progress.completed.message') }}</p>
            </div>
          </c-step>
        </c-steps>
      </div>
    `,
  }),
}
