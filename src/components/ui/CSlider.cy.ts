/// <reference types="Cypress" /><

import { mountCyComponent } from '../../helpers/vue-test-helper'
import CSlider from './CSlider.vue'

describe('<CSlider />', () => {
  it('should render', () => {
    mountCyComponent(CSlider, {
      props: {
        min: 0,
        max: 100,
        value: 20,
      },
    })

    cy.get('.slider-bar')
      .should('have.attr', 'min', 0)
      .should('have.attr', 'max', 100)

    cy.get('input')
      .should('have.value', 20)
  })

  it('should be disabled', () => {
    mountCyComponent(CSlider, {
      props: {
        min: 0,
        max: 100,
        value: 20,
        isDisabled: true,
      },
    })

    cy.get('.slider')
      .should('have.class', 'is-disabled')
  })

  it('should have markers', () => {
    const markers = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    mountCyComponent(CSlider, {
      props: {
        min: 0,
        max: 100,
        value: 20,
        markers,
      },
    })

    cy.get('#markers')
      .children()
      .should('have.length', markers.length)
  })
})
