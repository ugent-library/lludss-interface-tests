describe('Type periodical', function() {
    xit('should have more than 1OOK hits', function() {
        cy.request({
                url: 'http://lib.ugent.be/catalog/type:periodical',
                followRedirect: true,
            })
            .then((resp) => {
            });
    });

});