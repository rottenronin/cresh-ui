import { mountCyComponent } from '../../../helpers/vue-test-helper'
import CDrawer from './CDrawer.vue'
import CDrawerItem from './CDrawerItem.vue'

describe('<CDrawer />', () => {
  it('should render', () => {
    mountCyComponent(CDrawer, {
      props: {
        modelValue: true,
      },
      slots: {
        default: `
          <CDrawerItem>
            test
          </CDrawerItem>

          <CDrawerItem>
            test 2
          </CDrawerItem>
        `,
      },
      global: {
        stubs: {
          CDrawerItem,
        },
      },
    })

    cy.get('.c-drawer')
      .should('be.visible')

    cy.get('.c-drawer-item')
      .should('have.length', 2)
  })

  it('should have custom width', () => {
    const width = 500
    mountCyComponent(CDrawer, {
      props: {
        modelValue: true,
        width,
      },
      slots: {
        default: `
          <CDrawerItem>
            test
          </CDrawerItem>

          <CDrawerItem>
            test 2
          </CDrawerItem>
        `,
      },
      global: {
        stubs: {
          CDrawerItem,
        },
      },
    })

    cy.get('.c-drawer')
      .invoke('width')
      .should('eq', width)
  })

  it('should have custom height', () => {
    const height = 500
    mountCyComponent(CDrawer, {
      props: {
        modelValue: true,
        height,
      },
      slots: {
        default: `
          <CDrawerItem>
            test
          </CDrawerItem>

          <CDrawerItem>
            test 2
          </CDrawerItem>
        `,
      },
      global: {
        stubs: {
          CDrawerItem,
        },
      },
    })

    cy.get('.c-drawer')
      .invoke('height')
      .should('eq', height)
  })

  ;[
    'left',
    'right',
    'top',
    'bottom',
  ].forEach(place => {
    it(`should be placed ${place}`, () => {
      mountCyComponent(CDrawer, {
        props: {
          modelValue: true,
          placement: place,
        },
        slots: {
          default: `
          <CDrawerItem>
            test
          </CDrawerItem>

          <CDrawerItem>
            test 2
          </CDrawerItem>
        `,
        },
        global: {
          stubs: {
            CDrawerItem,
          },
        },
      })

      cy.get('.c-drawer')
        .should('have.class', place)
    })
  })
})
