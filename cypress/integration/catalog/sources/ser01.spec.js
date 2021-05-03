describe('Data source ser01', function() {
  it('should have more than 45K hits', function() {
    cy.visit('/catalog/source:ser01')

    cy.getCount().should('be.greaterThan', 45000)
  })
})
