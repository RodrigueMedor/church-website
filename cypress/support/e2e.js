import './commands';

// Ignore uncaught exceptions from the application (e.g. pre-existing bugs)
Cypress.on('uncaught:exception', () => false);

beforeEach(() => {
  cy.intercept('GET', '**/api/public/**').as('publicApi');
  cy.intercept('PUT', '**/api/admin/**').as('adminApi');
});
