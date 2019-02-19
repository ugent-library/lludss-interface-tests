describe('The 404 page', function() {
  it('should return a 404 HTTP status code for non existent pages', function() {
    cy.request({
      url: '/non-existing-page',
      failOnStatusCode: false
    })
      .its('status')
      .should('eq', 404)
  })

  it('should return a 404 HTTP status code for deleted records', function() {
    cy.request({
      url: '/catalog/rug01:001223181',
      failOnStatusCode: false
    })
      .its('status')
      .should('eq', 404)

    cy.request({
      url: '/catalog/rug01:001223181.json',
      failOnStatusCode: false
    })
      .its('status')
      .should('eq', 404)
  })
})
