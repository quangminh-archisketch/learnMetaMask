import Head from 'next/head';

import config from 'config';

import Page404 from 'components/Pages/Page404';

const Index = () => {
  return (
    <>
      <Head>
        <title>404 | {config.websiteName}</title>
      </Head>

      <Page404 />
    </>
  );
};

export default Index;
