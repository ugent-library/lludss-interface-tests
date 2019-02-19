import { parse } from 'fast-xml-parser'

let parseOptions = {
  ignoreTextNodeAttr: false,
  attrPrefix: '@'
}

describe('The opensearch API', function() {
  it('should produce OpenSearch description', function() {
    cy.request('/catalog/opensearch.xml')
      .then(function(response) {
        return parse(response.body, parseOptions).OpenSearchDescription
      })
      .should(function(openSearch) {
        expect(openSearch).to.have.property('ShortName', 'Ghent University Library')
        expect(openSearch).to.have.property('Description', 'Ghent University Library Search')
        expect(openSearch)
          .to.have.property('Url')
          .and.to.have.length(3)

        let types = Cypress._.map(openSearch.Url, '@type')
        expect(types)
          .to.contain('text/html')
          .and.to.contain('application/rss+xml')
          .and.to.contain('application/x-suggestions+json')
      })
  })

  describe('The RSS API', function() {
    it('should produce search results', function() {
      cy.request('/catalog.rss?q=troisieme%20Belvedere')
        .then(function(response) {
          return parse(response.body, parseOptions).rss
        })
        .should(function(rss) {
          expect(rss)
            .to.have.property('channel')
            .and.to.have.property('title', 'Ghent University Library Search Results')

          expect(rss.channel.item).to.have.property('title', 'Troisième belvédère')
          expect(rss.channel.item)
            .to.have.property('link')
            .and.to.end.with('/catalog/rug01:000489124')
        })

      cy.request('/catalog.rss?q=liber+floridus')
        .then(function(response) {
          return parse(response.body, parseOptions).rss
        })
        .should(function(rss) {
          expect(rss.channel.item)
            .to.be.an('array')
            .that.has.length(20)

          let titles = Cypress._.map(rss.channel.item, 'title')
          expect(titles.filter(i => i.toLowerCase().indexOf('liber floridus') >= 0)).to.not.be.empty
        })
    })
  })

  describe('The suggestions API', function() {
    it('should produce suggestions', function() {
      cy.request('/catalog/opensearch.json?q=belvedere+troisieme')
        .its('body')
        .should(function(body) {
          expect(body)
            .to.be.an('array')
            .and.to.have.length(2)

          expect(body[0]).to.eq('belvedere troisieme')
          expect(body[1])
            .to.be.an('array')
            .and.to.have.length(1)
          expect(body[1][0]).to.eq('Troisième belvédère')
        })

      cy.request('/catalog/opensearch.json?q=RTBF')
        .its('body')
        .should(function(body) {
          expect(body)
            .to.be.an('array')
            .and.to.have.length(2)

          expect(body[0]).to.eq('RTBF')
          expect(body[1])
            .to.be.an('array')
            .and.to.have.length(10)

          expect(body[1].filter(i => i.toLowerCase().indexOf('rtbf') >= 0)).to.not.be.empty
        })
    })
  })
})
