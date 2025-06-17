import burgerConstructorReducer, {
  addIngredient,
  initialState
} from '../burgerConstructorSlice';

describe('burgerConstructorSlice', () => {
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
});
