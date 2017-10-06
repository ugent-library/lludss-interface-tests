Cypress.Commands.add('getQueryParameter', (name) => {
    return cy.location('search', {log: false})
        .then((search) => {
            let hashes = search.slice(search.indexOf('?') + 1).split('&');
            return hashes.reduce((params, hash) => {
                let [key, val] = hash.split('=');
                return Object.assign(params, {[key]: decodeURIComponent(val)});
            }, {});
        })
        .then(function(query) {
            let result = query[name];

            Cypress.log({
                name: 'getQueryParameter',
                message: [name, result],
                consoleProps: () => {
                    return {
                        name: name,
                        result: result,
                    };
                },
            });

            return result;
        });
});
