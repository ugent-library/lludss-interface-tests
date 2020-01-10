describe('The catalog services', function () {
  describe('Requesting an item', function () {
    it('should redirect to the login page for unauthenticated users', function () {
      cy.visit('/catalog/rug01:002243161')

      cy.contains('.btn', 'Request').click()

      cy.location('href').should('end.with', '/user/signin')

      cy.contains('You need to sign in or sign up before continuing.').should('be.visible')
    })

    it('should be able to request as different items', function () {
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

      cy.get(
        '.libservice__status.libservice__status--success:contains("Available in the library, for consultation only")'
      )
        .as('status')
        .its('length')
        .should('be.greaterThan', 5)

      cy.get('@status')
        .closest('div')
        .find('.btn:contains("Request")')
        .as('request')
        .its('length')
        .should('be.greaterThan', 5)

      cy.get('@request')
        .map('href')
        .should(function (urls) {
          urls.forEach(function (url) {
            expect(url).to.match(/\/catalog\/rug01:000763774\/items\/\d+\/requests\/new$/)
          })

          expect(urls.length).to.eq(Cypress._.uniq(urls).length)
        })
    })

    describe('As an authenticated user', function () {
      beforeEach(cy.login)

      it('should be possible to request an item for loan from BIB (also via locker)', () => {
        cy.visit('/catalog/rug01:002772075')

        cy.contains('Request').click()

        cy.get('#content > h2').should('have.text', 'Available for loan, request from depot first')
        cy.get('.meta-location').should('contain', 'Location: BIB.')

        cy.get('input[type=radio][name=reserve_locker]').should('have.length', 2)
        cy.get('input[type=radio][name=reserve_locker][value=false]').should('be.checked')
        cy.get('input[type=radio][name=reserve_locker][value=true]').should('not.be.checked')
        cy.get('fieldset.request-locker-options').should('be.disabled')

        cy.get('input[type=radio][name=reserve_locker][value=true]').click()
        cy.get('input[type=radio][name=reserve_locker][value=false]').should('not.be.checked')
        cy.get('fieldset.request-locker-options').should('not.be.disabled')
      })

      it('should be possible to request an item for loan from DEPX (also via locker)', () => {
        cy.visit('/catalog/rug01:000896411')

        cy.contains('Request').click()

        cy.get('#content > h2').should('have.text', 'Available for loan, request from depot first')
        cy.get('.meta-location').should('contain', 'Location: DEP')

        cy.get('input[type=radio][name=reserve_locker]').should('have.length', 2)
      })

      it('should not be possible to request a dummy barcode item via locker', () => {
        cy.visit('/catalog/rug01:000320574')

        cy.contains('Request').click()

        cy.get('#content > h2').should('have.text', 'Available for loan, request from depot first')
        cy.get('.meta-location').should('contain', 'Location: BIB.')

        cy.get('input[type=radio][name=reserve_locker]').should('not.exist')
      })

      it('should be possible to request an item for loan from an external library', () => {
        cy.visit('/catalog/rug01:000457747')

        cy.contains('Request').click()

        cy.get('#content > h2').should('have.text', 'Available for loan, request from depot first')
        cy.get('.meta-location').should('contain', 'Location: PPW.')

        // Should not be able to loan via locker because PPW
        cy.get('input[type=radio][name=reserve_locker]').should('not.exist')
      })

      const sources = ['rug02', 'rug03', 'rug04']
      sources.forEach(db => {
        it(`should be possible to request via the card catalogue (${db})`, function () {
          cy.visit(`/catalog/source:${db}`)

          cy.get('.search-result .search-result__title')
            .random()
            .click()

          cy.contains('Request').click()

          cy.get('#content > h2').should('have.text', 'New request')
        })
      })

      it('should be possible to request a download', function () {
        cy.visit('/catalog/rug01:002241344')

        cy.contains('Schedule download').click()

        cy.get('#content > h2').should('have.text', 'New download request')
      })

      it('should be possible to request a license', function () {
        cy.visit('/catalog/rug01:000763774')

        cy.contains('Order additional license').click()

        cy.get('#content > h2').should('have.text', 'New license request')
      })
    })
  })

  describe('Requesting a scanned article', function () {
    it('should redirect to the login page for unauthenticated users', function () {
      cy.visit('/catalog/ser01:000047796')

      cy.contains('.btn', 'Request scanned article').click()

      cy.location('href').should('end.with', '/user/signin')

      cy.contains('You need to sign in or sign up before continuing.').should('be.visible')
    })

    it('should redirect to the request form for authenticated users', function () {
      cy.login()

      cy.visit('/catalog/ser01:000047796')

      cy.contains('.btn', 'Request scanned article').click()

      cy.location('pathname').should('end.with', '/catalog/ser01:000047796/requests/new')
      cy.param('scan').should('eq', 'true')

      cy.get('#content > h2').should('have.text', 'New scan request')
    })

    it('should fail when trying to request a non-serial', function () {
      cy.login()

      cy.request({ url: '/catalog/rug01:001992976/requests/new?scan=true', failOnStatusCode: false })
        .its('status')
        .should('eq', 403)
    })
  })

  describe('Requesting an article consultation', function () {
    it('should redirect to the login page for unauthenticated users', function () {
      cy.visit('/catalog/ser01:000047796')

      cy.contains('.btn', 'Request for consultation').click()

      cy.location('href').should('end.with', '/user/signin')

      cy.contains('You need to sign in or sign up before continuing.').should('be.visible')
    })

    it('should redirect to the request form for authenticated users', function () {
      cy.login()

      cy.visit('/catalog/ser01:000047796')

      cy.contains('.btn', 'Request for consultation').click()

      cy.location('pathname').should('end.with', '/catalog/ser01:000047796/requests/new')
      cy.param('scan').should('be.null')

      cy.get('#content > h2').should('have.text', 'New consultation request')
    })

    it('should fail when trying to request a non-serial', function () {
      cy.login()

      cy.request({ url: '/catalog/rug01:001992976/requests/new', failOnStatusCode: false })
        .its('status')
        .should('eq', 403)
    })
  })
})
