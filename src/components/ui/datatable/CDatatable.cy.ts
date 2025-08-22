import { mountCyComponent } from '../../../helpers/vue-test-helper'
import { uuidv4 } from '../../../helpers'
import i18nPlugin from '../../../plugins/i18n.plugin'
import CDatatable from './CDatatable.vue'

const headers = [
  {
    text: '#ID',
    key: 'id',
    align: 'start',
    sortable: true,
  }, {
    text: 'Nom',
    key: 'name',
    align: 'start',
    sortable: true,
  }, {
    text: 'Email',
    key: 'email',
    align: 'start',
    sortable: true,
    sortOrder: 'desc',
  },
]

function constructItems(length: number) {
  return Array.from({ length }).map(() => ({
    id: uuidv4(),
    name: uuidv4(),
    email: `${uuidv4()}@cresh.test.io`,
  }))
}

describe('<CDatatable />', () => {
  it('should render', () => {
    const itemsLength = 10
    mountCyComponent(CDatatable, {
      props: {
        items: constructItems(itemsLength),
        headers,
      },
    })

    cy.get('.c-datatable')
      .should('be.visible')

    cy.get('.c-datatable-header')
      .should('be.visible')
      .find('.header-item')
      .should('have.length', headers.length)

    cy.get('.datatable-item')
      .should('have.length', itemsLength)

    cy.get('.c-datatable-footer')
      .should('be.visible')
  })

  it('should have clickable rows', () => {
    mountCyComponent(CDatatable, {
      props: {
        items: constructItems(5),
        headers,
        rowClickable: true,
      },
    })

    cy.get('.datatable-item')
      .eq(0)
      .click()

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('row-click')).to.have.length(1)
      })
  })

  it('should be in loading state', () => {
    mountCyComponent(CDatatable, {
      props: {
        items: constructItems(5),
        headers,
        isLoading: true,
      },
    })

    cy.get('.loading-bar-thead')
      .should('be.visible')
  })

  it('should show retry layout', () => {
    mountCyComponent(CDatatable, {
      props: {
        items: [],
        headers,
      },
    })

    cy.get('.empty-datatable')
      .should('be.visible')

    cy.get('.c-icon.table-icon')
      .should('be.visible')

    cy.get('.btn.c-btn.primary')
      .should('be.visible')
      .should('contain', i18nPlugin.global.t('translate.datatable.retry'))

    cy.get('.empty-text')
      .should('contain', i18nPlugin.global.t('translate.datatable.no_data'))

    // test retry button
    cy.get('.retry-btn-wrapper')
      .find('.btn.c-btn.primary')
      .click()

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('update:retry')).to.have.length(1)
      })
  })

  it('should go on defined page', () => {
    mountCyComponent(CDatatable, {
      props: {
        items: constructItems(30),
        headers,
        page: 2,
      },
    })

    cy.get('.current-page-first-index')
      .should('contain', 2)
  })

  it('should should have 5 items per page', () => {
    mountCyComponent(CDatatable, {
      props: {
        itemsPerPage: 5,
        items: constructItems(30),
        headers,
      },
    })

    cy.get('.datatable-item')
      .should('have.length', 5)
  })

  it('should custom page number dropdown', () => {
    const pages = [3, 5, 10]
    mountCyComponent(CDatatable, {
      props: {
        items: constructItems(30),
        headers,
        pages,
      },
    })

    pages.forEach((value, index) => {
      cy.get('select')
        .select(index)
        .invoke('val')
        .should('deep.equal', String(value))
    })
  })

  it('should display all element in one page', () => {
    mountCyComponent(CDatatable, {
      props: {
        items: constructItems(30),
        headers,
        allowTotal: true,
      },
    })

    cy.get('select')
      .select(3)
      .should('contain', i18nPlugin.global.t('translate.common.all'))
  })

  it.only('should have skeleton', () => {
    mountCyComponent(CDatatable, {
      props: {
        items: [],
        headers,
        noSkeleton: false,
        isLoading: true,
      },
    })

    cy.get('.skeleton-datatable-row')
      .should('be.visible')
  })
})
