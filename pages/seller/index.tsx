import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import LoadingPage from 'components/Fragments/LoadingPage';

import { PageProps } from 'models/page.models';

const Index = (props: PageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (props.auth?.token) router.replace('/seller/dashboard');
    else router.replace('/login');
  }, []);

  return <LoadingPage />;
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  return { props: { auth } };
};

export default withLayout(Index);
