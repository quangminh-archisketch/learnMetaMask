import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';

import { useAppDispatch } from 'redux/hooks';
import { getProfileSuccess } from 'redux/reducers/auth';

import { checkPermission, handlerMessage, isStrEmpty, removeCookie } from 'common/functions';
import { tokenList } from 'common/constant';

import { userType } from 'models/auth.model';

import authServices from 'services/auth-services';

import Loading from 'components/fragments/Loading';

type SSRProps = {
  auth: {
    token: string | undefined;
    user: userType;
  };
};

export type withAuthProps = SSRProps & {};

const withAuth = (BaseComponent: React.ComponentType<withAuthProps | undefined | any>) => {
  const App = (props: SSRProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    if (props.auth.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${props.auth.token}`;

    useEffect(() => {
      if (!props.auth.user?.id) {
        removeCookie([tokenList.TOKEN, tokenList.REFRESH_TOKEN]);
        router.push(router.asPath === '/' ? '/login' : `/login?urlBack=${router.asPath}`);
        if (props.auth.token === '') {
          handlerMessage('Login expired, please login again', 'error');
        }
        return;
      }
      dispatch(getProfileSuccess(props.auth.user));
    }, []);

    return !props.auth.user?.id ? <Loading size='large' fullPage /> : <BaseComponent {...props} />;
  };

  App.getInitialProps = async (context: any) => {
    const cookies = new Cookies();
    const getCokie = context.req ? context.req.headers.cookie : window.document.cookie;

    const getToken = !isStrEmpty(getCokie)
      ? getCokie.split(';').find((c: string) => c.trim().startsWith(`${tokenList.TOKEN}=`))
      : '';
    let token = !isStrEmpty(getToken) ? getToken.split('=')[1] : null;

    let decoded: any = null;
    let checkRefreshToken = null;
    let allowAccess = false;

    let auth: { token: string | undefined; user: { id: string; permis: string[] } } = {
      token: token,
      user: { id: '', permis: [''] },
    };

    //Get me
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        decoded = jwt.decode(token);

        const res = await authServices.getProfile(
          decoded ? decoded['https://hasura.io/jwt/claims']['x-hasura-user-id'] : '1'
        );
        if (!res.error) auth.user = res.data;
      } catch (error) {
        auth.token = '';
      }
    }

    // Refresh Token
    if (auth.user.id) {
      try {
        checkRefreshToken = decoded?.exp * 1000 - Date.now() < 30 * 60 * 1000;
        const getRefreshToken = !isStrEmpty(getCokie)
          ? getCokie
              .split(';')
              .find((c: string) => c.trim().startsWith(`${tokenList.REFRESH_TOKEN}=`))
          : '';
        const refresh_token = !isStrEmpty(getRefreshToken) ? getRefreshToken.split('=')[1] : null;

        if (checkRefreshToken && refresh_token) {
          const resReFresh = await authServices.refreshToken({ token, refresh_token });

          if (!resReFresh.error) {
            token = resReFresh.data.token;
            cookies.set(tokenList.TOKEN, resReFresh.data.token, { path: '/' });
          }
        }
      } catch (error) {}
    }

    // Check permission
    if (auth.user?.id) {
      const path = context.pathname;
      const { permis } = auth.user;
      allowAccess = checkPermission(path, permis);
    }

    return { auth, allowAccess };
  };

  return App;
};

export default withAuth;
