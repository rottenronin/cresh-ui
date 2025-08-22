// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker/locale/fr'
import CErrorMessage from './CErrorMessage.vue'

import {
  mountCyComponent,
} from '../../helpers/vue-test-helper'
import i18nPlugin from '../../plugins/i18n.plugin'

describe('<CErrorMessage />', () => {
  it('renders', () => {
    mountCyComponent(CErrorMessage)

    cy.get('.error-message')
      .find('.c-icon.error-icon')

    cy.get('.error-message p.message')
      .should('have.text', i18nPlugin.global.t('translate.common.errors.default_error'))
  })

  it('customization', () => {
    const message = faker.word.words(20)
    mountCyComponent(CErrorMessage, {
      props: {
        hideIcon: true,
      },
      slots: {
        default: `<p class="custom-message">${message}</p>`,
      },
    })

    cy.get('.error-message')
      .find('.c-icon.error-icon')
      .should('not.exist')

    cy.get('.error-message p.custom-message')
      .should('have.text', message)
  })

  it('display array of errors messages', () => {
    const message1 = faker.word.words(20)
    const message2 = faker.word.words(20)

    mountCyComponent(CErrorMessage, {
      props: {
        hideIcon: true,
        error: [message1, message2],
      },
    })

    cy.get('.error-message')
      .find('.message')
      .eq(0)
      .should('have.text', message1)

    cy.get('.error-message')
      .find('.message')
      .eq(1)
      .should('have.text', message2)
  })

  it('display single error', () => {
    const error = {
      message: faker.word.words(10),
    }

    mountCyComponent(CErrorMessage, {
      props: {
        hideIcon: true,
        error,
      },
    })

    cy.get('.error-message')
      .find('.message')
      .should('have.text', error.message)
  })
})
