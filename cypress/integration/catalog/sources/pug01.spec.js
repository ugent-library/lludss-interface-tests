describe('Data source pug01', function() {
    it('should have more than 230K hits', function() {
        cy.visit('/catalog/source:pug01');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseResultCount(results);

                expect(results).to.be.greaterThan(230000);
            });
    });
    xit('should have as almost many hits as biblio', function() {
        cy.visit('/catalog/source:pug01');

        cy.get('.search-result-count > strong:eq(2)')
            .invoke('prop', 'innerText')
            .should(function(results) {
                results = parseResultCount(results);

// biblio wordt 's nachts gesynced met lib, dus er kan wel wat verschil zijn
                expect(results).to.be.fewerThan(240607);
            });
    });

});
