import CDocumentItem from './CDocumentItem.vue'

import {
  mountCyComponent,
} from '../../helpers/vue-test-helper'

describe('<CDocumentItem />', () => {
  it('renders', () => {
    mountCyComponent(CDocumentItem, {
      props: {
        label: 'id card',
      },
    })

    cy.get('.c-document-item')
      .should('exist')

    cy.get('.document-label-container .c-icon')
      .should('have.class', 'document-sign-icon')

    cy.get('.document-label')
      .should('have.text', 'id card')
  })

  it('show all actions', () => {
    const actionItems = ['upload', 'validate', 'download', 'read']
    mountCyComponent(CDocumentItem, {
      props: {
        label: 'id card',
        actions: actionItems,
      },
    })
    actionItems.forEach(actionItem => {
      cy.get(`.actions .action-item.${actionItem}`)
        .should('exist')

      if (actionItem === 'validate') {
        cy.get(`.action-item.${actionItem} .c-icon.document-checked-icon`)
          .should('exist')
      } else if (actionItem === 'read') {
        cy.get(`.action-item.${actionItem} .c-icon.eye-icon`)
          .should('exist')
      } else {
        cy.get(`.action-item.${actionItem} .c-icon.${actionItem}-icon`)
          .should('exist')
      }
    })
  })

  it('show only availale actions', () => {
    const actionItems = ['upload']
    mountCyComponent(CDocumentItem, {
      props: {
        label: 'id card',
        actions: actionItems,
      },
    })
    cy.get('.action-item.upload')
      .should('exist')

    cy.get('.action-item')
      .should('have.length', 1)
  })

  it('should emit event on click', () => {
    const actionItems = ['upload']
    mountCyComponent(CDocumentItem, {
      props: {
        label: 'id card',
        actions: actionItems,
      },
    })

    cy.get('.action-item')
      .first()
      .trigger('click')

    cy.vue().then((wrapper: any) => {
      const emittedEvent = wrapper.emitted().upload[0][0]
      expect(emittedEvent.label).to.equals('id card')
      expect(emittedEvent.id)
    })
  })
})
