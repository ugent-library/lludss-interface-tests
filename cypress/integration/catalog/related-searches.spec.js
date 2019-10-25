describe('The related search suggestions', function () {
  it('should show author and subject suggestions in a general search', function () {
    cy.visit('/catalog?q=einstein')

    cy.get('.search-result:last a')
      .as('rel')
      .should('have.length', 2)
      .eq(0)
      .should('contain', '"einstein" as author')
      .prop('href')
      .should('have.param', 'q', '"einstein"')
      .should('have.param', 'search_field', 'author')

    cy.get('@rel')
      .eq(1)
      .should('contain', '"einstein" as subject')
      .prop('href')
      .should('have.param', 'q', '"einstein"')
      .should('have.param', 'search_field', 'author_subject')
  })

  it('should show general, author and subject suggestions in a card catalogue search', function () {
    cy.visit('/catalog/source:rug02-rug03?q=einstein')

    cy.get('.search-result:last a')
      .as('rel')
      .should('have.length', 3)
      .eq(0)
      .should('contain', '"einstein" in general')
      .prop('href')
      .should('have.param', 'q', '"einstein"')
      .should('not.have.param', 'search_field')

    cy.get('@rel')
      .eq(1)
      .should('contain', '"einstein" as author')
      .prop('href')
      .should('have.param', 'q', '"einstein"')
      .should('have.param', 'search_field', 'author')

    cy.get('@rel')
      .eq(2)
      .should('contain', '"einstein" as subject')
      .prop('href')
      .should('have.param', 'q', '"einstein"')
      .should('have.param', 'search_field', 'author_subject')
  })

  it('should show only subject suggestions in an author field search', function () {
    cy.visit('/catalog?q=einstein&search_field=author')

    cy.get('.search-result:last a')
      .should('exist')
      .should('contain', '"einstein" as subject')
      .click()

    cy.param('q').should('eq', '"einstein"')
    cy.param('search_field').should('eq', 'author_subject')
  })

  it('should show only author suggestions in a subject field search', function () {
    cy.visit('/catalog?q=einstein&search_field=author_subject')

    cy.get('.search-result:last a')
      .should('exist')
      .should('contain', '"einstein" as author')
      .click()

    cy.param('q').should('eq', '"einstein"')
    cy.param('search_field').should('eq', 'author')
  })

  it('should only show related search suggestions on the first results page', function () {
    cy.visit('/catalog?q=einstein')

    cy.get('.search-result:last')
      .as('rel')
      .contains('Related to your search query')
      .should('be.visible')

    cy.get('@rel')
      .find('a')
      .should('have.length', 2)

    cy.get('.pagination .active')
      .next()
      .find('a')
      .click()

    cy.param('page').should('eq', '2')
    cy.contains('Related to your search query').should('not.exist')
  })

  it('should only show related search suggestions on the first page of card catalogue results', function () {
    cy.visit('/catalog/source:rug02-rug03?q=einstein')

    cy.get('.search-result:last')
      .as('rel')
      .contains('Related to your search query')
      .should('be.visible')

    cy.get('@rel')
      .find('a')
      .should('have.length', 3)

    cy.get('.pagination .active')
      .next()
      .find('a')
      .click()

    cy.param('page').should('eq', '2')
    cy.contains('Related to your search query').should('not.exist')
  })

  it('should not show related search suggestions whitout a search query', function () {
    cy.visit('/catalog?q=')

    cy.contains('Related to your search query').should('not.exist')
  })

  it('should not show related search suggestions with a record id as search query', function () {
    cy.visit('/catalog?q=rug01:002243161')

    cy.contains('Related to your search query').should('not.exist')
  })

  it('should not show related search suggestions whitout any search results', function () {
    cy.visit('/catalog?q=sdofijsdmlfkqjsdflj')

    cy.contains('Related to your search query').should('not.exist')
  })
})
