import { mountCyComponent } from '../../../helpers/vue-test-helper'
import CMenuItem from './CMenuItem.vue'

describe('<CMenuItem />', () => {
  it('should trigger expand/collapse event', () => {
    mountCyComponent(CMenuItem, {
      slots: {
        'collapsible-content': `
          <CMenuItem text="collapsible item 1" />
          <CMenuItem text="collapsible item 2" />
        `,
      },
      global: {
        stubs: {
          CMenuItem,
        },
      },
      props: {
        text: 'Tarifications',
        collapsible: true,
      },
    })

    cy.get('.c-menu-item > .default-content')
      .eq(0)
      .click()

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('expand')).to.have.length(1)
      })
  })
})
