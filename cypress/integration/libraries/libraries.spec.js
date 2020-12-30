import { languages } from '../../support/constants'

describe('The libraries page', () => {
  languages.forEach(lang => {
    describe(`In ${lang} mode`, () => {
      it(`should contain a list of libraries`, () => {
        cy.visit(`/${lang}/libraries`)

        let widgetsBaseUrl = Cypress.env('widgetsBaseUrl')
        cy.request(`${widgetsBaseUrl}/library_groups/main.json`).then(
          response => {
            cy.get('.library-overview__item')
              .should('have.length', response.body.libraries_total)
              .each(($item, index) => {
                let library = response.body.libraries[index]

                cy.wrap($item)
                  .find('.library-overview__title')
                  .should('have.text', library[`name_${lang}`])

                cy.wrap($item)
                  .find('.library-overview__cta a.btn')
                  .should('have.attr', 'href')
                  .should(
                    'match',
                    new RegExp(`/${lang}/libraries/${library['code']}$`)
                  )
              })
          }
        )
      })

      const selectedLibraries = ['BIB', 'LWBIB', 'RBIB', 'WEBIB', 'G00']
      selectedLibraries.forEach(lib => {
        it(`should be able to load the library detail page for ${lib}`, () => {
          cy.visit(`/${lang}/libraries/${lib}`)
        })
      })
    })
  })

  it('should have capitalized addresses', () => {
    cy.visit('/libraries')

    cy.get('#content')
      .should('contain', 'Gent')
      .should('contain', 'Sint-Hubertusstraat')
      .should('contain', 'Rozier')
      .should('contain', 'Universiteitstraat')
      .should('contain', 'Coupure Links')
      .should('contain', 'Krijgslaan')
      .should('contain', 'Korte Meer')
      .should('contain', 'Jozef Plateaustraat')
  })
})
