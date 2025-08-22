/// <reference types="Cypress" /><

import { mountCyComponent } from '../../helpers/vue-test-helper'
import CSwitch from './CSwitch.vue'

describe('<CSwitch />', () => {
  it('should render', () => {
    mountCyComponent(CSwitch)

    cy.get('.c-switch')
      .should('be.visible')
  })

  it('should switch', () => {
    mountCyComponent(CSwitch)

    cy.get('.input')
      .should('not.be.checked')

    cy.get('.c-switch')
      .click()
      .find('.input')
      .should('be.checked')

    cy.get('.c-switch')
      .click()
      .find('.input')
      .should('not.be.checked')
  })

  it('should be checked by default', () => {
    mountCyComponent(CSwitch, {
      props: {
        checked: true,
      },
    })

    cy.get('.input')
      .should('be.checked')
  })
})
