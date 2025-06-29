/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('selectIngredient', (category, value) => {
  value--;
  cy.get('[data-cy=ingredients]')
    .contains('h3', category)
    .next('ul')
    .find('[data-cy=ingredient-card]')
    .eq(value);
});

Cypress.Commands.add('addIngredient', (category, value) => {
  cy.selectIngredient(category, value).as('ingredient');
  cy.get('@ingredient')
    .find('[data-cy=ingredient-card-name]')
    .invoke('text')
    .as('ingredientName');

  cy.get('@ingredientName').then((name) => {
    cy.get('[data-cy=constructor]').should('not.contain', name);
  });
  cy.get('@ingredient').contains('Добавить').click();
  cy.get('@ingredientName').then((name) => {
    cy.get('[data-cy=constructor]').should('contain', name);
  });
});
