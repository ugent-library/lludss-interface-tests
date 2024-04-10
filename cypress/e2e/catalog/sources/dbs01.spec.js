describe("Data source dbs01", () => {
  it("should have more than 400 hits", () => {
    cy.visit("/catalog/source:dbs01");

    cy.getCount().should("be.greaterThan", 400);
  });
});
