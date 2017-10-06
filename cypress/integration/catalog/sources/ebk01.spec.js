describe('Data source ebk01', function() {
    it('should have more than 100K hits', function() {
        cy.visit('/catalog/source:ebk01');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseResultCount(results);

                expect(results).to.be.greaterThan(100000);
            });
    });
});
