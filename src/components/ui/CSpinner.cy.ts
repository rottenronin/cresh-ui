/// <reference types="Cypress" /><

import { mountCyComponent } from '../../helpers/vue-test-helper'
import CSpinner from './CSpinner.vue'

describe('<CSpinner />', () => {
  it('should render with default values', () => {
    mountCyComponent(CSpinner)

    cy.get('.c-spinner')
      .should('be.visible')
      .invoke('width')
      .should('equal', 80)

    cy.get('.c-spinner')
      .should('be.visible')
      .invoke('height')
      .should('equal', 80)
  })

  it('should render with custom values', () => {
    const spinnerDimension = 150
    mountCyComponent(CSpinner, {
      props: {
        width: spinnerDimension,
        height: spinnerDimension,
      },
    })

    cy.get('.c-spinner')
      .should('be.visible')
      .invoke('width')
      .should('equal', spinnerDimension)

    cy.get('.c-spinner')
      .should('be.visible')
      .invoke('height')
      .should('equal', spinnerDimension)
  })
})
