import { mountCyComponent } from '../../helpers/vue-test-helper'
import CVerticalStepper from './CVerticalStepper.vue'

const steps = [
  {
    text: 'Informations de l\'entreprise',
    selected: true,
    id: 'Informations de l\'entreprise',
  }, {
    text: 'Contact',
    id: 'Contact',
    selected: false,
  }, {
    text: 'Informations bancaires',
    id: 'Informations bancaires',
    selected: false,
  }, {
    text: 'Livraison',
    id: 'Livraison',
    selected: false,
  }, {
    text: 'Identifiant du client',
    id: 'Identifiant du client',
    selected: false,
  }, {
    text: 'Bénéficiaires',
    id: 'Bénéficiaires',
    selected: false,
  },
]
describe('<CVerticalStepper />', () => {
  it('should render', () => {
    mountCyComponent(CVerticalStepper, {
      props: {
        steps,
      },
    })

    cy.get('.c-vertical-stepper')
      .should('be.visible')
      .children()
      .should('have.length', steps.length)
  })

  it('should have default selected index', () => {
    const selectedIndex = 3
    mountCyComponent(CVerticalStepper, {
      props: {
        steps,
        selectedIndex,
      },
    })

    cy.get('.step-item')
      .eq(selectedIndex)
      .should('have.class', 'selected')

    cy.get('.step-item')
      .eq(0)
      .click()

    cy.vue()
      .then((wrapper: any) => {
        expect(wrapper.emitted('select')).to.have.length(1)
      })
  })
})
