/// <reference types="Cypress" /><

import { mountCyComponent } from '../../helpers/vue-test-helper'
import CModal from './CModal.vue'

describe('<CModal />', () => {
  it('should render', () => {
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
      },
    })
    cy.get('.c-modal-wrapper')
      .should('be.visible')

    cy.get('.mask')
      .invoke('css', 'background-color')
      .then(elem => {
        expect(elem).to.equals('rgba(0, 0, 0, 0.45)')
      })
  })

  it('should render with name', () => {
    const name = 'modal-name'
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
        name,
      },
    })

    cy.get('.c-modal')
      .invoke('attr', 'name')
      .should('eq', name)
  })

  it('should  be persistent', () => {
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
        persistent: false,
      },
    })

    cy.wait(102)
    cy.get('.mask')
      .click(0, 0, { force: true })

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('update:modelValue')[0][0]).equals(false)
      })

    mountCyComponent(CModal, {
      props: {
        modelValue: true,
        persistent: true,
      },
    })

    cy.wait(102)
    cy.get('.mask')
      .click(0, 0, { force: true })

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted()).not.contains(['update:modelValue'])
      })
  })

  it('should render title', () => {
    const title = 'modal title'
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
        title,
      },
    })

    cy.get('.title')
      .should('contain', title)
  })

  it('should be closable with cross icon button', () => {
    // default closable props
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
      },
    })

    cy.get('.close-btn')
      .click()

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('cancel')).to.have.length(1)
      })

    // closable props = false
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
        closable: false,
      },
    })

    cy.get('.close-btn')
      .should('not.exist')
  })

  it('should have defined width', () => {
    const width = 800
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
        width,
      },
    })

    cy.get('.c-modal')
      .invoke('outerWidth')
      .should('eq', width)
  })

  it('should have defined height', () => {
    const height = 500
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
        height,
      },
    })

    cy.get('.c-modal')
      .invoke('outerHeight')
      .should('eq', height)
  })

  it('should have custom text in ok button', () => {
    const okText = 'Submit'
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
        okText,
      },
    })

    cy.get('.ok-btn')
      .should('contain', okText)
  })

  it('should have custom text in cancel button', () => {
    const cancelText = 'Cancel'
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
        cancelText,
      },
    })

    cy.get('.cancel-btn')
      .should('contain', cancelText)
  })

  it('should hide footer', () => {
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
        noFooter: true,
      },
    })

    cy.get('.c-modal-footer')
      .should('not.exist')
  })
})
