import { facetTypes } from '../../support/constants'

describe('The sort mechanism', () => {
  const sortTypes = ['new to old', 'old to new', 'by title']
  sortTypes.forEach(sort => {
    it(`should be able to sort ${sort}`, () => {
      cy.visit('/catalog')

      cy.contains('#sort-dropdown .dropdown-menu a', sort).as('sort').should('not.be.visible')

      cy.get('#sort-dropdown button a').as('sorted').click()

      cy.get('@sort').should('be.visible').click()

      let expectToBeSorted = () => {
        cy.get('@sorted').prop('innerText').should('eq', `Sort ${sort}`)
      }

      let goToRandomPage = () => {
        cy.getCount().then(count => {
          if (count > 20) {
            cy.get('ul.pagination > li:not(.disabled):not(.active) a')
              .map('href')
              .random()
              .then(url => {
                cy.wrap(url, { log: false })
                  .param('page', 1)
                  .then(p => cy.log(`Going to page ${p}`))

                cy.wrap(url, { log: false })
              })
              .then(cy.visit)
              .then(expectToBeSorted)
          } else {
            cy.log('Cannot switch to other page, not enough results')
          }
        })
      }

      expectToBeSorted()

      goToRandomPage()

      // Click the book type facet to make sure there will be enough matching results for the random tests
      cy.contains('.filters .checkbox label', 'book').click()

      // Click random a value in each facet and retest
      Object.values(facetTypes).forEach(facet => {
        cy.contains('.filters h4', facet)
          .closest('.form-group')
          .find('.checkbox .label')
          .map('innerText')
          .random()
          .then(value => {
            cy.log(`Clicking ${facet} facet ${value}`)

            cy.contains('.filters .checkbox label', value).closest('.checkbox').click()

            expectToBeSorted()

            goToRandomPage()
          })
      })
    })
  })
})
