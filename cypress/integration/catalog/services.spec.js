describe('The catalog services', () => {
  describe('Requesting an item', () => {
    it('should redirect to the login page for unauthenticated users', () => {
      cy.visit('/catalog/rug01:002243161')

      cy.contains('.btn', 'Prepare for consultation').click()

      cy.location('href').should('end.with', '/user/signin')

      cy.contains('You need to sign in or sign up before continuing.').should('be.visible')
    })

    it('should be able to request as different items', () => {
      cy.server()
      cy.route('/status/900000106992*').as('ajax1')
      cy.route('/status/910000094749*').as('ajax2')
      cy.route('/status/000011045042*').as('ajax3')
      cy.route('/status/000011045043*').as('ajax4')
      cy.route('/status/910000089523*').as('ajax5')
      cy.route('/status/910000089524*').as('ajax6')
      cy.route('/status/910000089525*').as('ajax7')
      cy.route('/status/910000089526*').as('ajax8')
      cy.route('/status/910000089527*').as('ajax9')

      cy.visit('/catalog/rug01:000763774')

      cy.wait(['@ajax1', '@ajax2', '@ajax3', '@ajax4', '@ajax5', '@ajax6', '@ajax7', '@ajax8', '@ajax9'])

      cy.get('.libservice__status.libservice__status--success:contains("Available, item can be consulted")')
        .as('status')
        .its('length')
        .should('be.greaterThan', 5)

      cy.get('@status')
        .closest('div')
        .find('.btn:contains("Prepare for consultation")')
        .as('request')
        .its('length')
        .should('be.greaterThan', 5)

      cy.get('@request')
        .map('href')
        .should(urls => {
          urls.forEach(url => {
            expect(url).to.match(/\/catalog\/rug01:000763774\/items\/\d+\/requests\/new\?service=CONSULT$/)
          })

          expect(urls.length).to.eq(Cypress._.uniq(urls).length)
        })
    })

    describe('As an authenticated user', () => {
      beforeEach(cy.login)

      it.skip('should be possible to request an item for loan from BIB (also via locker)', () => {
        cy.visit('/catalog/rug01:002772075')

        cy.contains('.btn', 'Prepare for loan').click()

        cy.param('scan').should('be.null')

        cy.get('#content > h2').should('have.text', 'Prepare for loan')
        cy.get('.meta-location').should('contain', 'Location in depot: BIB.')

        cy.get('input[type=radio][name=pickup_location]').should('have.length', 2)
        cy.get('input[type=radio][name=pickup_location][value=BIB]').should('be.checked')
        cy.get('input[type=radio][name=pickup_location][value=BIB]').should('have.attr', 'data-locker', 'false')
        cy.get('input[type=radio][name=pickup_location][value=BIBQ]').should('not.be.checked')
        cy.get('input[type=radio][name=pickup_location][value=BIBQ]').should('have.attr', 'data-locker', 'true')
        cy.get('fieldset.request-locker-options').should('be.hidden')

        cy.get('input[type=radio][name=pickup_location][value=BIBQ]').click()
        cy.get('input[type=radio][name=pickup_location][value=BIB]').should('not.be.checked')
        cy.get('fieldset.request-locker-options').should('not.be.hidden')
      })

      it.skip('should be possible to request an item for loan from DEPX (also via locker)', () => {
        cy.visit('/catalog/rug01:002366148')

        cy.contains('.btn', 'Prepare for loan').click()

        cy.param('scan').should('be.null')

        cy.get('#content > h2').should('have.text', 'Prepare for loan')
        cy.get('.meta-location').should('contain', 'Location in depot: DEP')

        cy.get('input[type=radio][name=pickup_location]').should('have.length', 2)
        cy.get('input[type=radio][name=pickup_location][data-locker=true]').should('be.visible')
      })

      it('should not be possible to request a dummy barcode item via locker', () => {
        cy.visit('/catalog/rug01:000320574')

        cy.contains('.btn', 'Prepare for loan').click()

        cy.param('scan').should('be.null')

        cy.get('#content > h2').should('have.text', 'Prepare for loan')
        cy.get('.meta-location').should('contain', 'Location in depot: BIB.')

        cy.get('input[type=radio][name=pickup_location][data-locker=true]').should('not.exist')
      })

      it('should be possible to request an item for loan from an external library', () => {
        const loanCandidates = [
          'rug01:000434728', // LWBIB
          'rug01:000000509', // PPW
          'rug01:002040897', // EBIB
        ]

        cy.wrap(loanCandidates)
          .random()
          .then(c => cy.visit(`/catalog/${c}`))

        cy.contains('.btn', 'Prepare for loan').click()

        cy.param('scan').should('be.null')

        cy.get('#content > h2').should('have.text', 'Prepare for loan')
        cy.get('.meta-location')
          .invoke('text')
          .should('match', /Location in depot: (LWBIB|PPW|EBIB)\./)

        // Should not be able to loan via locker because not BIB or DEP*
        cy.get('input[type=radio][name=pickup_location][data-locker=true]').should('not.exist')
      })

      const sources = ['rug02', 'rug03', 'rug04']
      sources.forEach(db => {
        it(`should be possible to request via the card catalogue (${db})`, () => {
          cy.visit(`/catalog/source:${db}`)

          cy.get('.search-result .search-result__title').random().click()

          cy.contains('.btn', 'Request').click()

          cy.get('#content > h2').should('have.text', 'New request')
        })
      })

      it('should be possible to request a download', () => {
        cy.visit('/catalog/rug01:002241344')

        cy.contains('Schedule download').click()

        cy.get('#content > h2').should('have.text', 'New download request')
      })

      it('should be possible to request a license', () => {
        cy.visit('/catalog/rug01:000763774')

        cy.contains('Order additional license').click()

        cy.get('#content > h2').should('have.text', 'New license request')
      })

      it('should not allow invalid e-mail addresses', () => {
        cy.visit('/catalog/rug01:002020092/items/000000841754/requests/new')

        cy.get('#email').prop('type', 'text').type('user@ugent .be')

        cy.contains('.btn', 'Request').click()

        cy.get('.alert.alert-danger').should('be.visible').should('contain', 'E-mail address is invalid.')
      })
    })
  })

  describe('Requesting a chapter scan', () => {
    it('should redirect to the login page for unauthenticated users', () => {
      cy.visit('/catalog/rug01:001991595')

      cy.contains('.btn', 'Get a chapter scanned').click()

      cy.location('href').should('end.with', '/user/signin')

      cy.contains('You need to sign in or sign up before continuing.').should('be.visible')
    })

    describe('As an authenticated user', () => {
      beforeEach(cy.login)

      it('should be possible to request a chapter scan', () => {
        cy.visit('/catalog/rug01:001991595')

        cy.contains('.btn', 'Get a chapter scanned').click()

        cy.location('pathname').should('end.with', '/catalog/rug01:001991595/items/000000949310/requests/new')
        cy.param('scan').should('eq', 'true')

        cy.get('#content > h2').should('have.text', 'Get a chapter scanned')
        cy.get('.meta-location').should('contain', 'Location in depot: BIB.V.')
      })

      it('should not allow invalid e-mail addresses', () => {
        cy.visit('/catalog/rug01:001991595/items/000000949310/requests/new?scan=true')

        cy.get('#titleofpart').type('Test chapter')

        cy.get('#email').prop('type', 'text').type('user@ugent .be')

        cy.contains('.btn', 'Request').click()

        cy.get('.alert.alert-danger').should('be.visible').should('contain', 'E-mail address is invalid.')
      })
    })
  })

  describe('Requesting a scanned article', () => {
    it('should redirect to the login page for unauthenticated users', () => {
      cy.visit('/catalog/ser01:000047796')

      cy.contains('.btn', 'Request scanned article').click()

      cy.location('href').should('end.with', '/user/signin')

      cy.contains('You need to sign in or sign up before continuing.').should('be.visible')
    })

    it('should redirect to the request form for authenticated users', () => {
      cy.login()

      cy.visit('/catalog/ser01:000047796')

      cy.contains('.btn', 'Request scanned article').click()

      cy.location('pathname').should('end.with', '/catalog/ser01:000047796/requests/new')
      cy.param('scan').should('eq', 'true')

      cy.get('#content > h2').should('have.text', 'New scan request')
    })

    it('should fail when trying to request a non-serial', () => {
      cy.login()

      cy.request({
        url: '/catalog/rug01:001992976/requests/new?scan=true',
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 403)
    })
  })

  describe('Requesting an article consultation', () => {
    it('should redirect to the login page for unauthenticated users', () => {
      cy.visit('/catalog/ser01:000047796')

      cy.contains('.btn', 'Request for consultation').click()

      cy.location('href').should('end.with', '/user/signin')

      cy.contains('You need to sign in or sign up before continuing.').should('be.visible')
    })

    it('should redirect to the request form for authenticated users', () => {
      cy.login()

      cy.visit('/catalog/ser01:000047796')

      cy.contains('.btn', 'Request for consultation').click()

      cy.location('pathname').should('end.with', '/catalog/ser01:000047796/requests/new')
      cy.param('scan').should('be.null')

      cy.get('#content > h2').should('have.text', 'New consultation request')
    })

    it('should fail when trying to request a non-serial', () => {
      cy.login()

      cy.request({
        url: '/catalog/rug01:001992976/requests/new',
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 403)
    })
  })
})
