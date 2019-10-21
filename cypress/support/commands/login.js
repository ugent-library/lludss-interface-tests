Cypress.Commands.add('login', () => {
  Cypress.log({ name: 'login', message: '***REMOVED***:***REMOVED***' })

  cy.visit('/user/signin', { log: false })

  cy.get('[data-target="#visitors"]', { log: false }).click({ log: false })

  cy.get('#username', { log: false }).type('***REMOVED***', { log: false })
  cy.get('#password', { log: false }).type('***REMOVED***', { log: false })
  cy.get(':submit[value="Sign in with visitors card"]', { log: false }).click({ log: false })
})
