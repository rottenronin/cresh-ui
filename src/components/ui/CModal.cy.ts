/// <reference types="cypress" />

import { defineComponent, h, ref } from 'vue'

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

    cy.get('.c-modal')
      .should('have.attr', 'role', 'dialog')
      .and('have.attr', 'aria-modal', 'true')
      .and('have.attr', 'aria-labelledby')

    cy.get('.title')
      .invoke('attr', 'id')
      .then(id => {
        cy.get('.c-modal')
          .should('have.attr', 'aria-labelledby', id)
      })
  })

  it('should be closable with cross icon button', () => {
    // default closable props
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
      },
    })

    cy.get('.close-btn')
      .should('have.prop', 'tagName', 'BUTTON')
      .click()

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('cancel')).to.have.length(1)
        expect(wrapper.emitted('update:modelValue')[0][0]).to.equal(false)
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

  it('should close from cancel button with v-model contract', () => {
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
      },
    })

    cy.get('.cancel-btn')
      .click()

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('cancel')).to.have.length(1)
        expect(wrapper.emitted('update:modelValue')[0][0]).to.equal(false)
      })
  })

  it('should close on Escape when closable and not persistent', () => {
    mountCyComponent(CModal, {
      props: {
        modelValue: true,
      },
    })

    cy.get('.c-modal')
      .focus()
      .type('{esc}')

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('cancel')).to.have.length(1)
        expect(wrapper.emitted('update:modelValue')[0][0]).to.equal(false)
      })
  })

  it('should trap focus and restore it after close', () => {
    const ModalHarness = defineComponent({
      setup() {
        const isOpen = ref(false)

        function openModal () {
          isOpen.value = true
        }

        return () => h('div', [
          h('button', {
            class: 'outside-trigger',
            onClick: openModal,
          }, 'Open modal'),
          h(CModal, {
            modelValue: isOpen.value,
            title: 'Focus modal test',
            'onUpdate:modelValue': (value: boolean) => {
              isOpen.value = value
            },
          }, {
            default: () => h('button', { class: 'content-action' }, 'Action'),
          }),
        ])
      },
    })

    mountCyComponent(ModalHarness)

    cy.get('.outside-trigger')
      .focus()
      .click()

    cy.focused()
      .should('have.class', 'close-btn')

    cy.get('.ok-btn')
      .focus()

    cy.get('.c-modal')
      .trigger('keydown', { key: 'Tab' })

    cy.focused()
      .should('have.class', 'close-btn')

    cy.get('.close-btn')
      .focus()

    cy.get('.c-modal')
      .trigger('keydown', { key: 'Tab', shiftKey: true })

    cy.focused()
      .should('have.class', 'ok-btn')

    cy.get('.close-btn')
      .click()

    cy.get('.c-modal-wrapper')
      .should('not.exist')

    cy.focused()
      .should('have.class', 'outside-trigger')
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
