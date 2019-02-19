describe('Type periodical', function() {
  it('should have more than 1OOK hits', function() {
    cy.visit('/catalog/type:periodical')

    cy.get('.search-result-count > strong:eq(2)')
      .getCount()
      .should('be.greaterThan', 100000)
  })
})
