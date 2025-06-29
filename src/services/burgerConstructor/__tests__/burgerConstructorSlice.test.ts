import burgerConstructorReducer, {
  addIngredient,
  clearIngredients,
  initialState,
  moveDownIngredient,
  moveUpIngredient,
  parseIngredientIds,
  removeIngredient
} from '../burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('burgerConstructorSlice', () => {
  let initialIngredients: TConstructorIngredient[];
  let bun: TConstructorIngredient;
  let orderIngredients: string[];
  beforeAll(() => {
    initialIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0,
        id: '1'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0,
        id: '2'
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0,
        id: '3'
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0,
        id: '4'
      },
      {
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        __v: 0,
        id: '5'
      },
      {
        _id: '643d69a5c3f7b9001cfa0940',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0,
        id: '6'
      }
    ];
    bun = {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0,
      id: '0406efed-3c44-4ee2-8fb8-c9830d2cc4ba'
    };
    orderIngredients = [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093d'
    ];
  });
  it('should add ingredients with "addIngredient" action ', () => {
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa0948',
      name: 'Кристаллы марсианских альфа-сахаридов',
      type: 'main',
      proteins: 234,
      fat: 432,
      carbohydrates: 111,
      calories: 189,
      price: 762,
      image: 'https://code.s3.yandex.net/react/code/core.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
      __v: 0
    };
    const action = { type: addIngredient.type, payload: ingredient };
    const state = {
      ...initialState,
      ingredients: []
    };
    const result = burgerConstructorReducer(state, action);

    expect(result.ingredients).toEqual([ingredient]);
  });
  it('should remove ingredients with "removeIngredient" action ', () => {
    const action = { type: removeIngredient.type, payload: { id: '123456' } };
    const state = {
      ...initialState,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0948',
          name: 'Кристаллы марсианских альфа-сахаридов',
          type: 'main',
          proteins: 234,
          fat: 432,
          carbohydrates: 111,
          calories: 189,
          price: 762,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          __v: 0,
          id: '123456'
        }
      ]
    };
    const result = burgerConstructorReducer(state, action);
    expect(result.ingredients).toEqual([]);
  });
  it('should move up ingredient with "moveUpIngredient" action', () => {
    const index = 2;
    const action = { type: moveUpIngredient.type, payload: index };
    const state = {
      ...initialState,
      ingredients: initialIngredients
    };
    const result = burgerConstructorReducer(state, action);
    expect(result.ingredients[index - 1]).toEqual(initialIngredients[index]);
    expect(result.ingredients[index]).toEqual(initialIngredients[index - 1]);

    expect(result.ingredients[0]).toEqual(initialIngredients[0]);
    expect(result.ingredients[3]).toEqual(initialIngredients[3]);
  });
  it('should move down ingredient with "moveDownIngredient" action', () => {
    const index = 3;
    const action = { type: moveDownIngredient.type, payload: index };
    const state = {
      ...initialState,
      ingredients: initialIngredients
    };
    const result = burgerConstructorReducer(state, action);
    expect(result.ingredients[index + 1]).toEqual(initialIngredients[index]);
    expect(result.ingredients[index]).toEqual(initialIngredients[index + 1]);
  });
  it('should parse filling ingredients, add buns and return ingredients for order', () => {
    const action = { type: parseIngredientIds.type };
    const state = {
      ...initialState,
      ingredients: initialIngredients,
      bun: bun
    };
    const result = burgerConstructorReducer(state, action);
    expect(result.orderIngredients).toEqual(orderIngredients);
  });
  it('should clear constructor and order data', () => {
    const action = { type: clearIngredients.type };
    const state = {
      ...initialState,
      ingredients: initialIngredients,
      orderIngredients: orderIngredients,
      bun: bun
    };
    const result = burgerConstructorReducer(state, action);
    expect(result).toEqual(initialState);
  });
});
