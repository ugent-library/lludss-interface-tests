describe('Data source rug03', function() {
    it('should have more than 50K hits', function() {
        cy.visit('/catalog/source:rug03');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseResultCount(results);

                expect(results).to.be.greaterThan(50000);
            });
    });
});
