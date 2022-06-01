describe('Type periodical', function() {
  it('should have more than 1OOK hits', function() {
    cy.visit('/catalog/type:periodical')

    cy.getCount().should('be.greaterThan', 100000)
  })
})
