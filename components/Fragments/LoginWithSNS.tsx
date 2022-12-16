import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { Button } from 'antd';

import config from 'config';
import authServices from 'services/auth-services';

import Icon from 'components/Fragments/Icons';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingPage from './LoadingPage';

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSuccess: (data: any) => void;
  // eslint-disable-next-line no-unused-vars
  onFailed: (message?: string, status?: number) => void;
};

const LoginWithSNS = (props: Props) => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const oAuthFBResponse = router.asPath.split('#')[1]?.split('&');
    let oAuthFB: any = {};
    oAuthFBResponse?.forEach((i) => (oAuthFB[i.split('=')[0]] = i.split('=')[1]));
    const isFacebook = oAuthFB.state?.includes('sns') && oAuthFB.state?.includes('facebook');

    if (isFacebook && oAuthFB.access_token) {
      setIsLogin(true);
      onLogin('facebook', { accessToken: oAuthFB.access_token });
    }
  }, [router]);

  const onLogin = async (sns: 'google' | 'facebook', response: any) => {
    try {
      if (response.accessToken) {
        const { error, data } = await authServices.oAuth({
          sns: sns,
          access_token: response.accessToken,
        });
        if (!error) props.onSuccess(data);
        else {
          props.onFailed();
          if (sns === 'facebook') {
            setIsLogin(false);
            router.replace(
              router.pathname + (router.query.redirect ? '?redirect=' + router.query.redirect : '')
            );
          }
        }
      }
    } catch (error: any) {
      props.onFailed(error?.data?.message, error?.status);
      setIsLogin(false);
      const dataHeader = JSON.parse(error?.config?.data || '{}');
      if (dataHeader.sns === 'facebook')
        router.replace(
          router.pathname + (router.query.redirect ? '?redirect=' + router.query.redirect : '')
        );
    }
  };

  return (
    <LoginWithSNS_Wrapper>
      <Script
        async
        defer
        crossOrigin='anonymous'
        src='https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v14.0'
        nonce='mEO9B02J'
      />

      {isLogin && <LoadingPage blur />}

      <p className='or_social'>OR</p>

      <div className='login_with'>
        <GoogleLogin
          clientId={config.googleClientId}
          render={(renderProps) => (
            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <Icon iconName='google-color' />
            </Button>
          )}
          onSuccess={(res) => onLogin('google', res)}
          onFailure={(res) =>
            !['idpiframe_initialization_failed', 'popup_closed_by_user'].includes(res.error) &&
            props.onFailed()
          }
        />

        <Button
          onClick={() =>
            (location.href = `https://www.facebook.com/v14.0/dialog/oauth?client_id=577772940724693&response_type=token&scope=email%20public_profile&state={sns=facebook}&redirect_uri=${location.href}`)
          }>
          <Icon iconName='facebook-color' />
        </Button>

        {/* <Button>
          <Icon iconName='twitter-color' />
        </Button> */}
      </div>
    </LoginWithSNS_Wrapper>
  );
};

export default LoginWithSNS;

const LoginWithSNS_Wrapper = styled.div`
  .or_social {
    margin: 1.7rem 0 1.9rem;
    font-size: 14px;
    line-height: 1.57;
    color: var(--color-gray-7);
    text-align: center;
  }

  .login_with {
    display: flex;
    justify-content: center;
    gap: 0.8rem;

    .ant-btn {
      width: 105px;
      height: 56px;

      border: none;
      background-color: var(--color-main-1);

      .my-icon {
        font-size: 26px;
      }
    }
  }
`;
