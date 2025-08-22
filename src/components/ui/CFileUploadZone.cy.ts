import cypress from 'cypress'
import { mountCyComponent } from '../../helpers/vue-test-helper'
import i18nPlugin from '../../plugins/i18n.plugin'
import CFileUploadZone from './CFileUploadZone.vue'

describe('<CFileUploadZone />', () => {
  it('should render', () => {
    mountCyComponent(CFileUploadZone)

    cy.get('.c-file-upload-zone')
      .should('be.visible')
      .find('.c-icon.upload-icon')
      .should('be.visible')
  })

  it('should display filename after upload', () => {
    mountCyComponent(CFileUploadZone, {
      props: {
        showFilename: true,
      },
    })

    cy.get('input[name=fileUploadZoneInput]')
      .selectFile('tests/assets/accept.png', {
        force: true,
      })

    cy.get('.filename')
      .should('contain.text', 'accept.png')
  })

  it('should display error if wrong file format is upload', () => {
    mountCyComponent(CFileUploadZone)

    cy.get('input[name=fileUploadZoneInput]')
      .selectFile({
        contents: cypress.Buffer.from('file contents'),
        fileName: 'file.json',
      }, { force: true })

    cy.get('.c-alert.alert-error > p')
      .should('contain', i18nPlugin.global.t(
        'translate.common.errors.file_type_error',
        {
          types: 'pdf, jpeg, png, jpg',
        },
      ))
  })

  it('should display error if file is too big', () => {
    mountCyComponent(CFileUploadZone)

    // create a big file
    const moreThanTwoMb = 2097152 + 1
    const bigFile = Cypress.Buffer.alloc(moreThanTwoMb)
    bigFile.write('X', moreThanTwoMb)

    cy.get('input[name=fileUploadZoneInput]')
      .selectFile({
        contents: bigFile,
        fileName: 'file.pdf',
      }, { force: true })
  })

  it('should upload file on drag and drop', () => {
    mountCyComponent(CFileUploadZone, {
      props: {
        showFilename: true,
      },
    })

    const filename = 'file.pdf'
    cy.get('input[name=fileUploadZoneInput]')
      .selectFile({
        contents: Cypress.Buffer.from('file contents'),
        fileName: filename,
      }, {
        force: true,
        action: 'drag-drop',
      })

    cy.get('.filename')
      .should('contain.text', filename)
  })
})
