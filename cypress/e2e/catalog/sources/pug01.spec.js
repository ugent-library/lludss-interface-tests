describe('Data source pug01', function () {
  it('should have more than 230K hits', function () {
    cy.visit('/catalog/source:pug01')

    cy.getCount().should('be.greaterThan', 230000)
  })

  it('should have almost as many hits as biblio', function () {
    cy.request('https://biblio.ugent.be/publication?limit=0&format=json').then(response => {
      const biblioTotal = response.body.total
      cy.log(`Biblio has ${biblioTotal} hits`)

      cy.visit('/catalog/source:pug01')

      // biblio wordt 's nachts gesynced met lib, dus er kan wel wat verschil zijn
      cy.getCount()
        .should('be.greaterThan', 200000)
        .should('be.within', biblioTotal - 15000, biblioTotal)
    })
  })
})
