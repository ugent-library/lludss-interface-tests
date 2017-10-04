let gaScriptStripped = false;

Cypress.on('window:before:load', function(win) {
    let createElement = win.document.createElement;

    win.document.createElement = function(tag) {
        if (tag === 'script' && win.document.currentScript.innerHTML.includes('google-analytics.com')) {
            tag = 'custom_script';

            gaScriptStripped = true;

            console.log('Removed Google analytics script');
        }

        return createElement.call(win.document, tag);
    };
});

describe('The test runner', function() {
    it('should never load the google analytics script', function() {
        cy.visit('/');

        cy.get('script').each(function(script) {
            cy.wrap(script)
                .invoke('prop', 'src')
                .should('not.contain', 'google-analytics.com');
        });

        cy.get('custom_script')
            .should(function($cs) {
                if (gaScriptStripped) {
                    expect($cs).to.have.length(1);

                    expect($cs.prop('src')).to.contain('google-analytics.com');
                } else {
                    expect($cs).to.not.exist;
                }
            });
    });
});
