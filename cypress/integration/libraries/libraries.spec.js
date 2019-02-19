describe('The libraries page', function() {
  ;['en', 'nl'].forEach(function(lang) {
    describe(`In ${lang} mode`, function() {
      it(`should contain a list of libraries`, function() {
        cy.visit(`/${lang}/libraries`)

        let widgetsBaseUrl = Cypress.env('widgetsBaseUrl')
        cy.request(`${widgetsBaseUrl}/library_groups/main.json`).then(function(response) {
          cy.get('.library-overview__item')
            .should('have.length', response.body.libraries_total)
            .each(function($item, index) {
              let library = response.body.libraries[index]

              cy.wrap($item)
                .find('.library-overview__title')
                .should('have.text', library[`name_${lang}`])

              cy.wrap($item)
                .find('.library-overview__cta a.btn')
                .should('have.attr', 'href')
                .should('match', new RegExp(`/${lang}/libraries/${library['code']}$`))
            })
        })
      })
    })
  })
})
