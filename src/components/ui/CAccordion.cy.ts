/// <reference types="Cypress" /><

import { mountCyComponent } from '../../helpers/vue-test-helper'
import CAccordion from './CAccordion.vue'
import CAccordionItem from './CAccordionItem.vue'

describe('<CAccordion />', () => {
  beforeEach(() => {
    mountCyComponent(CAccordion, {
      slots: {
        default: `
          <CAccordionItem :name="'acc1'">
            <template #title>
              title
            </template>

            <template #content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </template>
          </CAccordionItem>
        `,
      },
      global: {
        stubs: { CAccordionItem },
      },
    })
  })

  it('should render', () => {
    cy.get('.title')
      .should('contain.text', 'title')

    cy.get('.c-icon.chevron-down-icon')
      .should('be.visible')
  })

  it('should handle click', () => {
    cy.get('.content')
      .should('not.be.visible')

    cy.get('.header')
      .trigger('click')

    cy.get('.content')
      .should('be.visible')
      .find('.wrapper-content')
      .should('contain.text', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.')
  })
})
