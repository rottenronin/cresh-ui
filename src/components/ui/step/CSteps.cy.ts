import { mountCyComponent } from '../../../helpers/vue-test-helper'
import CSteps from './CSteps.vue'
import CStep from './CStep.vue'

describe('<CSteps />', () => {
  it('should render', () => {
    mountCyComponent(CSteps, {
      slots: {
        default: `
        <CStep
            name="Inscription Client"
            identifier="firstStep"
            :visible="true"
        >
          First step
        </CStep>
        <CStep
            name="Validation Cresh"
            identifier="secondStep"
        >
          Second step
        </CStep>
        `,
      },
      global: {
        stubs: {
          CStep,
        },
      },
    })

    cy.get('.c-steps')
      .should('be.visible')

    cy.get('.c-step-header-item')
      .should('have.length', 2)

    cy.get('.c-step')
      .eq(0)
      .should('contain', 'First step')

    cy.get('.progress-bar.unaccomplished')
      .should('have.attr', 'style')
      .and('include', 'width: 50%')
  })

  it('should render on selected step', () => {
    mountCyComponent(CSteps, {
      slots: {
        default: `
        <CStep
            name="Inscription Client"
            identifier="firstStep"
        >
          First step
        </CStep>
        <CStep
            name="Validation Cresh"
            identifier="secondStep"
        >
          Second step
        </CStep>
        `,
      },
      global: {
        stubs: {
          CStep,
        },
      },
      props: {
        stepId: 'secondStep',
      },
    })

    cy.get('.progress-bar')
      .should('not.have.class', '.unaccomplished')
  })
})
