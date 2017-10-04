describe('Type periodical', function() {
    it('should have more than 1OOK hits', function() {
        cy.visit('/catalog/type:periodical');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseInt(results.replace(/,/g, ''));

                expect(results).to.be.greaterThan(100000);
            });
    });
});
