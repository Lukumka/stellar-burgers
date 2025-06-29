import { sendOrder } from '../orderThunks';
import orderReducer, { initialState } from '../orderSlice';
import { orderBurgerApi } from '@api';

jest.mock('@api', () => ({
  orderBurgerApi: jest.fn()
}));

const dispatch = jest.fn();
const getState = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('sendOrder', () => {
  it('sendOrder - pending', async () => {
    const action = { type: sendOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.isRequest).toBe(true);
    expect(state.error).toBe(null);
  });
  it('sendOrder - fulfilled', async () => {
    const mockResponse = {
      success: true,
      orders: [
        {
          _id: '684f4018c2f30c001cb2d096',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          owner: '684f1dd3c2f30c001cb2d01e',
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-15T21:50:16.999Z',
          updatedAt: '2025-06-15T21:50:17.741Z',
          number: 81607,
          __v: 0
        }
      ]
    };
    const mockOrderData = [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ];
    (orderBurgerApi as jest.Mock).mockResolvedValue(mockResponse);
    const thunk = sendOrder(mockOrderData);
    const result = await thunk(dispatch, getState, {});
    expect(orderBurgerApi).toHaveBeenCalled();
    expect(result.type).toBe('order/sendOrder/fulfilled');
    expect(result.payload).toEqual(mockResponse);
  });
  it('sendOrder - rejected ', async () => {
    (orderBurgerApi as jest.Mock).mockRejectedValue(
      new Error('failed to create order')
    );
    const thunk = sendOrder(['a', 'B', 'LALALA']);
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('order/sendOrder/rejected');
    expect(result.payload).toBe('Ошибка оформления заказа');
  });
});
