describe("Data source ser01", () => {
  it("should have more than 45K hits", () => {
    cy.visit("/catalog/source:ser01");

    cy.getCount().should("be.greaterThan", 40_000);
  });
});
