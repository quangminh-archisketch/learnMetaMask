import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import styled from 'styled-components';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import config from 'config';

import userServices from 'services/user-services';

import ResetPwPage from 'components/Pages/ResetPassword';
import LoadingPage from 'components/Fragments/LoadingPage';

import { Container } from 'styles/__styles';

const Home = () => {
  const router = useRouter();

  const [isChecking, setChecking] = useState<boolean>(true);
  const [error, setError] = useState<'link_error' | 'expired'>();

  useEffect(() => {
    // if (props.auth?.token) router.push('/');
    if (!router.query.email || !router.query.token) setError('link_error');
    if (router.query.email && router.query.token && typeof router.query.token === 'string')
      onCheckToken();
  }, []);

  const onCheckToken = async () => {
    try {
      const token = typeof router.query.token === 'string' ? router.query.token : '';
      const { error } = await userServices.checkTokenResetPw(token.replace(/\s+/g, '+'));
      if (error) setError('expired');
      setChecking(false);
    } catch (error: any) {
      setError('expired');
      setChecking(false);
    }
  };

  if (isChecking && !error) return <LoadingPage />;
  if (error)
    return (
      <LinkError__Wrapper>
        <Container>
          {error === 'link_error' && (
            <p>
              The link is incorrect. If you forgot your password click{' '}
              <Link href='/forgot-password'>here</Link> to reset your password.
            </p>
          )}
          {error === 'expired' && (
            <p>
              The link is out of date or incorrect. Click <Link href='/forgot-password'>here</Link>{' '}
              to reset your password.
            </p>
          )}
        </Container>
      </LinkError__Wrapper>
    );

  return (
    <>
      <Head>
        <title>Reset Password | {config.websiteName}</title>
      </Head>

      {typeof router.query.email === 'string' && typeof router.query.token === 'string' && (
        <ResetPwPage email={router.query.email} token={router.query.token.replace(/\s+/g, '+')} />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  return { props: { auth } };
};

export default withLayout(Home, { footer: { show: false } });

//Style
const LinkError__Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
`;
