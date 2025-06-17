import authReducer, { initialState } from '../authSlice';
import {
  checkUserAuth,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../authThunks';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TUserResponse,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../../utils/cookie';

jest.mock('@api', () => ({
  registerUserApi: jest.fn(),
  getUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  updateUserApi: jest.fn()
}));
jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

const dispatch = jest.fn();
const getState = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('registerUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.setItem = jest.fn();
  });
  it('registerUser - pending', async () => {
    const action = { type: registerUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });
  it('registerUser - fulfilled, store tokens', async () => {
    const mockRegisterResponse: TAuthResponse = {
      success: true,
      user: {
        email: 'user@tu.l',
        name: '123'
      },
      accessToken: 'acc123',
      refreshToken: 'ref567'
    };
    (registerUserApi as jest.Mock).mockResolvedValue(mockRegisterResponse);
    const thunk = registerUser({
      name: '123',
      email: 'user@tu.l',
      password: '<PASSWORD>'
    });
    const result = await thunk(dispatch, getState, {});

    expect(registerUserApi).toHaveBeenCalled();
    expect(setCookie).toHaveBeenCalledWith('accessToken', 'acc123', {
      expires: 3600
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'ref567');
    expect(result.type).toBe('auth/register/fulfilled');
    expect(result.payload).toEqual(mockRegisterResponse);
  });
  it('registerUser - rejected ', async () => {
    (registerUserApi as jest.Mock).mockRejectedValue(
      new Error('failed to register')
    );
    const thunk = registerUser({
      name: '123',
      email: 'user@tu.l',
      password: '<PASSWORD>'
    });
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/register/rejected');
    expect(result.payload).toBe('Ошибка регистрации');
  });
});

describe('loginUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.setItem = jest.fn();
  });

  it('loginUser - pending', async () => {
    const action = { type: loginUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });
  it('loginUser - fulfilled', async () => {
    const mockLoginResponse: TAuthResponse = {
      success: true,
      user: {
        email: 'user@tu.l',
        name: '123'
      },
      accessToken: 'acc123',
      refreshToken: 'ref567'
    };
    (loginUserApi as jest.Mock).mockResolvedValue(mockLoginResponse);
    const thunk = loginUser({
      email: 'user@tu.l',
      password: '<PASSWORD>'
    });
    const result = await thunk(dispatch, getState, {});

    expect(loginUserApi).toHaveBeenCalled();
    expect(setCookie).toHaveBeenCalledWith('accessToken', 'acc123', {
      expires: 3600
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'ref567');
    expect(result.type).toBe('auth/login/fulfilled');
    expect(result.payload).toEqual(mockLoginResponse);
  });
  it('loginUser - rejected ', async () => {
    (loginUserApi as jest.Mock).mockRejectedValue(new Error('failed to login'));
    const thunk = loginUser({
      email: 'user@tu.l',
      password: '<PASSWORD>'
    });
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/login/rejected');
    expect(result.payload).toBe('Ошибка логина');
  });
});

describe('updateUser', () => {
  it('updateUser - pending', async () => {
    const action = { type: updateUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });
  it('updateUser - fulfilled', async () => {
    const mockUser: TAuthResponse = {
      success: true,
      user: {
        email: 'user@tu.l',
        name: '123'
      },
      accessToken:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NGY0ODNmYzJmMzBjMDAxY2IyZDBhNSIsImlhdCI6MTc1MDAyNjMwMywiZXhwIjoxNzUwMDI3NTAzfQ.hJ78q8HZzGhtzixY6lOXw9Z32-GYyVj3rCwLsO-M5Vc',
      refreshToken:
        'e1f7c28d87186b5dd326975a5c6bc1dd54cdca5f485edc3e5bf1f9b6395fe91c7df1506f06de2310'
    };
    (updateUserApi as jest.Mock).mockResolvedValue(mockUser);
    const thunk = updateUser({
      name: '123',
      email: 'user@tu.l',
      password: '<PASSWORD>'
    });
    const result = await thunk(dispatch, getState, {});

    expect(updateUserApi).toHaveBeenCalled();
    expect(result.type).toBe('auth/updateUser/fulfilled');
    expect(result.payload).toEqual(mockUser);
  });
  it('updateUser - rejected ', async () => {
    (updateUserApi as jest.Mock).mockRejectedValue(
      new Error('failed to update user')
    );
    const thunk = updateUser({
      name: '123',
      email: 'user@tu.l',
      password: '<PASSWORD>'
    });
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/updateUser/rejected');
    expect(result.payload).toBe('Ошибка обновления пользователя');
  });
});

describe('logoutUser', () => {
  it('logoutUser - pending', async () => {
    const action = { type: logoutUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });
  it('logoutUser - fulfilled, tokens removed', async () => {
    (logoutApi as jest.Mock).mockResolvedValue({ success: true });
    const removeItemMock = jest.spyOn(Storage.prototype, 'removeItem');
    const thunk = logoutUser();
    await thunk(dispatch, getState, {});
    expect(logoutApi).toHaveBeenCalled();
    expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    expect(removeItemMock).toHaveBeenCalledWith('refreshToken');
  });
  it('logoutUser - rejected ', async () => {
    (logoutApi as jest.Mock).mockRejectedValue(new Error('failed to logout'));
    const thunk = logoutUser();
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/logout/rejected');
    expect(result.payload).toBe('Ошибка разлогина');
  });
});

describe('checkUserAuth', () => {
  it('checkUserAuth - pending', async () => {
    const action = { type: checkUserAuth.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isAuthoriseChecked).toBe(false);
    expect(state.error).toBe(null);
  });
  it('checkUserAuth - fulfilled', async () => {
    const mockRegisterResponse: TUserResponse = {
      success: true,
      user: {
        email: 'user@tu.l',
        name: '123'
      }
    };
    (getUserApi as jest.Mock).mockResolvedValue(mockRegisterResponse);
    const thunk = checkUserAuth();
    const result = await thunk(dispatch, getState, {});
    expect(getUserApi).toHaveBeenCalled();
    expect(result.type).toBe('auth/check/fulfilled');
    expect(result.payload).toEqual(mockRegisterResponse);
  });
  it('checkUserAuth - rejected ', async () => {
    (getUserApi as jest.Mock).mockRejectedValue(
      new Error('failed to authorize')
    );
    const thunk = checkUserAuth();
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/check/rejected');
    expect(result.payload).toBe('Ошибка авторизации');
  });
});
