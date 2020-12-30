import { languages } from '../../support/constants'

describe('The autocomplete function', function () {
  languages.forEach(function (lang) {
    describe(`in ${lang} language`, function () {
      const doTests = () => {
        it('should produce suggestions upon typing', function () {
          cy.server()
          cy.route('/autocomplete/**').as('ac-ajax')

          cy.get('.tt-menu').as('menu').should('not.be.visible')

          cy.get('#q').as('ac').type('e')

          cy.get('@menu').should('not.be.visible')

          cy.get('@ac').type('i')

          cy.wait('@ac-ajax').param('query').should('eq', 'ei')

          cy.get('@menu')
            .should('be.visible')
            .should('have.descendants', '.tt-dataset-enter > .tt-scope')
            .should('have.descendants', '.tt-dataset-author > .tt-scope')
            .should('have.descendants', '.tt-dataset-subject > .tt-scope')
        })

        it('should be able to search for the typed text', function () {
          cy.get('#q').type('ein')

          cy.get('.tt-menu .tt-dataset-enter .tt-suggestion').click()

          cy.param('q').should('eq', 'ein')
          cy.param('search_field').should('be.null')
          cy.param('ac').should('be.null')
        })

        it('should be able to click an author suggestion', function () {
          cy.get('#q').type('ein')

          cy.get('.tt-menu .tt-dataset-author .tt-suggestion:eq(3)').click()

          cy.param('search_field').should('eq', 'author')
          cy.param('ac')
            .should('start.with', 'viaf:')
            .should('end.with', ':author')
        })

        it('should be able to click a subject suggestion', function () {
          cy.get('#q').type('ein')

          cy.get('.tt-menu .tt-dataset-subject .tt-suggestion:eq(1)').click()

          cy.param('search_field').should('eq', 'author_subject')
          cy.param('ac')
            .should('start.with', 'viaf:')
            .should('end.with', ':subject')
        })
      }

      describe('from the home page', function () {
        beforeEach(() => cy.visit(`/${lang}/`))

        doTests()
      })

      describe('from the catalog page', function () {
        beforeEach(() => cy.visit(`/${lang}/catalog?q=`))

        doTests()
      })
    })
  })
})
