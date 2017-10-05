import {validate, parse} from 'fast-xml-parser';

describe('The OAI API', function() {
    let verbs = {
        GetRecord: 'identifier=rug01:001365117&metadataPrefix=oai_dc',
        Identify: null,
        ListIdentifiers: 'metadataPrefix=oai_dc',
        ListMetadataFormats: null,
        ListRecords: 'metadataPrefix=oai_dc',
        ListSets: null,
    };

    Object.keys(verbs).forEach(function(verb) {
        it(`should be able the handle the ${verb} verb`, function() {
            let url = `/OAI?verb=${verb}`;

            if (verbs[verb]) {
                url += '&' + verbs[verb];
            }

            cy.request(url)
                .its('body')
                .should(function(body) {
                    expect(validate(body)).to.be.true;

                    let oai = parse(body);
                    expect(oai['OAI-PMH']).to.not.have.property('error');
                });
        });
    });
});
