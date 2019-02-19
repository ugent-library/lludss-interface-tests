describe('Data source ejn01', function() {
  it('should have more than 80K hits', function() {
    cy.visit('/catalog/source:ejn01')

    cy.get('.search-result-count > strong:eq(2)')
      .getCount()
      .should('be.greaterThan', 80000)
  })
})
