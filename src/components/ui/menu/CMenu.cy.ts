import { mountCyComponent } from '../../../helpers/vue-test-helper'
import CMenu from './CMenu.vue'
import CMenuItem from './CMenuItem.vue'

describe('<CMenu />', () => {
  it('should render', () => {
    mountCyComponent(CMenu, {
      slots: {
        default: `
          <CMenuItem
              text="Tarifications"
          />
          <CMenuItem
              text="Recommandation Cresh"
          />
        `,
      },
      global: {
        stubs: {
          CMenuItem,
        },
      },
    })

    cy.get('.c-menu')
      .should('be.visible')

    cy.get('.c-menu-item')
      .should('have.length', 2)
  })

  it('should render with title', () => {
    const title = 'title'
    mountCyComponent(CMenu, {
      slots: {
        default: `
          <CMenuItem
              text="Tarifications"
          />
          <CMenuItem
              text="Recommandation Cresh"
          />
        `,
      },
      global: {
        stubs: {
          CMenuItem,
        },
      },
      props: {
        title,
      },
    })

    cy.get('.c-menu-header-title')
      .should('contain', title)
  })

  it('should render with icon', () => {
    mountCyComponent(CMenu, {
      slots: {
        default: `
          <CMenuItem
              text="Tarifications"
              icon="info"
          />
        `,
      },
      global: {
        stubs: {
          CMenuItem,
        },
      },
    })

    cy.get('.c-icon')
      .should('have.class', 'info-icon')
  })

  it('should render item with text', () => {
    mountCyComponent(CMenu, {
      slots: {
        default: `
          <CMenuItem
              text="Tarifications"
          />
        `,
      },
      global: {
        stubs: {
          CMenuItem,
        },
      },
    })

    cy.get('.item-text')
      .should('contain', 'Tarifications')
  })

  it('should should render collapsible item', () => {
    mountCyComponent(CMenu, {
      slots: {
        default: `
          <CMenuItem
            text="Tarifications"
            collapsible
            :collapsed="false"
          >
            <template #collapsible-content>
              <CMenuItem text="collapsible item 1" />
              <CMenuItem text="collapsible item 2" />
            </template>
          </CMenuItem>
        `,
      },
      global: {
        stubs: {
          CMenuItem,
        },
      },
    })

    cy.get('.c-menu-item.selectable')
      .should('have.class', 'expanded')

    cy.get('.collapsible-content')
      .children()
      .should('have.length', 2)
  })
})
