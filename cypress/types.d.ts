declare namespace Cypress {
  interface Chainable<Subject = any> {
    selectIngredient(
      category: 'Начинки',
      value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    ): Chainable<void>;
    selectIngredient(category: 'Булки', value: 1 | 2): Chainable<void>;
    selectIngredient(category: 'Соусы', value: 1 | 2 | 3 | 4): Chainable<void>;
    addIngredient(
      category: 'Начинки',
      value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    ): Chainable<void>;
    addIngredient(category: 'Булки', value: 1 | 2): Chainable<void>;
    addIngredient(category: 'Соусы', value: 1 | 2 | 3 | 4): Chainable<void>;
  }
}
