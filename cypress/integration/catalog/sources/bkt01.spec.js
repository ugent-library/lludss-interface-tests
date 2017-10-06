describe('Data source bkt01', function() {
    it('should have more than 40K hits', function() {
        cy.visit('/catalog/source:bkt01');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseResultCount(results);

                expect(results).to.be.greaterThan(40000);
            });
    });
    xit('should have fewer than 50K hits', function() {
        cy.visit('/catalog/source:bkt01');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseResultCount(results);

                expect(results).to.be.fewerThan(50000);
            });
    });

});
