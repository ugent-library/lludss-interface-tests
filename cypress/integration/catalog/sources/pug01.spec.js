describe('Data source pug01', function() {
    it('should have more than 230K hits', function() {
        cy.visit('/catalog/source:pug01');

        cy.get('.search-result-count > strong:eq(2)')
            .getCount()
            .should('be.greaterThan', 230000);
    });

    it('should have as almost many hits as biblio', function() {
        cy.visit('/catalog/source:pug01');

        // biblio wordt 's nachts gesynced met lib, dus er kan wel wat verschil zijn
        cy.get('.search-result-count > strong:eq(2)')
            .getCount()
            .should('be.lessThan', 240607);
    });
});
