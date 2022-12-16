import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import withLayout from 'lib/withLayout';
import HomePage from 'components/Pages/Home';

const Home = () => {
  return (
    <>
      <Head>
        <title>Movie Web</title>
      </Head>
      <HomePage />
    </>
  );
};

export default withLayout(Home);
