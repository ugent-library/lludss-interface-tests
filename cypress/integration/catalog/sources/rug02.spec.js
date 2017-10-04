describe('Data source rug02', function() {
    it('should have more than 500K hits', function() {
        cy.visit('/catalog/source:rug02');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseInt(results.replace(/,/g, ''));

                expect(results).to.be.greaterThan(500000);
            });
    });
});
