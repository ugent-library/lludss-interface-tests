describe('The breadcrumbs', function () {
  it('should display the default catalog breadcrumb without a search query', function () {
    cy.visit('/catalog')

    cy.get('.breadcrumb li')
      .as('bc')
      .should('have.length', 2)
      .eq(0)
      .find('a')
      .should('exist')
      .should('have.text', 'Home')

    cy.get('@bc')
      .eq(1)
      .should('have.text', 'Catalog')
      .find('a')
      .should('not.exist')
  })

  it('should display the search query', function () {
    cy.visit('/catalog?q=einstein')

    cy.get('.breadcrumb li')
      .as('bc')
      .should('have.length', 2)
      .eq(0)
      .find('a')
      .should('exist')
      .should('have.text', 'Home')

    cy.get('@bc')
      .eq(1)
      .should('have.text', 'Search: einstein')
      .find('a')
      .should('not.exist')
  })

  it('should be able to go back to the search from a detail page', function () {
    cy.visit('/catalog?q=einstein')

    cy.get('.search-result')
      .random()
      .find('.search-result__title a')
      .click({ force: true })

    cy.get('.breadcrumb li')
      .as('bc')
      .should('have.length', 3)
      .eq(0)
      .find('a')
      .should('exist')
      .should('have.text', 'Home')

    cy.get('@bc')
      .eq(2)
      .find('a')
      .should('not.exist')

    cy.get('@bc')
      .eq(1)
      .find('a')
      .should('exist')
      .should('have.text', 'Search Results')
      .click()

    cy.location('href').should('contain', '/catalog?q=einstein')
  })

  it('should display the autocomplete search filter when searching by author', function () {
    cy.visit('/catalog?q="Einar%20Ingvald%20Haugen"&search_field=author&ac=viaf:108571359:author')

    cy.get('.breadcrumb li')
      .as('bc')
      .should('have.length', 3)
      .eq(0)
      .find('a')
      .should('exist')
      .should('have.text', 'Home')

    cy.get('@bc')
      .eq(2)
      .should('have.text', 'Filter: Author')
      .find('a')
      .should('not.exist')

    cy.get('@bc')
      .eq(1)
      .find('a')
      .should('exist')
      .should('have.text', 'Search: "Einar Ingvald Haugen"')
      .click()

    cy.param('q').should('eq', '"Einar Ingvald Haugen"')
    cy.param('search_field').should('be.null')
    cy.param('ac').should('be.null')
  })

  it('should display the autocomplete search filter when searching by subject', function () {
    cy.visit('/catalog?q="Carl%20Einstein"&search_field=author_subject&ac=viaf:34473997:subject')

    cy.get('.breadcrumb li')
      .as('bc')
      .should('have.length', 3)
      .eq(0)
      .find('a')
      .should('exist')
      .should('have.text', 'Home')

    cy.get('@bc')
      .eq(2)
      .should('have.text', 'Filter: Subject')
      .find('a')
      .should('not.exist')

    cy.get('@bc')
      .eq(1)
      .find('a')
      .should('exist')
      .should('have.text', 'Search: "Carl Einstein"')
      .click()

    cy.param('q').should('eq', '"Carl Einstein"')
    cy.param('search_field').should('be.null')
    cy.param('ac').should('be.null')
  })
})
