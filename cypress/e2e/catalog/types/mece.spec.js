import { meceFacetTypes } from "../../../support/constants";

const paths = [
  "/catalog",
  "/catalog/source:rug01",
  "/catalog/source:pug01",
  "/catalog/source:rug02-rug03-rug04", // The card catalogue
  "/catalog/source:ejn01",
  "/catalog/source:ebk01",
];

paths.forEach((path) => {
  describe(`Catalog tests for path: ${path}`, () => {
    Object.values(meceFacetTypes).forEach((facet) => {
      describe(`The MECE ${facet} facet`, () => {
        it("the sum of facet value counts should match total hits exactly", () => {
          cy.visit(path);

          cy.getCount().then((totalResults) => {
            cy.contains(".filters .form-group", facet)
              .find(".checkbox label .mute .facet-count")
              .map((facetCount) =>
                parseInt(facetCount.innerText.replace(/,/g, "")),
              )
              .sum()
              .should((subject) => {
                expect(subject).to.eq(
                  totalResults,
                  `Detected ${(totalResults - subject).toFixed(
                    0,
                  )} items without ${facet.toLowerCase()}`,
                );
              });
          });
        });
      });
    });
  });
});

xit("dummy test for finding records without type", () => {
  cy.visit("/catalog");

  cy.contains(".filters .form-group", "Type")
    .find(".checkbox > label")
    .map("dataset")
    .map("submitUrl")
    .map((submitUrl) =>
      new URL(submitUrl, Cypress.config("baseUrl")).searchParams.get("type"),
    )
    .then((types) => {
      const solrUrl = new URL(
        "http://mistral.ugent.be:8983/solr/lludss/select",
      );
      solrUrl.searchParams.set("q", "is_deleted:false");

      for (let type of types) {
        solrUrl.searchParams.append("fq", `-type:${type}`);
      }

      return solrUrl.toString();
    })
    .then((solrUrl) => {
      cy.request(solrUrl).then((response) => {
        const ids = response.body.response.docs.map((d) => d["_id"]).join(", ");

        expect(ids).to.be.empty;
      });
    });
});
