/// <reference types="cypress" />

describe('constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
  });
  it('should add ingredient to constructor', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy=ingredients]').within(() => {
      cy.contains('Булки');
      cy.get('[data-cy=ingredient-card]').first().contains('Добавить').click();
    });
    cy.get('[data-cy=constructor]').within(() => {});
  });
  it('should open ingredients modal', () => {});
});
