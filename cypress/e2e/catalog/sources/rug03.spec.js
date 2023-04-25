describe('Data source rug03', () => {
  it('should have more than 30K hits', () => {
    cy.visit('/catalog/source:rug03')

    cy.getCount().should('be.greaterThan', 30_000)
  })
})
