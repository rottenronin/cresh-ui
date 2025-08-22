import { faker } from '@faker-js/faker/locale/fr'

import CCard from './CCard.vue'

import {
  mountCyComponent,
} from '../../helpers/vue-test-helper'

describe('<CCard />', () => {
  it('renders', () => {
    const data = {
      title: faker.word.words(2),
      content: faker.word.words(10),
      footer: faker.word.words(10),
    }
    mountCyComponent(CCard, {
      slots: {
        header: `<div class="title">${data.title}</div>`,
        default: data.content,
        footer: `<div class="footer">${data.footer}</div>`,
      },
    })
    cy.get('.c-card .c-card-header .title')
      .should('contain.text', data.title)

    cy.get('.c-card .card-content')
      .should('contain.text', data.content)

    cy.get('.c-card .c-card-footer .footer')
      .should('contain.text', data.footer)
  })
})
