const paths = {
  "/catalog": "Language",
  "/nl/catalog": "Taal",
  "/en/catalog": "Language",
};

describe("The language facet", () => {
  Object.keys(paths).forEach((path) => {
    it(`should not have non-translated languages for path ${path}`, () => {
      cy.visit(path);

      cy.contains(".filters .form-group", paths[path])
        .find(".checkbox label .label")
        .each((_, i, w) => {
          cy.wrap(w.eq(i).text()).should("not.match", /^[a-z]{3}$/);
        });
    });
  });
});
