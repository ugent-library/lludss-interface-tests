describe('Data source bkt01', function () {
  it('should have fewer than 35K hits', function () {
    cy.visit('/catalog/source:bkt01')

    cy.get('.search-result-count > strong:eq(2)')
      .getCount()
      .should('be.lessThan', 35000)
  })

  it('should have fewer than 50K hits', function () {
    cy.visit('/catalog/source:bkt01')

    cy.get('.search-result-count > strong:eq(2)')
      .getCount()
      .should('be.lessThan', 50000)
  })
})
