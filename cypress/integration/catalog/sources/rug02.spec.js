describe('Data source rug02', function () {
  // rug02 data should be decreasing. Test probably can be removed or improved.
  it.skip('should have more than 500K hits', function () {
    cy.visit('/catalog/source:rug02')

    cy.getCount().should('be.greaterThan', 500000)
  })
})
