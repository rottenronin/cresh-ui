import CDropdown from './CDropdown.vue'

import {
  mountCyComponent,
} from '../../helpers/vue-test-helper'

const dropdownItems = [{
  value: 'animal1',
  key: 'cat',
}, {
  value: 'animal2',
  key: 'dog',
}, {
  value: 'animal3',
  key: 'panda',
}, {
  value: 'animal4',
  key: 'duck',
}, {
  value: 'animal5',
  key: 'chicken',
}]

describe('<CDropdown />', () => {
  it('renders', () => {
    mountCyComponent(CDropdown, {
      props: {
        items: dropdownItems,
        modelValue: true,
      },
      slots: {
        default: 'animal',
      },
    })

    cy.get('.c-dropdown .dropdown-trigger')
      .find('.content')
      .should('have.text', 'animal')

    dropdownItems.forEach((keyValue, i) => {
      cy.get('.c-dropdown .dropdown-list .list-item')
        .eq(i)
        .should('contain.text', keyValue.key)
    })
  })

  it('preselect selected value', () => {
    const preselectedItem = dropdownItems[dropdownItems.length - 1]
    mountCyComponent(CDropdown, {
      props: {
        items: dropdownItems,
        modelValue: true,
        preSelectedItem: preselectedItem,
      },
      slots: {
        default: 'animal',
      },
    })

    cy.get('.c-dropdown .dropdown-list')
      .find('.list-item.selected')
      .should('have.text', preselectedItem.key)
  })

  it('should emit select event', () => {
    const firstItem = dropdownItems[0]
    mountCyComponent(CDropdown, {
      props: {
        items: dropdownItems,
        modelValue: true,
      },
      slots: {
        default: 'animal',
      },
    })

    cy.get('.c-dropdown .dropdown-list')
      .find('.list-item')
      .eq(0)
      .trigger('click')

    cy.vue().then((wrapper: any) => {
      expect(wrapper.emitted().select)
      const selectedItem = wrapper.emitted().select[0]
      expect(selectedItem[0].value).to.eq(firstItem.value)
      expect(selectedItem[0].key).to.eq(firstItem.key)
    })
  })
})
