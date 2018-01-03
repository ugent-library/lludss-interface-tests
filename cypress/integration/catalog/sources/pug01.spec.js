describe('Data source pug01', function() {
    it('should have more than 230K hits', function() {
        cy.visit('/catalog/source:pug01');

        cy.get('.search-result-count > strong:eq(2)')
            .getCount()
            .should('be.greaterThan', 230000);
    });

    it('should have almost as many hits as biblio', function() {
        cy.request('https://biblio.ugent.be/publication?limit=0&format=json')
            .then((response) => {
                const biblioTotal = response.body.total;

                cy.visit('/catalog/source:pug01');

                // biblio wordt 's nachts gesynced met lib, dus er kan wel wat verschil zijn
                cy.get('.search-result-count > strong:eq(2)')
                    .getCount()
                    .should('be.within', biblioTotal - 5000, biblioTotal + 5000);
            });
    });
});
