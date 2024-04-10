describe("The Open Data features", () => {
  it("should have 6 working hyperlinks in the developers section", () => {
    cy.visit("/catalog/rug01:000763774");

    cy.get("#developers dl dd a")
      .as("links")
      .should("exist")
      .should("not.be.visible")
      .should("have.length", 7);

    cy.contains("a", "For developers").click();

    cy.get("@links")
      .should("be.visible")
      .each(($a) => {
        cy.wrap($a).prop("href").then(cy.request);
      });
  });
});
