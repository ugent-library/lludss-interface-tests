describe('Data source ser01', function() {
  it('should have more than 45K hits', function() {
    cy.visit('/catalog/source:ser01')

    cy.get('.search-result-count > strong:eq(2)')
      .getCount()
      .should('be.greaterThan', 45000)
  })
})
