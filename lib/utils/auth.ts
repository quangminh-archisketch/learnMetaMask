import { NextRouter } from 'next/router';
import Cookies from 'universal-cookie';

import authServices from 'services/auth-services';

import { AuthModel } from 'models/page.models';

const cookies = new Cookies();

export const setToken = async (token: string, refresh_token: string) => {
  cookies.set('token', token, { path: '/' });
  cookies.set('refresh_token', refresh_token, { path: '/' });
};

export const removeToken = async () => {
  cookies.remove('token', { path: '/' });
  cookies.remove('refresh_token', { path: '/' });
};

export const checkAuth = async (cookie: string) => {
  let auth: AuthModel = {};

  const getToken =
    cookie && typeof cookie === 'string'
      ? cookie.split(';').find((c: string) => c.trim().startsWith('token='))
      : '';
  const token = getToken?.length ? getToken.split('=')[1] : null;
  const getRefresh_token =
    cookie && typeof cookie === 'string'
      ? cookie.split(';').find((c: string) => c.trim().startsWith('refresh_token='))
      : '';
  const refresh_token = getRefresh_token?.length ? getRefresh_token.split('=')[1] : null;

  try {
    if (token && refresh_token) {
      const { error, data } = await authServices.me({ token, refresh_token });

      if (!error) {
        let user = { ...data };
        delete data.token;
        auth = { token: data.token || token, user };
        if (data.token) cookies.set('token', data.token, { path: '/' });
      } else removeToken();
    }
  } catch (error) {
    removeToken();
  }

  return { ...auth };
};

export const onLogout = async (routerNextJs: NextRouter) => {
  try {
    await authServices.logout();
    removeToken();
    routerNextJs.asPath.startsWith('/user') || routerNextJs.asPath.startsWith('/seller')
      ? routerNextJs.push('/')
      : routerNextJs.replace(routerNextJs.asPath);
  } catch (error: any) {
    removeToken();
    location.reload();
  }
};
