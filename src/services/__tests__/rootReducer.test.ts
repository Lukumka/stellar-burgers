import rootReducer from '../rootReducer';
import { authSlice } from '../auth/authSlice';
import { ingredientsSlice } from '../ingredients/ingredientsSlice';
import { burgerConstructorSlice } from '../burgerConstructor/burgerConstructorSlice';
import { feedSlice } from '../feed/feedSlice';
import { userFeedSlice } from '../userFeed/userFeedSlice';
import { orderSlice } from '../order/orderSlice';

describe('rootReducer', () => {
  it('should be return initial state', () => {
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      ingredients: ingredientsSlice.getInitialState(),
      burgerConstructor: burgerConstructorSlice.getInitialState(),
      feed: feedSlice.getInitialState(),
      auth: authSlice.getInitialState(),
      userFeed: userFeedSlice.getInitialState(),
      order: orderSlice.getInitialState()
    });
  });
});
