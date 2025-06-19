/// <reference types="cypress" />

describe('constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.selectIngredient('Начинки', 7)
      .as('selectedCard')
      .find('[data-cy=ingredient-card-name]')
      .invoke('text')
      .as('ingredientName');
  });
  it('should add ingredient to constructor', () => {
    cy.get('@selectedCard').contains('Добавить').click();

    cy.get('@ingredientName').then((name) => {
      cy.get('[data-cy=constructor]').should('contain', name);
    });
  });

  it('should open ingredients modal and have all and true data', () => {
    cy.wait('@getIngredients');
    cy.get('@selectedCard').within(() => {
      cy.get(`[data-cy=ingredient-link]`).click();
    });
    cy.url().should('include', '/ingredients/');

    cy.get('@ingredientName').then((name) => {
      cy.get('[data-cy=ingredient-modal-data]').should('contain', name);
      cy.get('[data-cy=ingredient-modal-calories]')
        .invoke('text')
        .should('not.be.empty');
      cy.get('[data-cy=ingredient-modal-proteins]')
        .invoke('text')
        .should('not.be.empty');
      cy.get('[data-cy=ingredient-modal-fats]')
        .invoke('text')
        .should('not.be.empty');
      cy.get('[data-cy=ingredient-modal-carbonohydrates]')
        .invoke('text')
        .should('not.be.empty');
    });
  });

  it('should make order and open modal with right order number, close modal and clear constructor', () => {
    cy.visit('/');
    cy.intercept('POST', '/api/auth/login', { fixture: 'loginRes.json' }).as(
      'getLoginRes'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.addIngredient('Булки', 2);
    cy.addIngredient('Начинки', 1);
    cy.addIngredient('Соусы', 1);
    cy.addIngredient('Начинки', 2);
    cy.addIngredient('Соусы', 2);
    cy.addIngredient('Начинки', 3);
    cy.addIngredient('Соусы', 3);
    cy.get('[data-cy=order-info]').within(() => {
      cy.get('button').click();
    });
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.wait('@getLoginRes');
    cy.get('[data-cy=order-info]').within(() => {
      cy.get('button').click();
    });
    cy.wait('@createOrder').then((interception) => {
      const orderNumber = interception.response?.body?.order?.number;
      expect(orderNumber).to.exist;

      cy.get('[data-cy=order-modal-order_number]').should(
        'contain',
        orderNumber
      );
    });
    cy.get(' [data-cy=modal-close_button]').click();
    cy.get('[data-cy=constructor]')
      .should('contain.text', 'Выберите булки')
      .and('contain.text', 'Выберите начинку');
  });
});
