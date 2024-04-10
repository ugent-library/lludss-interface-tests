describe("Data source ejn01", () => {
  it("should have more than 80K hits", () => {
    cy.visit("/catalog/source:ejn01");

    cy.getCount().should("be.greaterThan", 80000);
  });
});
