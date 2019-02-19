describe('Data source rug01', function() {
  it('should have more than 1.9M hits', function() {
    cy.visit('/catalog/source:rug01')

    cy.get('.search-result-count > strong:eq(2)')
      .getCount()
      .should('be.greaterThan', 1900000)
  })
})
