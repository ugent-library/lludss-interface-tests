describe("The databases page", () => {
  beforeEach(() => {
    cy.visit("/databases");
  });

  it("should contain a link to WOS", () => {
    cy.contains(".link-external", "Web of Science")
      .should("exist")
      .should("be.visible")
      .children("a")
      .should("have.attr", "href")
      .should("contain", "webofknowledge.com/WOS");
  });

  it("should link to google scholar", () => {
    cy.contains(".link-external", "Google Scholar")
      .should("be.visible")
      .children("a")
      .should("have.attr", "href")
      .should("contain", "scholar.google.com");
  });
});
