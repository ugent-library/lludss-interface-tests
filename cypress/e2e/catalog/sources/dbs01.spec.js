describe('Data source dbs01', function() {
  it('should have more than 400 hits', function() {
    cy.visit('/catalog/source:dbs01')

    cy.getCount().should('be.greaterThan', 400)
  })
})
