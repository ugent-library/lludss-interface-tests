describe('The catalog services', function() {
    describe('Requesting an item', function() {
        it('should redirect to the login page for unauthenticated users', function() {
            cy.visit('/catalog/rug01:002243161');

            cy.get('.btn').contains('Request').click();

            cy.location('href')
                .should('end.with', '/user/signin');

            cy.contains('You need to sign in or sign up before continuing.')
                .should('be.visible');
        });
    });

    describe('Requesting a scanned article', function() {
        it('should redirect to the login page for unauthenticated users', function() {
            cy.visit('/catalog/ser01:000047796');

            cy.get('.btn').contains('Request scanned article').click();

            cy.location('href')
                .should('end.with', '/user/signin');

            cy.contains('You need to sign in or sign up before continuing.')
                .should('be.visible');
        });
    });

    describe('Requesting an article consultation', function() {
        it('should redirect to the login page for unauthenticated users', function() {
            cy.visit('/catalog/ser01:000047796');

            cy.get('.btn').contains('Request for consultation').click();

            cy.location('href')
                .should('end.with', '/user/signin');

            cy.contains('You need to sign in or sign up before continuing.')
                .should('be.visible');
        });
    });
});
