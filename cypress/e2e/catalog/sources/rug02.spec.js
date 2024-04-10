describe("Data source rug02", () => {
  it("should have less than 500K hits", () => {
    cy.visit("/catalog/source:rug02");

    cy.getCount().should("be.lessThan", 500000);
  });
});
