let scriptsToStrip = [
  {
    key: 'ga',
    name: 'Google Analytics',
    url: 'google-analytics.com',
    stripped: false
  },
  {
    key: 'hj',
    name: 'Hotjar',
    url: 'hotjar.com',
    stripped: false
  }
]

Cypress.on('window:before:load', function(win) {
  let createElement = win.document.createElement

  win.document.createElement = function(tag) {
    if (tag === 'script') {
      scriptsToStrip.forEach(s => {
        if (win.document.currentScript.innerHTML.includes(s.url)) {
          tag = `custom_${s.key}_script`

          s.stripped = true

          console.log(`Removed ${s.name} script`)
        }
      })
    }

    return createElement.call(win.document, tag)
  }
})

describe('The test runner', function() {
  it('should never load the stripped scripts', function() {
    cy.visit('/')

    cy.get('script').each(script => {
      scriptsToStrip.forEach(s => {
        expect(script.prop('src')).to.not.contain(s.url)
      })
    })

    scriptsToStrip.forEach(s => {
      cy.get(`custom_${s.key}_script`).should($cs => {
        if (s.stripped) {
          expect($cs).to.have.length(1)

          expect($cs.prop('src')).to.contain(s.url)
        } else {
          expect($cs).to.not.exist
        }
      })
    })
  })
})
