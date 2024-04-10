import { XMLValidator, XMLParser } from "fast-xml-parser";

describe("The OAI API", () => {
  let verbs = {
    GetRecord: "identifier=rug01:001365117&metadataPrefix=oai_dc",
    Identify: null,
    ListIdentifiers: "metadataPrefix=oai_dc",
    ListMetadataFormats: null,
    ListRecords: "metadataPrefix=oai_dc",
    ListSets: null,
  };

  const parser = new XMLParser();

  Object.keys(verbs).forEach((verb) => {
    it(`should be able the handle the ${verb} verb`, () => {
      let url = `/OAI?verb=${verb}`;

      if (verbs[verb]) {
        url += "&" + verbs[verb];
      }

      cy.request(url)
        .its("body")
        .should((body) => {
          expect(XMLValidator.validate(body)).to.be.true;

          let oai = parser.parse(body);
          expect(oai["OAI-PMH"]).to.not.have.property("error");
        });
    });
  });
});
