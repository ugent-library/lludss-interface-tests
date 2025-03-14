import "cypress-common";

import "./commands/get-count";
import "./commands/login";

chai.use(require("chai-sorted"));

beforeEach(() => {
  cy.wait(1000);
});
