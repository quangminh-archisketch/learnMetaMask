import { useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import config from 'config';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import urlPage from 'constants/url.constant';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(urlPage.saleOff.replace('{category}', 'all'));
  }, []);

  return (
    <Head>
      <title>Sale Off 50% | {config.websiteName}</title>
    </Head>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  return { props: { auth } };
};

export default withLayout(Index);
