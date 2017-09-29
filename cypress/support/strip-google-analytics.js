Cypress.on('window:before:load', function(win) {
    let createElement = win.document.createElement;
    win.document.createElement = function(tag) {
        if (tag === 'script' && win.document.currentScript.innerHTML.includes('google-analytics.com')) {
            tag = 'custom_script';

            console.log('Removed Google analytics script');
        }
        return createElement.call(win.document, tag);
    }
});

it('should never load the google analytics script', function() {
    cy.visit('/');

    cy.get('script').each(function(script)  {
        cy.wrap(script)
            .invoke('prop', 'src')
            .should('not.contain', 'google-analytics.com');
    });

    cy.get('custom_script')
        .should('have.length', 1)
        .invoke('prop', 'src')
        .should('contain', 'google-analytics.com');
});