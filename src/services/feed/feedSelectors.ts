import { RootState } from '../store';

export const selectFeedOrders = (state: RootState) => state.feed.orders;

export const selectCurrentOrder = (state: RootState) => state.feed.current;

export const selectIsFeedLoading = (state: RootState) => state.feed.isLoading;

export const selectFeedInfo = (state: RootState) => state.feed.feed;
