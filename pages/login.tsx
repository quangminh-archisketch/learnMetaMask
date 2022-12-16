import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import withLayout from 'lib/withLayout';
import { checkAuth, removeToken } from 'lib/utils/auth';
import config from 'config';

import LoginPage from 'components/Pages/Login';
import LoadingPage from 'components/Fragments/LoadingPage';

import { PageProps } from 'models/page.models';

const Index = (props: PageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (props.auth?.token) router.push('/');
  }, []);

  if (props.auth?.token) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Login | {config.websiteName}</title>
      </Head>

      <LoginPage />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  if (!auth.token) removeToken();

  return { props: { auth } };
};

export default withLayout(Index, { footer: { show: false } });
