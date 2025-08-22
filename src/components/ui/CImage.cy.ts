/// <reference types="Cypress" /><

import { mountCyComponent } from '../../helpers/vue-test-helper'
import CIcon from '../icons/CIcon.vue'
import CImage from './CImage.vue'

describe('<CImage />', () => {
  it('should render', () => {
    mountCyComponent(CImage, {
      global: {
        stubs: {
          CIcon,
        },
      },
    })

    cy.get('.c-icon.landscape-icon')
      .should('be.visible')
  })

  it('should render with custom image', () => {
    const src = 'tests/assets/accept.png'
    mountCyComponent(CImage, {
      props: {
        src,
      },
    })

    cy.get('img')
      .should('have.attr', 'src', src)
  })

  it('should render error image with invalid src', () => {
    const errorImageSrc = 'tests/assets/cross.png'
    mountCyComponent(CImage, {
      props: {
        src: 'invalid_link',
        errorImageSrc,
      },
    })

    cy.get('img')
      .should('have.attr', 'src', errorImageSrc)
  })
})
