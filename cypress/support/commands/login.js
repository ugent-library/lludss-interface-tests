Cypress.Commands.add('login', () => {
  cy.visit('/user/signin')

  cy.get('[data-target="#visitors"]').click()

  cy.get('#username').type('demo')
  cy.get('#password').type('demo')
  cy.get(':submit[value="Sign in with visitors card"]').click()
})
