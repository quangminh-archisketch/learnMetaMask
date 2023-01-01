import Head from 'next/head';

import withLayout from 'lib/withLayout';

const Index = () => {
  return (
    <>
      <Head>
        <title>Film</title>
      </Head>
    </>
  );
};

export default withLayout(Index);
