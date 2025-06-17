import { RootState } from '../store';

export const selectUserFeedOrders = (state: RootState) => state.userFeed.orders;

export const selectIsUserFeedLoading = (state: RootState) =>
  state.userFeed.isLoading;
