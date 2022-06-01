describe('Data source rug03', function() {
  it('should have more than 50K hits', function() {
    cy.visit('/catalog/source:rug03')

    cy.getCount().should('be.greaterThan', 50000)
  })
})
