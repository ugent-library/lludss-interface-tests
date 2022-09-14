describe('Data source ebk01', () => {
  it('should have more than 100K hits', () => {
    cy.visit('/catalog/source:ebk01')

    cy.getCount().should('be.greaterThan', 100000)
  })
})
