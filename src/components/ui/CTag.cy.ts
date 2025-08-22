/// <reference types="Cypress" /><

import { mountCyComponent } from '../../helpers/vue-test-helper'
import CTag from './CTag.vue';

describe('<CTag />', () => {
  [
    'pending',
    'paid',
    'partially_refunded',
    'refunded',
    'cancelled',
    'failed',
    'expired',
    'error',
    'processing',
  ].forEach((color: string) => {
    it(`should render tag ${color}`, () => {
      mountCyComponent(CTag, {
        props: {
          color,
          textContent: `text testing sample for ${color}`,
        },
      })
      cy.get('.tag')
        .find(`.tag-item.tag-${color}`)
        .should('have.text', ` text testing sample for ${color}`)
    })
  })

  ;[
    'pending',
    'paid',
    'partially_refunded',
    'refunded',
    'cancelled',
    'failed',
    'expired',
    'error',
    'processing',
  ].forEach((color: string) => {
    it(`should render tag ${color} with additional info`, () => {
      mountCyComponent(CTag, {
        props: {
          color,
          textContent: `text testing sample for ${color} with additional info`,
          additionalInfo: `${color} additional info`,
        },
      })
      cy.get('.info-icon')
        .should('be.visible')
        .should('contain', 'i')

      cy.get('.tag')
        .find(`.tag-item.tag-${color}.details`)
        .invoke('show')
        .should('be.visible')
        .should('contain', `${color} additional info`)
    })
  })
})
