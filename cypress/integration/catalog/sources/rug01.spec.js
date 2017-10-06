describe('Data source rug01', function() {
    it('should have more than 1.9M hits', function() {
        cy.visit('/catalog/source:rug01');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseResultCount(results);

                expect(results).to.be.greaterThan(1900000);
            });
    });
});
