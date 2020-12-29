const paths = [
  '/catalog?q=',
  '/catalog/source:rug01',
  '/catalog/source:pug01',
  '/catalog/source:rug02-rug03-rug04', // The card catalogue
]

paths.forEach(function (path) {
  describe(`Catalog tests for path: ${path}`, function () {
    before(function () {
      cy.visit(path)
    })
    ;['Type', 'Language'].forEach(function (facet) {
      describe(`The MECE ${facet} facet`, function () {
        it('the sum of facet value counts should match total hits exactly', function () {
          cy.getCount().then(function (totalResults) {
            cy.contains('.filters .form-group', facet)
              .find('.checkbox label .mute .facet-count')
              .map(function (facetCount) {
                return parseInt(facetCount.innerText.replace(/,/g, ''))
              })
              .sum()
              .should('eq', totalResults)
          })
        })
      })
    })
  })
})
