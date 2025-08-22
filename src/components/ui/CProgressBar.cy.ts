/// <reference types="Cypress" /><

import { mountCyComponent } from '../../helpers/vue-test-helper'
import CProgressBar from './CProgressBar.vue'

describe('<CProgressBar />', () => {
  it('should render', () => {
    mountCyComponent(CProgressBar)

    cy.get('.c-progress-bar.c-progress-bar')
      .should('be.visible')
  })

  it('should render with value', () => {
    const value = 80
    mountCyComponent(CProgressBar, {
      props: {
        value,
      },
    })

    cy.get('.progression')
      .should('have.attr', 'style')
      .and('include', `width: ${value}%`)
  })

  ;[
    'primary',
    'secondary',
    'tertiary',
    'warning',
    'info',
    'success',
    'error',
  ].forEach((color: string) => {
    it('should render with custom color', () => {
      mountCyComponent(CProgressBar, {
        props: {
          value: 20,
          color,
        },
      })

      cy.get('.progression')
        .should('have.attr', 'style')
        .and('include', `background-color: var(--color-${color}`)
    })
  })

  it('should render with intermediate property', () => {
    mountCyComponent(CProgressBar, {
      props: {
        indeterminate: true,
      },
    })

    cy.get('.c-progress-bar.c-progress-bar')
      .should('have.class', 'indeterminate')
  })
})
