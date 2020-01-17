Cypress.Commands.add('getCount', { prevSubject: ['element', 'optional'] }, subject => {
  if (!subject) {
    subject = Cypress.$('.search-result-count > strong:last()')
  }

  let text = subject.prop('innerText')
  let count = parseInt(text.replace(/,/g, ''))

  Cypress.log({
    name: 'getCount',
    message: [count],
    consoleProps: () => {
      return {
        count: count
      }
    }
  })

  return cy.wrap(count, { log: false })
})
