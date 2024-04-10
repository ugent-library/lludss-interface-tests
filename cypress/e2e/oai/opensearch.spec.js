import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
});

describe("The opensearch API", () => {
  it("should produce OpenSearch description", () => {
    cy.request("/catalog/opensearch.xml")
      .then((response) => parser.parse(response.body).OpenSearchDescription)
      .should((openSearch) => {
        expect(openSearch).to.have.property(
          "ShortName",
          "Ghent University Library",
        );
        expect(openSearch).to.have.property(
          "Description",
          "Ghent University Library Search",
        );
        expect(openSearch).to.have.property("Url").and.to.have.length(3);

        let types = Cypress._.map(openSearch.Url, "@type");
        expect(types)
          .to.contain("text/html")
          .and.to.contain("application/rss+xml")
          .and.to.contain("application/x-suggestions+json");
      });
  });

  describe("The RSS API", () => {
    it("should produce search results", () => {
      cy.request("/catalog.rss?q=troisieme%20Belvedere")
        .then((response) => parser.parse(response.body).rss)
        .should((rss) => {
          expect(rss)
            .to.have.property("channel")
            .and.to.have.property(
              "title",
              "Ghent University Library Search Results",
            );

          expect(rss.channel.item).to.have.property(
            "title",
            "Troisième belvédère",
          );
          expect(rss.channel.item)
            .to.have.property("link")
            .and.to.end.with("/catalog/rug01:000489124");
        });

      cy.request("/catalog.rss?q=liber+floridus")
        .then((response) => parser.parse(response.body).rss)
        .should((rss) => {
          expect(rss.channel.item).to.be.an("array").that.has.length(20);

          let titles = Cypress._.map(rss.channel.item, "title");
          expect(
            titles.filter(
              (i) => i.toLowerCase().indexOf("liber floridus") >= 0,
            ),
          ).to.not.be.empty;
        });
    });
  });

  describe("The suggestions API", () => {
    it("should produce suggestions", () => {
      cy.request("/catalog/opensearch.json?q=belvedere+troisieme")
        .its("body")
        .should((body) => {
          expect(body).to.be.an("array").and.to.have.length(2);

          expect(body[0]).to.eq("belvedere troisieme");
          expect(body[1]).to.be.an("array").and.to.have.length(1);
          expect(body[1][0]).to.eq("Troisième belvédère");
        });

      cy.request("/catalog/opensearch.json?q=RTBF")
        .its("body")
        .should((body) => {
          expect(body).to.be.an("array").and.to.have.length(2);

          expect(body[0]).to.eq("RTBF");
          expect(body[1]).to.be.an("array").and.to.have.length(10);

          expect(body[1].filter((i) => i.toLowerCase().indexOf("rtbf") >= 0)).to
            .not.be.empty;
        });
    });
  });
});
