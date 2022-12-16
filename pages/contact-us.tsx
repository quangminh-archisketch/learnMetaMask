import { GetServerSideProps } from 'next';
import Head from 'next/head';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import config from 'config';

import ContactUs from 'components/Pages/ContactUs';

const Index = () => {
  return (
    <>
      <Head>
        <title>Contact Us | {config.websiteName}</title>
      </Head>

      <ContactUs />
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
