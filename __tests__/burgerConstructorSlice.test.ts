import burgerConstructorReducer, {
  initialState,
  addIngredient
} from '../src/services/burgerConstructor/burgerConstructorSlice';
describe('burgerConstuctorSlice', () => {
  it('should add ingredients with "addIngredient" action ', () => {
    const action = { type: addIngredient.type, payload: '' };
    const state = {
      ...initialState,
      orderIngredients: []
    }
    const result = burgerConstructorReducer(state, action);

    const expect(burgerConstructorReducer({}, action)).toEqual({});
  });
});
