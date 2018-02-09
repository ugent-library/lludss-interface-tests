describe('The Open Data features', function() {
    it('should have 6 working hyperlinks in the developers section', function() {
        cy.server();
        cy.route('/status/**', {}).as('ajax');

        let baseUrl = Cypress.config('baseUrl');

        cy.visit('/catalog/rug01:000763774');

        cy.wait('@ajax');

        cy.get('#developers dl dd a').as('links')
            .should('exist')
            .should('not.be.visible')
            .should('have.length', 6);

        cy.contains('a', 'For developers').click();

        cy.get('@links')
            .should('be.visible')
            .each(function($a) {
                cy.wrap($a)
                    .prop('href')
                    .should('match', new RegExp(`^${baseUrl}/catalog/rug01:000763774(\.json|\.dc_xml|\.oai_dc_xml|\.marcxml|\.marc)?$`))
                    .then(function(url) {
                        cy.request(url);
                    });
            });
    });
});
