describe('The catalog card search suggestions', function () {
  it('should show 3 matching suggestions in a general search', function () {
    cy.visit('/catalog?q=einstein')

    cy.get('.catalog-card-suggestions .row:eq(0)')
      .as('cards')
      .find('a')
      .should('have.length', 3)
      .each(a => {
        cy.wrap(a)
          .should('have.attr', 'rel', 'nofollow')
          .should('have.attr', 'href')
          .should('match', /\/catalog\/rug0[23]:\d{9}\?q=einstein$/)

        cy.wrap(a)
          .prop('title')
          .invoke('toLowerCase')
          .should('contain', 'einstein')
      })

    cy.get('@cards')
      .next()
      .find('a')
      .should('have.attr', 'rel', 'nofollow')
      .should('contain', 'einstein in the card catalogue')
      .should('have.attr', 'href')
      .should('match', /\/catalog\/source:rug02-rug03\?q=einstein$/)
  })

  it('should only show related search suggestions on the first results page', function () {
    cy.visit('/catalog?q=einstein')

    cy.contains('Found in the card catalogue').should('be.visible')

    cy.get('.pagination .active')
      .next()
      .find('a')
      .click()

    cy.param('page').should('eq', '2')
    cy.contains('Found in the card catalogue').should('not.exist')
  })

  it('should not show related search suggestions from the card catalogue page', function () {
    cy.visit('/catalog/source:rug02-rug03-rug04?q=einstein')

    cy.contains('Found in the card catalogue').should('not.exist')
  })

  it('should not show related search suggestions whitout a search query', function () {
    cy.visit('/catalog?q=')

    cy.contains('Found in the card catalogue').should('not.exist')
  })

  it('should not show related search suggestions with a record id as search query', function () {
    cy.visit('/catalog?q=rug01:002243161')

    cy.contains('Found in the card catalogue').should('not.exist')
  })

  it('should not show related search suggestions whitout any search results', function () {
    cy.visit('/catalog?q=sdofijsdmlfkqjsdflj')

    cy.contains('Found in the card catalogue').should('not.exist')
  })
})
