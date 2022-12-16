import { GetServerSideProps } from 'next';

import Head from 'next/head';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import config from 'config';

import ForgotPwPage from 'components/Pages/ForgotPassword';

const Home = () => {
  return (
    <>
      <Head>
        <title>Forgot Password | {config.websiteName}</title>
      </Head>

      <ForgotPwPage />
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
