describe('Data source dbs01', function() {
    it('should have more than 400 hits', function() {
        cy.visit('/catalog/source:dbs01');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseResultCount(results);

                expect(results).to.be.greaterThan(400);
            });
    });
});
