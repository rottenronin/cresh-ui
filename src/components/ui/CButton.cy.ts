import {
  CheckBookIcon,
  ExitIcon,
} from '../icons'
import CButton from './CButton.vue'

import {
  mountCyComponent,
} from '../../helpers/vue-test-helper'

describe('<CAlert />', () => {
  it('renders', () => {
    mountCyComponent(CButton, {
      slots: {
        default: 'submit',
      },
    })

    cy.get('.c-btn')
      .should('exist')

    cy.get('.c-btn .btn-text')
      .should('contain.text', 'submit')
  })

  it('is-loading prop', () => {
    mountCyComponent(CButton, {
      props: {
        isLoading: true,
      },
      slots: {
        default: 'submit',
      },
    })
    cy.get('.c-btn .btn-text')
      .should('be.empty')

    cy.get('.c-icon.loader-icon')
      .should('exist')
  })

  it('on click event', () => {
    mountCyComponent(CButton, {
      slots: {
        default: 'submit',
      },
    })

    cy.get('.c-btn')
      .trigger('click')

    cy.vue().then((wrapper: any) => {
      const emitted = wrapper.emitted()
      expect(
        emitted,
      ).to.have.property('click')
    })
  })

  it('prefix icon', () => {
    mountCyComponent(CButton, {
      slots: {
        default: 'check book',
        prefix: CheckBookIcon,
      },
    })

    cy.get('.c-icon.check-book-icon')
      .should('exist')
  })

  it('suffix icon', () => {
    mountCyComponent(CButton, {
      slots: {
        default: 'check book',
        suffix: ExitIcon,
      },
    })

    cy.get('.c-icon.exit-icon')
      .should('exist')
  })

  it('disable prop', () => {
    mountCyComponent(CButton, {
      slots: {
        default: 'submit',
      },
      props: {
        disabled: true,
      },
    })

    cy.get('.c-btn')
      .should('be.disabled')
  })

  it('show text only', () => {
    mountCyComponent(CButton, {
      slots: {
        default: 'submit',
      },
      props: {
        text: true,
      },
    })

    cy.get('.c-btn.text')
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
  })
})
