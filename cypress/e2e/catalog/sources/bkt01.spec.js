describe("Data source bkt01", () => {
  it("should have fewer than 35K hits", () => {
    cy.visit("/catalog/source:bkt01");

    cy.getCount().should("be.lessThan", 35000);
  });
});
