import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import withLayout from 'lib/withLayout';

import Dashboard from 'components/Pages/Manager';
import { checkAuth } from 'lib/utils/auth';
import { PageProps } from 'models/page.models';
import { useEffect } from 'react';

type Props = PageProps & {};

const Index = (props: Props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{'Manager'} | Manager</title>
      </Head>
      <Dashboard />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  return { props: { auth } };
};

export default Index;
