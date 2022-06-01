describe('Data source rug02', function () {
  it('should have less than 500K hits', function () {
    cy.visit('/catalog/source:rug02')

    cy.getCount().should('be.lessThan', 500000)
  })
})
