describe('The info/about page', function() {
    ['en', 'nl'].forEach(function(lang) {
        it(`should contain a list of links to /${lang}/info`, function() {
            cy.visit(`/${lang}/info`);

            let widgetsBaseUrl = Cypress.env('widgetsBaseUrl');
            cy.request(`${widgetsBaseUrl}/list_messages/web_info_${lang}.json`)
                .then(function(response) {
                    cy.get('.section-title:eq(0) ~ ul > li > a').as('links')
                        .should('have.length', response.body.messages_total);

                    cy.get('@links')
                        .each(function($a, index) {
                            let message = response.body.messages[index];
                            let code = message.code.replace(`${lang}_`, '').replace(`_${lang}`, '');

                            cy.wrap($a)
                                .should('have.text', message.title)
                                .should('have.attr', 'href')
                                .should('match', new RegExp(`/${lang}/info/${code}`));
                        });
                });
        });
    });

    it('should link to research tips', function() {
        cy.visit('/info');

        cy.get('.section-title:eq(1) ~ ul > li > a')
            .should('be.visible')
            .each(function($a) {
                cy.request({
                    url: $a.prop('href'),
                    followRedirect: false,
                })
                    .then(function(resp) {
                        expect(resp.status).to.eq(302);
                        expect(resp.redirectedToUrl).to.contain('onderzoektips.ugent.be');
                    });
            });
    });
});

