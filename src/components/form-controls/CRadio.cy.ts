/// <reference types="cypress" />

import { mountCyComponent } from '../../helpers/vue-test-helper'
import CRadio from './CRadio.vue'

describe('<CRadio />', () => {
  it('should select on label click', () => {
    mountCyComponent(CRadio, {
      props: {
        modelValue: '',
        name: 'choice',
        value: 'option-1',
        label: 'Option 1',
      },
    })

    cy.contains('label', 'Option 1').click()

    cy.get('input[type="radio"]')
      .should('be.checked')

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('update:modelValue')[0][0]).to.equal('option-1')
      })
  })

  it('should select with keyboard when focused', () => {
    mountCyComponent(CRadio, {
      props: {
        modelValue: '',
        name: 'choice',
        value: 'option-1',
        label: 'Option 1',
      },
    })

    cy.get('input[type="radio"]')
      .focus()
      .type('{space}')
      .should('be.checked')

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('update:modelValue')[0][0]).to.equal('option-1')
      })
  })
})