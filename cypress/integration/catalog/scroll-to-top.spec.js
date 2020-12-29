import { exec } from 'child_process'

describe('The scroll to top feature', function () {
  describe('should only be visible after scrolling', function () {
    const executeTest = () => {
      cy.visit('/catalog?q=')

      cy.window().then(function (w) {
        cy.get('.js-backtotop').as('back-to-top').should('not.be.inViewport', w)

        cy.scrollTo(0, 200, { duration: 100 })

        cy.get('@back-to-top').should('be.inViewport', w)

        cy.scrollTo(0, '25%', { duration: 100 })

        cy.get('@back-to-top').should('be.inViewport', w)

        cy.scrollTo(0, '50%', { duration: 100 })

        cy.get('@back-to-top').should('be.inViewport', w)

        cy.scrollTo(0, '75%', { duration: 100 })

        cy.get('@back-to-top').should('be.inViewport', w)

        cy.scrollTo(0, '100%', { duration: 100 })

        cy.get('@back-to-top').should('be.inViewport', w)

        cy.reload()

        // Reload automatically reuses the scroll position
        cy.get('@back-to-top').should('be.inViewport', w)

        cy.scrollTo(0, 0, { duration: 100 })

        cy.get('@back-to-top').should('not.be.visible')
      })
    }

    it('on desktop', function () {
      executeTest()
    })

    it('on mobile', function () {
      cy.viewport('iphone-6')

      executeTest()
    })
  })

  describe('should scroll back to top when clicking', function () {
    const executeTest = () => {
      cy.visit('/catalog?q=')

      cy.window().then(function (w) {
        cy.scrollTo(0, '555', { duration: 100 })

        cy.wrap(Cypress.$(w)).invoke('scrollTop').should('eq', 555)

        cy.get('.js-backtotop').as('back-to-top').click()

        cy.wrap(Cypress.$(w)).invoke('scrollTop').should('eq', 0)

        cy.get('@back-to-top').should('not.be.visible')
      })
    }

    it('on desktop', function () {
      executeTest()
    })

    it('on mobile', function () {
      cy.viewport('iphone-6')

      executeTest()
    })
  })
})
