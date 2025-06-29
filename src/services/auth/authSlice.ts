import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  checkUserAuth,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './authThunks';

type authState = {
  isLoading: boolean;
  isAuthorized: boolean;
  isAuthoriseChecked: boolean;
  user: TUser;
  error: string | null;
};

export const initialState: authState = {
  isLoading: false,
  isAuthorized: false,
  isAuthoriseChecked: false,
  user: {
    name: '',
    email: ''
  },
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorized = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthorized = false;
      })
      //loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthorized = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthorized = false;
      })
      //updateUser
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user.email = '';
        state.user.name = '';
        state.isAuthorized = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //checkAuth
      .addCase(checkUserAuth.pending, (state) => {
        state.isAuthoriseChecked = false;
        state.isAuthorized = false;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isAuthoriseChecked = true;
        state.isAuthorized = true;
        state.user = action.payload.user;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.user.email = '';
        state.user.name = '';
        state.isAuthorized = false;
        state.isAuthoriseChecked = true;
      });
  }
});

export const {} = authSlice.actions;
export default authSlice.reducer;
