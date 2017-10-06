describe('Data source ejn01', function() {
    it('should have more than 80K hits', function() {
        cy.visit('/catalog/source:ejn01');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseResultCount(results);

                expect(results).to.be.greaterThan(80000);
            });
    });
});
