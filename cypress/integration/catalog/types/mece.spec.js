let parseResultCount = function(results) {
    return parseInt(results.replace(/,/g, ''));
};

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
                    .invoke('prop', 'innerText')
                    .then(function(results) {
                        let totalResults = parseResultCount(results);
                        let count = 0;

                        cy.get(`.filters .form-group h4:contains("${facet}")`)
                            .closest('.form-group')
                            .find('.checkbox label .mute .facet-count')
                            .each(function($count) {
                                count += parseResultCount($count.prop('innerText'));
                            })
                            .should(function() {
                                expect(count).to.eq(totalResults);
                            });
                    });
            });
        });
    });
});
