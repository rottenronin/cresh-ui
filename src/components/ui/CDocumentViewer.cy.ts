import { faker } from '@faker-js/faker/locale/fr'
import CDocumentViewer from './CDocumentViewer.vue'

import {
  mountCyComponent,
} from '../../helpers/vue-test-helper'

describe('<CDocumentViewer />', () => {
  it('renders', () => {
    const documentItem = {
      link: faker.image.url(),
      label: faker.word.noun(),
      id: faker.internet.ip(),
    }
    mountCyComponent(CDocumentViewer, {
      props: {
        modelValue: true,
        document: documentItem,
      },
    })

    cy.get('.c-document-viewer .headline')
      .find('.document-label')
      .should('contain.text', documentItem.label)

    cy.get('.c-document-viewer .headline')
      .find('.document-label')
      .should('contain.text', documentItem.label)

    cy.get('.c-document-viewer .preview')
      .find('object')
      .then(object => {
        const dataVal = object.attr('data')
        expect(dataVal).to.eq(documentItem.link)
      })
  })

  it('label slot', () => {
    const documentItem = {
      link: faker.image.url(),
      label: faker.word.noun(),
      id: faker.internet.ip(),
    }
    mountCyComponent(CDocumentViewer, {
      props: {
        modelValue: true,
        document: documentItem,
      },
      slots: {
        label: '<div class="custom-label">custom label</div>',
      },
    })
    cy.get('.c-document-viewer')
      .find('.headline')
      .find('.custom-label')
      .should('have.text', 'custom label')
  })

  it('header actions slot', () => {
    const documentItem = {
      link: faker.image.url(),
      label: faker.word.noun(),
      id: faker.internet.ip(),
    }
    mountCyComponent(CDocumentViewer, {
      props: {
        modelValue: true,
        document: documentItem,
      },
      slots: {
        'header-actions': '<c-button>Refresh document</c-button>',
      },
    })

    cy.get('.header-actions')
      .find('c-button')
      .should('have.text', 'Refresh document')
  })

  it('emits prev event when clicking previous button', () => {
    const documentItem = {
      link: faker.image.url(),
      label: faker.word.noun(),
      id: faker.internet.ip(),
    }
    mountCyComponent(CDocumentViewer, {
      props: {
        modelValue: true,
        document: documentItem,
      },
    })

    cy.get('.c-document-viewer')
      .find('button.left-file-nav')
      .click()

    cy.get('.c-document-viewer')
      .should('emit', 'prev')
  })

  it('emits next event when clicking next button', () => {
    const documentItem = {
      link: faker.image.url(),
      label: faker.word.noun(),
      id: faker.internet.ip(),
    }
    mountCyComponent(CDocumentViewer, {
      props: {
        modelValue: true,
        document: documentItem,
      },
    })

    cy.get('.c-document-viewer')
      .find('button.right-file-nav')
      .click()

    cy.get('.c-document-viewer')
      .should('emit', 'next')
  })

  it('navigation buttons have accessible labels', () => {
    const documentItem = {
      link: faker.image.url(),
      label: faker.word.noun(),
      id: faker.internet.ip(),
    }
    mountCyComponent(CDocumentViewer, {
      props: {
        modelValue: true,
        document: documentItem,
      },
    })

    cy.get('button.left-file-nav')
      .should('have.attr', 'aria-label', 'Previous document')
      .should('have.attr', 'type', 'button')

    cy.get('button.right-file-nav')
      .should('have.attr', 'aria-label', 'Next document')
      .should('have.attr', 'type', 'button')
  })

  it('hide arrows', () => {
    const documentItem = {
      link: faker.image.url(),
      label: faker.word.noun(),
      id: faker.internet.ip(),
    }
    mountCyComponent(CDocumentViewer, {
      props: {
        hideArrows: true,
        document: documentItem,
      },
    })
    cy.get('.navigation-btns')
      .should('not.exist')
  })
})


