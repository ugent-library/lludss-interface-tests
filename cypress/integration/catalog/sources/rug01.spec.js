describe('Data source rug01', function() {
    xit('should have more than 1.9M hits', function() {
        cy.request({
                url: 'http://lib.ugent.be/catalog/source:rug01',
                followRedirect: true,
            })
            .then((resp) => {
            });
    });

});