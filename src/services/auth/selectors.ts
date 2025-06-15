import { RootState } from '../store';

export const selectUser = (state: RootState) => state.auth.user;

export const selectUserName = (state: RootState) => state.auth.user.name;

export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;

export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;

export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthoriseChecked;
