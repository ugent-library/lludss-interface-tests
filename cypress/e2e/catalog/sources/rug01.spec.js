describe('Data source rug01', () => {
  it('should have more than 1.9M hits', () => {
    cy.visit('/catalog/source:rug01')

    cy.getCount().should('be.greaterThan', 1900000)
  })
})
