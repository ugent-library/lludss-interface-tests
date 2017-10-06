chai.Assertion.addProperty('readonly', function() {
    this.assert(
        this._obj[0].readOnly,
        'expected #{this} to be read-only',
        'expected #{this} to not be read-only'
    );
});

chai.Assertion.addProperty('start', function() {
    return {
        with: (substring) => {
            this.assert(
                Cypress._.startsWith(this._obj, substring),
                'expected #{this} to start with #{exp}',
                'expected #{this} to not start with #{exp}',
                substring
            );
        },
    };
});

chai.Assertion.addProperty('end', function() {
    return {
        with: (substring) => {
            this.assert(
                Cypress._.endsWith(this._obj, substring),
                'expected #{this} to end with #{exp}',
                'expected #{this} to not end with #{exp}',
                substring
            );
        },
    };
});

chai.Assertion.addProperty('sorted', function() {
    return {
        ascending: () => {
            this.assert(
                Cypress._.every(this._obj, function(value, index, array) {
                    return index === 0 || array[index - 1] <= value;
                }),
                'expected #{this} to be sorted ascending',
                'expected #{this} to not be sorted ascending'
            );
        },
        descending: () => {
            this.assert(
                Cypress._.every(this._obj, function(value, index, array) {
                    return index === 0 || array[index - 1] >= value;
                }),
                'expected #{this} to be sorted descending',
                'expected #{this} to not be sorted descending'
            );
        },
    };
});
