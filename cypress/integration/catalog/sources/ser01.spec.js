describe('Data source ser01', function() {
    it('should have more than 45K hits', function() {
        cy.visit('/catalog/source:ser01');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseResultCount(results);

                expect(results).to.be.greaterThan(45000);
            });
    });
});
