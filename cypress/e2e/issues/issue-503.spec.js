// https://github.ugent.be/ugent-library/lludss-interface/issues/503
describe('A fix for issue 503', () => {
  it('should not return a server error on the catalog page when the "q" query param is missing', () => {
    cy.request({ url: '/catalog', failOnStatusCode: false }).its('status').should('eq', 200)

    cy.visit('/catalog')

    cy.visit('/nl/catalog')

    cy.visit('/en/catalog')
  })
})
