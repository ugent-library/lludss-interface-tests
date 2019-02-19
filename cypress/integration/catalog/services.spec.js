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
      ;['rug02', 'rug03', 'rug04'].forEach(db => {
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

    it('should fail when trying to request a non-serial', function () {
      cy.login()

      cy.request({url:'/catalog/rug01:001992976/requests/new?scan=true', failOnStatusCode:false})
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

    it('should fail when trying to request a non-serial', function () {
      cy.login()

      cy.request({url:'/catalog/rug01:001992976/requests/new', failOnStatusCode: false})
        .its('status')
        .should('eq', 403)
    })
  })
})
