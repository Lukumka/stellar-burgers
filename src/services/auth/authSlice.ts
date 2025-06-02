import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'auth/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    const { accessToken, refreshToken } = response;
    setCookie('accessToken', accessToken, { expires: 3600 });
    localStorage.setItem('refreshToken', refreshToken);
    return response;
  }
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'auth/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    const { accessToken, refreshToken } = response;
    setCookie('accessToken', accessToken, { expires: 3600 });
    localStorage.setItem('refreshToken', refreshToken);
    return response;
  }
);

export const updateUser = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>('auth/updateUser', async (data: Partial<TRegisterData>, thunkAPI) => {
  try {
    return await updateUserApi(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Update failed');
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Logout failed');
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'auth/check',
  async (_, thunkAPI) => {
    try {
      return await getUserApi();
    } catch (e) {
      return thunkAPI.rejectWithValue('');
    }
  }
);

type authState = {
  isLoading: boolean;
  isAuthorized: boolean;
  isAuthoriseChecked: boolean;
  user: TUser;
  error: string | null;
};

const initialState: authState = {
  isLoading: false,
  isAuthorized: false,
  isAuthoriseChecked: false,
  user: {
    name: '',
    email: ''
  },
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
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
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      //logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user.email = '';
        state.user.name = '';
        state.isAuthorized = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.user.email = '';
        state.user.name = '';
        state.isAuthorized = false;
      })
      //checkAuth
      .addCase(checkUserAuth.pending, (state) => {
        state.isAuthoriseChecked = false;
        state.isAuthorized = false;
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
