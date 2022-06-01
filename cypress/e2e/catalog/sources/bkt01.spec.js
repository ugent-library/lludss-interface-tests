describe('Data source bkt01', function() {
  it('should have fewer than 35K hits', function() {
    cy.visit('/catalog/source:bkt01')

    cy.getCount().should('be.lessThan', 35000)
  })
})
