Cypress.Commands.add('getCount', {prevSubject: 'element'}, (subject) => {
    let text = subject.prop('innerText');
    let count = parseInt(text.replace(/,/g, ''));

    Cypress.log({
        name: 'getCount',
        message: [count],
        consoleProps: () => {
            return {
                count: count,
            };
        },
    });

    return cy.wrap(count, {log: false});
});
