import { initialState, resetOrder } from '../orderSlice';
import orderReducer from '../orderSlice';
describe('orderSlice', () => {
  it('should reset order state', () => {
    const action = { type: resetOrder.type };
    const order = {
      _id: '68587276943eac001cc3b68f',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T21:15:34.887Z',
      updatedAt: '2025-06-22T21:15:35.632Z',
      number: 82343
    };
    const state = { ...initialState, order: order, isRequest: true };
    const result = orderReducer(state, action);
    expect(result).toEqual(initialState);
  });
});
