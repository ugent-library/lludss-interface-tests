describe('The home page', () => {
  it('should redirect HTTP protocol requests to HTTPS', () => {
    let baseUrl = Cypress.config('baseUrl').replace('https://', 'http://')

    cy.request({
      url: baseUrl,
      followRedirect: false,
    }).then(resp => {
      expect(resp.status).to.eq(301)
      expect(resp.redirectedToUrl).to.match(/^https:\/\//)
    })

    cy.visit(baseUrl)

    cy.location('href').should('match', /^https:\/\//)
  })

  describe('The search form', () => {
    before(() => cy.visit('/'))

    it('should be displayed', () => {
      cy.get('form')
        .should('exist')
        .should('have.attr', 'method', 'get')
        .should('have.attr', 'action', '/en/catalog')
        .within($form => {
          cy.get('label').should('have.class', 'sr-only').should('have.text', 'Search...')

          cy.get('input[name="q"]').should('have.attr', 'autofocus', 'autofocus').should('be.visible')

          cy.get('button[type=submit]').should('be.visible').prop('innerText').should('contain', 'Search collections')
        })
    })

    it('should post to the catalog page', () => {
      cy.get('#q').type('Liber Floridus{enter}')

      cy.location('href').should('end.with', '/en/catalog?q=Liber+Floridus')
    })
  })
})
