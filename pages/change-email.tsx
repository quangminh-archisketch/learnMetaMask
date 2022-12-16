import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import styled from 'styled-components';
import { message } from 'antd';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import config from 'config';

import userServices from 'services/user-services';

import LoadingPage from 'components/Fragments/LoadingPage';

import { PageProps } from 'models/page.models';

import { Container } from 'styles/__styles';

const Index = (props: PageProps) => {
  const router = useRouter();

  const [isChecking, setChecking] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (props.auth?.token) {
      if (router.query.email && router.query.token && typeof router.query.token === 'string')
        onConfirmChangeEmail(router.query.token.replace(/\s+/g, '+'));
      else setError(true);
    } else router.push(`/login?redirect=${router.asPath.replaceAll('&', '__and__')}`);
  }, []);

  const onConfirmChangeEmail = async (token: string) => {
    try {
      const { error } = await userServices.confirmChangeEmail(token);
      if (!error) {
        message.success('Your email address has been changed');
        router.push(props.auth?.user?.nickname ? `/user/settings/email` : '/login');
      }
    } catch (error) {
      setChecking(false);
      setError(true);
    }
  };

  if (isChecking) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Confirm Change Email | {config.websiteName}</title>
      </Head>

      {!isChecking && error && (
        <LinkError__Wrapper>
          <Container>
            <p>
              The link is incorrect or has expired.{' '}
              {props.auth?.user?.nickname && (
                <>
                  If you want to change your email address, please click{' '}
                  <Link href={`/user/${props.auth?.user?.nickname}/settings/email`}>here</Link>.
                </>
              )}
            </p>
          </Container>
        </LinkError__Wrapper>
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

export default withLayout(Index, { footer: { show: false } });

//Style
const LinkError__Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
`;
