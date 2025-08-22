import CAlert from './CAlert.vue'

import {
  $t,
  mountCyComponent,
} from '../../helpers/vue-test-helper'

describe('<CAlert />', () => {
  context('renders', () => {
    [
      'default',
      'success',
      'info',
      'warning',
      'error',
    ].forEach((type: string) => {
      it(`alert: ${type}`, () => {
        mountCyComponent(CAlert, {
          props: {
            type,
          },
          slots: {
            default: `type: ${type}`,
          },
        })
        cy.get('.c-alert')
          .should('have.class', `alert-${type}`)

        switch (type) {
          case 'success':
            cy.get('.c-icon')
              .should('have.class', 'check-circle-icon')
            break
          case 'info':
            cy.get('.c-icon')
              .should('have.class', 'info-icon')
            break
          case 'warning':
            cy.get('.c-icon')
              .should('have.class', 'warning-icon')
            break
          case 'error':
            cy.get('.c-icon')
              .should('have.class', 'error-icon')
            break
          default:
            cy.get('.c-icon')
              .should('not.exist')
        }
      })
    })
  })
})
