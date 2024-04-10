describe("Type periodical", () => {
  it("should have more than 1OOK hits", () => {
    cy.visit("/catalog/type:periodical");

    cy.getCount().should("be.greaterThan", 100000);
  });
});
