import { GetServerSideProps } from 'next';
import Head from 'next/head';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import config from 'config';

import CartPage from 'components/Pages/Cart';

const Index = () => {
  return (
    <>
      <Head>
        <title>Cart | {config.websiteName}</title>
      </Head>

      <CartPage />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  return { props: { auth } };
};

export default withLayout(Index);
