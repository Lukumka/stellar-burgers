import rootReducer from '../src/services/rootReducer';
import { authSlice } from '../src/services/auth/authSlice';
import { ingredientsSlice } from '../src/services/ingredients/ingredientsSlice';
import { burgerConstructorSlice } from '../src/services/burgerConstructor/burgerConstructorSlice';
import { feedSlice } from '../src/services/feed/feedSlice';
import { userFeedSlice } from '../src/services/userFeed/userFeedSlice';
import { orderSlice } from '../src/services/order/orderSlice';
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
