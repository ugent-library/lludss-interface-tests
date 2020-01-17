describe('Data source rug02', function() {
  it('should have more than 500K hits', function() {
    cy.visit('/catalog/source:rug02')

    cy.getCount().should('be.greaterThan', 500000)
  })
})
