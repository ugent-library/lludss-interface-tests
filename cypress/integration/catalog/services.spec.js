describe('The catalog services', function() {
    describe('Requesting an item', function() {
        it('should redirect to the login page for unauthenticated users', function() {
            cy.visit('/catalog/rug01:002243161');

            cy.contains('.btn', 'Request').click();

            cy.location('href')
                .should('end.with', '/user/signin');

            cy.contains('You need to sign in or sign up before continuing.')
                .should('be.visible');
        });

        it('should be able to request as different items', function() {
            cy.server();
            cy.route('/status/*').as('ajax');

            cy.visit('/catalog/rug01:000763774');

            cy.wait('@ajax');

            cy.get('.libservice__status.libservice__status--success:contains("Available in the library, for consultation only")')
                .as('status')
                .its('length')
                .should('be.greaterThan', 5);

            cy.get('@status')
                .closest('div')
                .find('.btn:contains("Request")').as('request')
                .its('length')
                .should('be.greaterThan', 5);

            cy.get('@request')
                .map('href')
                .should(function(urls) {
                    urls.forEach(function(url) {
                        expect(url).to.match(/\/catalog\/rug01:000763774\/items\/\d+\/requests\/new$/);
                    });

                    expect(urls.length).to.eq(Cypress._.uniq(urls).length);
                });
        });
    });

    describe('Requesting a scanned article', function() {
        it('should redirect to the login page for unauthenticated users', function() {
            cy.visit('/catalog/ser01:000047796');

            cy.contains('.btn', 'Request scanned article').click();

            cy.location('href')
                .should('end.with', '/user/signin');

            cy.contains('You need to sign in or sign up before continuing.')
                .should('be.visible');
        });
    });

    describe('Requesting an article consultation', function() {
        it('should redirect to the login page for unauthenticated users', function() {
            cy.visit('/catalog/ser01:000047796');

            cy.contains('.btn', 'Request for consultation').click();

            cy.location('href')
                .should('end.with', '/user/signin');

            cy.contains('You need to sign in or sign up before continuing.')
                .should('be.visible');
        });
    });
});
