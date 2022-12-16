import { useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import config from 'config';

import RegisterPage from 'components/Pages/Register';
import LoadingPage from 'components/Fragments/LoadingPage';

import { PageProps } from 'models/page.models';

const Home = (props: PageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (props.auth?.token) router.push('/');
  }, []);

  if (props.auth?.token) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Register | {config.websiteName}</title>
      </Head>

      <RegisterPage />
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
