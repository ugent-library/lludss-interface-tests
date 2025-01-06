describe("Data source pug01", () => {
  it("should have more than 230K hits", () => {
    cy.visit("/catalog/source:pug01");

    cy.getCount().should("be.greaterThan", 230_000);
  });
});
