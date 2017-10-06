describe('Data source rug02', function() {
    it('should have more than 500K hits', function() {
        cy.visit('/catalog/source:rug02');

        cy.get('.search-result-count > strong:eq(2)')
            .getCount()
            .should('be.greaterThan', 500000);
    });
});
