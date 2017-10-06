[
    '/catalog',
    '/catalog/source:rug01',
    '/catalog/source:pug01',
].forEach(function(path) {
    describe(`Catalog tests for path: ${path}`, function() {
        before(function() {
            cy.visit(path);
        });

        ['Type', 'Language'].forEach(function(facet) {
            describe(`The MECE ${facet} facet`, function() {
                it('the sum of facet value counts should match total hits exactly', function() {
                    cy.get('.search-result-count > strong:eq(2)')
                        .getCount()
                        .then(function(totalResults) {
                            cy.contains('.filters .form-group', facet)
                                .find('.checkbox label .mute .facet-count')
                                .map(function(facetCount) {
                                    return parseInt(facetCount.innerText.replace(/,/g, ''));
                                })
                                .sum()
                                .should('eq', totalResults);
                        });
                });
            });
        });
    });
});
