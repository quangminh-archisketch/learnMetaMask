import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import withLayout from 'lib/withLayout';

import Notification from 'components/Pages/Notification';
import { checkAuth } from 'lib/utils/auth';
import { PageProps } from 'models/page.models';
import { useEffect } from 'react';

type Props = PageProps & {};

const Index = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!props.auth?.token) router.push('/login?redirect=' + router.asPath);
  }, [props.auth]);

  return (
    <>
      <Head>
        <title>{'Notification'} | VRStyler</title>
      </Head>
      <Notification />
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
