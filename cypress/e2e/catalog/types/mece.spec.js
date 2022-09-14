import { meceFacetTypes } from '../../../support/constants'

const paths = [
  '/catalog',
  '/catalog/source:rug01',
  '/catalog/source:pug01',
  '/catalog/source:rug02-rug03-rug04', // The card catalogue
  '/catalog/source:ejn01',
  '/catalog/source:ebk01',
]

paths.forEach(path => {
  describe(`Catalog tests for path: ${path}`, () => {
    before(() => {
      cy.visit(path)
    })

    Object.values(meceFacetTypes).forEach(facet => {
      describe(`The MECE ${facet} facet`, () => {
        it('the sum of facet value counts should match total hits exactly', () => {
          cy.getCount().then(totalResults => {
            cy.contains('.filters .form-group', facet)
              .find('.checkbox label .mute .facet-count')
              .map(facetCount => parseInt(facetCount.innerText.replace(/,/g, '')))
              .sum()
              .should(subject => {
                expect(subject).to.eq(
                  totalResults,
                  `Detected ${(totalResults - subject).toFixed(0)} items without ${facet.toLowerCase()}`
                )
              })
          })
        })
      })
    })
  })
})
