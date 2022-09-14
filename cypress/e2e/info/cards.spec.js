import { languages } from '../../support/constants'

describe('The digitized card catalogue', () => {
  languages.forEach(lang => {
    describe(`In ${lang} language`, () => {
      it('should load the catalog search form', () => {
        cy.visit(`/${lang}/info/cards`)

        cy.get('form:not(.navbar-form)')
          .should('exist')
          .should('have.attr', 'action')
          .should('contain', '/catalog/source:rug02-rug03-rug04')
      })

      it('should be able to search for cards', () => {
        cy.get('form:not(.navbar-form)').find('input[name=q]').type('test{enter}')

        cy.location('pathname').should('end.with', '/catalog/source:rug02-rug03-rug04')

        cy.param('q').should('eq', 'test')
      })

      it('should be able to load a card detail page', () => {
        cy.get('#documents .meta-title a').random().click({ force: true })

        cy.location('pathname').should('match', /\/catalog\/rug0[234]:\d{9}$/)

        cy.param('q').should('eq', 'test')

        cy.param('source').should('eq', 'rug02-rug03-rug04')
      })

      it('should be able to request a card', () => {
        cy.go('back')

        cy.get('#documents a.btn-primary')
          .random()
          .as('request-button')
          .should('have.attr', 'href')
          .should('match', /\/catalog\/rug0[234]:\d{9}\/requests\/new$/)

        cy.get('@request-button').click()

        cy.location('href').should('end.with', '/user/signin')
      })
    })
  })
})
