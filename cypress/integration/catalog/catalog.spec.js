describe('The search catalog', function() {
    it('should display the total number of results', function() {
        cy.visit('/catalog');

        cy.get('.search-result-count')
            .invoke('prop', 'innerText')
            .should('match', /^1 - 20 of [0-9,]+ Search Results$/);
    });

    ['type', 'lang'].forEach(function(lang) {
        it(`should not have any records without a ${lang} facet`, function() {
            cy.visit('/catalog');

            cy.get('#q').type(`{{}!lucene}*:* AND NOT ${lang}:[* TO *]`);
            cy.get('#search').click();

            cy.contains('No entries found').should('be.visible');
            cy.contains('No results for your search').should('be.visible');
            cy.contains('Try modifying your search...').should('be.visible');
        });
    });
});
