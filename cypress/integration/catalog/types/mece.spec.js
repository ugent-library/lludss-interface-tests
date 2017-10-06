['Type', 'Language'].forEach(function(facet) {
    describe(`The MECE ${facet} facet`, function() {
        [
            '/catalog',
            '/catalog/source:rug01',
            '/catalog/source:pug01',
        ].forEach(function(path) {
            it('the sum of facet value counts should match total hits exactly', function() {
                cy.visit(path);

                cy.get('.search-result-count > strong:eq(2)')
                    .getCount()
                    .then(function(totalResults) {
                        let count = 0;

                        cy.get(`.filters .form-group h4:contains("${facet}")`)
                            .closest('.form-group')
                            .find('.checkbox label .mute .facet-count')
                            .each(function($count) {
                                cy.wrap($count)
                                    .getCount()
                                    .then(function(facetCount) {
                                        count += facetCount;
                                    });
                            })
                            .should(function() {
                                expect(count).to.eq(totalResults);
                            });
                    });
            });
        });
    });
});
