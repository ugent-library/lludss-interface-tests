import { languages } from "../../support/constants";

describe("The info/about page", () => {
  languages.forEach((lang) => {
    it(`should contain a list of links to /${lang}/info`, () => {
      cy.visit(`/${lang}/info`);

      let widgetsBaseUrl = Cypress.env("widgetsBaseUrl");
      cy.request(`${widgetsBaseUrl}/list_messages/web_info_${lang}.json`).then(
        (response) => {
          cy.get(".section-title:eq(0) ~ ul > li > a")
            .should("have.length", response.body.messages_total)
            .each(($a, index) => {
              let message = response.body.messages[index];
              let code = message.code
                .replace(`${lang}_`, "")
                .replace(`_${lang}`, "");

              cy.wrap($a)
                .should("have.text", message.title)
                .should("have.attr", "href")
                .should("match", new RegExp(`/${lang}/info/${code}$`));
            });
        },
      );
    });
  });

  it("should link to research tips", () => {
    cy.visit("/info");

    cy.get(".section-title:eq(1) ~ ul > li > a")
      .should("be.visible")
      .each(($a) => {
        cy.request({
          url: $a.prop("href"),
          followRedirect: false,
        }).then((resp) => {
          expect(resp.status).to.eq(302);
          expect(resp.redirectedToUrl).not.to.contain("lib.ugent.be");
        });
      });
  });
});
