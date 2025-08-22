// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker/locale/fr'
import {
  mountCyComponent,
} from '../../helpers/vue-test-helper'

import CEmpty from './CEmpty.vue'
import i18nPlugin from '../../plugins/i18n.plugin'

describe('<CEmpty />', () => {
  it('renders', () => {
    mountCyComponent(CEmpty)

    cy.get('.c-empty')
      .find('.c-icon.table-icon')

    cy.get('.c-empty')
      .find('.content')
      .should('contain.text', i18nPlugin.global.t('translate.common.errors.no_data'))
  })

  it('customization via props', () => {
    const message = faker.word.words()

    mountCyComponent(CEmpty, {
      props: {
        icon: 'document',
        message,
      },
    })

    cy.get('.c-empty')
      .find('.c-icon.document-icon')

    cy.get('.c-empty')
      .find('.content')
      .should('contain.text', message)
  })

  it('customization via slots', () => {
    const message = faker.word.words()

    mountCyComponent(CEmpty, {
      slots: {
        icon: '<c-icon class="test" />',
        content: `<div class="custom-content">${message}</div>`,
      },
    })

    cy.get('.c-empty')
      .find('c-icon.test')

    cy.get('.c-empty')
      .find('.content .custom-content')
      .should('contain.text', message)
  })
})
