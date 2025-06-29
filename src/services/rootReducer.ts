import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredientsSlice';
import burgerConstructorReducer from './burgerConstructor/burgerConstructorSlice';
import feedReducer from './feed/feedSlice';
import authReducer from './auth/authSlice';
import userFeedReducer from './userFeed/userFeedSlice';
import orderReducer from './order/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  auth: authReducer,
  userFeed: userFeedReducer,
  order: orderReducer
});

export default rootReducer;
