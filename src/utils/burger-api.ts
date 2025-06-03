import { setCookie, getCookie, deleteCookie } from './cookie';
import { TIngredient, TOrder, TUser } from './types';

const URL = process.env.BURGER_API_URL;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

export type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      return refreshData;
    });

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit = {}
): Promise<T> => {
  const rToken = localStorage.getItem('refreshToken');

  if (!rToken) {
    throw new Error('No refreshToken found.');
  }

  const ensureAccessToken = async () => {
    const aToken = getCookie('accessToken');
    if (!aToken) {
      try {
        const refData = await refreshToken();
        setAccessTokenHeader(refData.accessToken);
      } catch {
        clearTokens();
        throw new Error('Failed to refresh access token.');
      }
    }
  };

  const setAccessTokenHeader = (token: string) => {
    if (!options.headers) options.headers = {};
    (options.headers as Record<string, string>).authorization = token;
  };

  const clearTokens = () => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  };

  await ensureAccessToken();

  const makeRequest = async (): Promise<Response> => fetch(url, options);

  let res = await makeRequest();

  if (res.status === 401 || res.status === 403) {
    try {
      const refData = await refreshToken();
      setAccessTokenHeader(refData.accessToken);
      res = await makeRequest();
    } catch {
      clearTokens();
      throw new Error('Token refresh failed');
    }
  }

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }

  return res.json();
};

export type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

export type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

export const getIngredientsApi = (): Promise<TIngredientsResponse> =>
  fetch(`${URL}/ingredients`)
    .then((res) => checkResponse<TIngredientsResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const getFeedsApi = () =>
  fetch(`${URL}/orders/all`)
    .then((res) => checkResponse<TFeedsResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const getOrdersApi = async (): Promise<TFeedsResponse> => {
  try {
    return await fetchWithRefresh<TFeedsResponse>(`${URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken') ?? ''
      }
    });
  } catch (error) {
    throw error;
  }
};

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export const orderBurgerApi = async (
  ingredients: string[]
): Promise<TNewOrderResponse['order']> => {
  try {
    const res = await fetchWithRefresh<TNewOrderResponse>(`${URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken') ?? ''
      },
      body: JSON.stringify({ ingredients })
    });
    return res.order;
  } catch (error) {
    throw error;
  }
};

export type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

export const getOrderByNumberApi = (number: number) =>
  fetch(`${URL}/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse<TOrderResponse>(res));

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

export type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData) =>
  fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData) =>
  fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const forgotPasswordApi = (data: { email: string }) =>
  fetch(`${URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const resetPasswordApi = (data: { password: string; token: string }) =>
  fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = async (): Promise<TUserResponse> => {
  try {
    return await fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
      headers: {
        authorization: getCookie('accessToken') ?? '',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    throw error;
  }
};
export const updateUserApi = async (
  user: Partial<TRegisterData>
): Promise<TUserResponse> => {
  try {
    return await fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken')
      } as HeadersInit,
      body: JSON.stringify(user)
    });
  } catch (error) {
    throw error;
  }
};

export const logoutApi = () =>
  fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((res) => checkResponse<TServerResponse<{}>>(res));
