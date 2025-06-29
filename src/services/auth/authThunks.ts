import { createAsyncThunk } from '@reduxjs/toolkit';
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
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'auth/register',
  async (data: TRegisterData, thunkAPI) => {
    try {
      const response = await registerUserApi(data);
      const { accessToken, refreshToken } = response;
      setCookie('accessToken', accessToken, { expires: 3600 });
      localStorage.setItem('refreshToken', refreshToken);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка регистрации');
    }
  }
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'auth/login',
  async (data: TLoginData, thunkAPI) => {
    try {
      const response = await loginUserApi(data);
      const { accessToken, refreshToken } = response;
      setCookie('accessToken', accessToken, { expires: 3600 });
      localStorage.setItem('refreshToken', refreshToken);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка логина');
    }
  }
);

export const updateUser = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>('auth/updateUser', async (data: Partial<TRegisterData>, thunkAPI) => {
  try {
    return await updateUserApi(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Ошибка обновления пользователя');
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
      return thunkAPI.rejectWithValue('Ошибка разлогина');
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'auth/check',
  async (_, thunkAPI) => {
    try {
      return await getUserApi();
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка авторизации');
    }
  }
);
