import { mountCyComponent } from '../../../helpers/vue-test-helper'
import CTab from './CTab.vue'
import CTabs from './CTabs.vue'

describe('<CTabs />', () => {
  it('should render', () => {
    mountCyComponent(CTabs, {
      slots: {
        default: `
          <CTab
            icon="info"
            name="tab-1"
            identifier="tabInfo"
          >
            tab 1 content
          </CTab>

          <CTab
            icon="locker"
            name="tab-2"
            identifier="tabLocker"
          >
            tab 2 content
          </CTab>
        `,
      },
      global: {
        stubs: {
          CTab,
        },
      },
    })

    // header
    cy.get('.c-tabs-headers')
      .should('be.visible')
      .children()
      .should('have.length', 2)

    // header tab 1
    cy.get('.c-tabs-header-btn')
      .eq(0)
      .should('contain', 'tab-1')
      .find('.c-icon')
      .should('have.class', 'info-icon')

    // header tab 2
    cy.get('.c-tabs-header-btn')
      .eq(1)
      .should('contain', 'tab-2')
      .find('.c-icon')
      .should('have.class', 'locker-icon')

    cy.get('.c-tab')
      .should('have.length', 2)

    // tab 1
    cy.get('.c-tab')
      .eq(0)
      .should('contain', 'tab 1 content')

    // go to second tab
    cy.get('.c-tabs-header-btn')
      .eq(1)
      .click()

    // tab 2
    cy.get('.c-tab')
      .eq(1)
      .should('contain', 'tab 2 content')
  })

  it('should render on second tab', () => {
    mountCyComponent(CTabs, {
      props: {
        selectedId: 'tabLocker',
      },
      slots: {
        default: `
          <CTab
            icon="info"
            name="tab-1"
            identifier="tabInfo"
          >
            tab 1 content
          </CTab>

          <CTab
            icon="locker"
            name="tab-2"
            identifier="tabLocker"
          >
            tab 2 content
          </CTab>
        `,
      },
      global: {
        stubs: {
          CTab,
        },
      },
    })

    // verify if tab-change is emitted
    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('tab-change')).to.have.length(1)
      })
  })

  it('should locked tab', () => {
    mountCyComponent(CTabs, {
      slots: {
        default: `
          <CTab
            icon="info"
            name="tab-1"
            identifier="tabInfo"
            :disabled="true"
          >
            tab 1 content
          </CTab>

          <CTab
            icon="locker"
            name="tab-2"
            identifier="tabLocker"
          >
            tab 2 content
          </CTab>
        `,
      },
      global: {
        stubs: {
          CTab,
        },
      },
    })

    cy.get('.c-tabs-header-btn')
      .eq(0)
      .should('have.class', 'disabled')
  })

  it('should have button in header', () => {
    const buttonLabel = 'button label'
    const buttonColor = 'primary'
    const buttonIconName = 'rocket'
    mountCyComponent(CTabs, {
      props: {
        hasButton: true,
        buttonLabel,
        buttonColor,
        buttonIconName,
      },
      slots: {
        default: `
          <CTab
            icon="info"
            name="tab-1"
            identifier="tabInfo"
            :disabled="true"
          >
            tab 1 content
          </CTab>

          <CTab
            icon="locker"
            name="tab-2"
            identifier="tabLocker"
          >
            tab 2 content
          </CTab>
        `,
      },
      global: {
        stubs: {
          CTab,
        },
      },
    })

    cy.get('.c-tabs-header-btn')
      .eq(0)
      .should('be.visible')
      .should('have.class', 'tab-button')
      .should('contain', buttonLabel)
      .find('.c-icon')
      .should('have.class', `${buttonIconName}-icon`)

    // button handler
    cy.get('.c-tabs-header-btn')
      .eq(0)
      .click()

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('button-click')).to.have.length(1)
      })
  })
})
