describe("Data source pug01", () => {
  it("should have more than 230K hits", () => {
    cy.visit("/catalog/source:pug01");

    cy.getCount().should("be.greaterThan", 230000);
  });

  it("should have almost as many hits as Biblio", () => {
    cy.request({
      url: "https://biblio.ugent.be/publication",
      qs: {
        limit: 0,
        format: "json",
        // count every Biblio publication except dissertations (phd)
        // these are usually also in Aleph and those pug01 records would be merged with rug01 instead
        q: 'type any "book bookChapter bookEditor conference issueEditor journalArticle misc researchData"',
      },
    }).then((response) => {
      const biblioTotal = response.body.total;
      cy.log(`Biblio has ${biblioTotal} hits`);

      cy.visit("/catalog/source:pug01");

      // Biblio wordt 's nachts gesynced met lib, dus er kan wel wat verschil zijn
      cy.getCount()
        .should("be.greaterThan", 200000)
        .should("be.within", biblioTotal - 15000, biblioTotal);
    });
  });
});
