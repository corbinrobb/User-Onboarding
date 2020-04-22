/// <reference types="Cypress" />

describe('Test the inputs and submit on the form', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/')
  });

  it('Test inputs and submit on form', function() {
    cy.get('input[name="name"]')
      .type('Bob Bobberson')
      .should('have.value', 'Bob Bobberson')

    cy.get('input[name="email"]')
      .type('bob.bobberson@bobmail.com')
      .should('have.value', 'bob.bobberson@bobmail.com')

    cy.get('input[name="password"]')
      .type('Bob12345')
      .should('have.value', 'Bob12345')

    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')

    cy.get('select')
      .select('Web Developer')
      .should('have.value', 'Web Developer')

    cy.get('button')
      .click()

    cy.pause()
  })

  
  
  it('Check for form validation', function () {
    cy.get('input[name="name"]')
      .type('Bob')
      .clear()

    cy.get('[data-cy=name]')
      .should('have.text', 'Please enter a name')

    cy.get('input[name="email"]')
      .type('a')
      .clear()

    cy.get('[data-cy=email]')
      .should('have.text', 'Please enter your email')

    cy.get('input[name="email"]')
      .type('email.com')

    cy.get('[data-cy=email]')
      .should('have.text', 'this must be a valid email')

    cy.get('input[name="password"]')
      .type('123')

    cy.get('[data-cy=password]')
      .should('have.text', 'Password must be at least 7 characters long')

    cy.get('input[type="checkbox"]')
      .check()
      .uncheck()

    cy.get('[data-cy=terms]')
      .should('have.text', 'Please accept the terms')
    
    cy.get('button')
      .should('be.disabled')
  })
})