describe('The scroll to top feature', function() {
    it('should scroll to the top when clicked', function() {
        cy.visit('/catalog');

        cy.window()
            .then(function(w) {
                cy.get('.js-backtotop').as('back-to-top')
                    .should('not.be.inViewport', w);

                cy.scrollTo(0, 200, {duration: 100});

                cy.get('@back-to-top').should('be.inViewport', w);

                cy.scrollTo(0, '25%', {duration: 100});

                cy.get('@back-to-top').should('be.inViewport', w);

                cy.scrollTo(0, '50%', {duration: 100});

                cy.get('@back-to-top').should('be.inViewport', w);

                cy.scrollTo(0, '75%', {duration: 100});

                cy.get('@back-to-top').should('be.inViewport', w);

                cy.scrollTo(0, '100%', {duration: 100});

                cy.get('@back-to-top').should('be.inViewport', w);

                // We need to scroll back to the top because after reloading, chrome would find the same position.
                cy.scrollTo(0, 0, {duration: 100});

                cy.reload();

                cy.get('@back-to-top').should('not.be.inViewport', w);
            });
    });
});
