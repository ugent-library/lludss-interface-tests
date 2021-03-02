// https://github.ugent.be/ugent-library/lludss-interface/issues/510
describe('A fix for issue 510', () => {
  it('should not have more than one element with id "q"', () => {
    cy.visit('/catalog?q=ein')

    cy.get('[id=q]').should('have.length', 1)
    cy.get('input[type=hidden][name=q]').each(e => cy.wrap(e).should('not.have.attr', 'id'))
  })

  it('should not have an element with id "type"', () => {
    cy.visit('/catalog?type=book')

    cy.get('#type').should('not.exist')
    cy.get('input[type=hidden][name=type]').each(e => cy.wrap(e).should('not.have.attr', 'id'))
  })

  it('should not have an element with id "access"', () => {
    cy.visit('/catalog?access=online')

    cy.get('#access').should('not.exist')
    cy.get('input[type=hidden][name=access]').each(e => cy.wrap(e).should('not.have.attr', 'id'))
  })

  it('should not have an element with id "faculty"', () => {
    cy.visit('/catalog?faculty=LW')

    cy.get('#faculty').should('not.exist')
    cy.get('input[type=hidden][name=faculty]').each(e => cy.wrap(e).should('not.have.attr', 'id'))
  })

  it('should not have an element with id "lang"', () => {
    cy.visit('/catalog?lang=en')

    cy.get('#lang').should('not.exist')
    cy.get('input[type=hidden][name=lang]').each(e => cy.wrap(e).should('not.have.attr', 'id'))
  })
})
