import { RootState } from '../store';

export const selectIsOrderRequest = (state: RootState) => state.order.isRequest;

export const selectOrder = (state: RootState) => state.order.order;
