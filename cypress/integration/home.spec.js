describe('The home page', function () {
  it('should redirect HTTP protocol requests to HTTPS', function () {
    let baseUrl = Cypress.config('baseUrl').replace('https://', 'http://')

    cy.request({
      url: baseUrl,
      followRedirect: false
    }).then(resp => {
      expect(resp.status).to.eq(302)
      expect(resp.redirectedToUrl).to.match(/^https:\/\//)
    })

    cy.visit(baseUrl)

    cy.location('href').should('match', /^https:\/\//)
  })

  describe('The search form', function () {
    before(() => cy.visit('/'))

    it('should be displayed', function () {
      cy.get('form')
        .should('exist')
        .should('have.attr', 'method', 'get')
        .should('have.attr', 'action', '/en/catalog')
        .within(function ($form) {
          cy.get('label')
            .should('have.class', 'sr-only')
            .should('have.text', 'Search...')

          cy.get('input[name="q"]')
            .should('have.attr', 'autofocus', 'autofocus')
            .should('be.visible')

          cy.get('button[type=submit]')
            .should('be.visible')
            .prop('innerText')
            .should('contain', 'Search collections')
        })
    })

    it('should post to the catalog page', function () {
      cy.get('#q').type('Liber Floridus{enter}')

      cy.location('href').should('end.with', '/en/catalog?q=Liber+Floridus')
    })
  })
})
