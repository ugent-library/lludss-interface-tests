import { requiredFacetTypes } from '../../support/constants'

describe('The search catalog', () => {
  beforeEach(() => {
    cy.visit('/catalog')
  })

  it('should display the total number of results', () => {
    cy.get('.search-result-count')
      .prop('innerText')
      .should('match', /^1 - 20 of [0-9,]+ Search Results$/)
  })

  Object.keys(requiredFacetTypes).forEach(lang => {
    it(`should not have any records without a ${lang} facet`, () => {
      cy.get('#q').type(`{{}!lucene}*:* AND NOT ${lang}:[* TO *]`)
      cy.get('#search').click()

      cy.contains('No entries found').should('be.visible')
      cy.contains('No results for your search').should('be.visible')
      cy.contains('Try modifying your search...').should('be.visible')
    })
  })

  it('should be able to interchange type facets', () => {
    let counter = 0

    let add = amount => {
      counter += amount
    }

    let subtract = amount => {
      counter -= amount
    }

    let clickFacet = (name, method, activeFacets) => {
      cy.contains('.checkbox', name).as(name).find('.facet-count').getCount().then(method)

      cy.get('@' + name)
        .find('label')
        .click()

      cy.param('type').split('-').should('have.all.members', activeFacets)

      cy.getCount().should(count => {
        expect(count).to.eq(counter)
      })
    }

    clickFacet('book', add, ['book'])

    clickFacet('chapter', add, ['book', 'chapter'])

    clickFacet('article', add, ['article', 'book', 'chapter'])

    clickFacet('book', subtract, ['article', 'chapter'])

    clickFacet('newspaper', add, ['article', 'chapter', 'newspaper'])

    clickFacet('article', subtract, ['chapter', 'newspaper'])
  })

  describe('The language facet', () => {
    it('should have facet values ordered by name ascending', () => {
      cy.contains('.filters .form-group', 'Language')
        .find('.checkbox label .label')
        .map('innerText')
        .should('be.ascending')
    })
  })
})
