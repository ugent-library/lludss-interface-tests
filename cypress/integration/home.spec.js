describe('The home page', function() {
    it('should redirect HTTP protocol requests to HTTPS', function() {
        cy.request({
                url: 'http://lib.ugent.be',
                followRedirect: false,
            })
            .then((resp) => {
                expect(resp.status).to.eq(302);
                expect(resp.redirectedToUrl).to.eq('https://lib.ugent.be/');
            });
    });

    describe('The search form', function() {
        it('should be displayed', function() {
            cy.visit('/');

            cy.get('form')
                .should('exist')
                .should('have.attr', 'method', 'get')
                .should('have.attr', 'action', '/en/catalog')
                .within(function($form) {
                    cy.get('label')
                        .should('have.class', 'sr-only')
                        .should('have.text', 'Search...')

                    cy.get('input[name="q"]')
                        .should('have.attr', 'autofocus', 'autofocus')
                        .should('be.visible');

                    cy.get('button[type=submit]')
                        .should('be.visible')
                        .invoke('prop', 'innerText')
                        .should('contain', 'Search collections');
                });
        });

        it('should post to the catalog page', function() {
            cy.visit('/');

            cy.get('#q').type('Liber Floridus{enter}');

            cy.location()
                .its('href')
                .should('end.with', '/en/catalog?q=Liber+Floridus');
        });
    });
});