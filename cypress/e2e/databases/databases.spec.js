describe('The databases page', () => {
  beforeEach(() => {
    cy.visit('/databases')
  })

  it('should contain a link to WOS', () => {
    cy.get('.link-external')
      .contains('Web of Science')
      .should('exist')
      .should('be.visible')
      .prop('href')
      .should('contain', 'webofknowledge.com/WOS')
  })

  it('should link to google scholar', () => {
    cy.get('.link-external')
      .contains('Google Scholar')
      .should('be.visible')
      .prop('href')
      .should('contain', 'scholar.google.com')
  })
})
