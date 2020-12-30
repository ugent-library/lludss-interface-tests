beforeEach(function () {
  cy.intercept(/\/catalog\/?$/, req => {
    const url = new URL(req.url)
    if (!url.searchParams.has('q')) {
      url.searchParams.append('q', '')
      req.url = url.toString()
    }
  })
})
