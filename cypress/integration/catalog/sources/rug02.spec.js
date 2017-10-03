describe('Data source rug02', function() {
    xit('should have more than 500K hits', function() {
        cy.request({
                url: 'http://lib.ugent.be/catalog/source:rug02',
                followRedirect: true,
            })
            .then((resp) => {
            });
    });

});