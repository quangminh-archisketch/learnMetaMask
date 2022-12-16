import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { checkAuth } from 'lib/utils/auth';
import withLayout from 'lib/withLayout';

import { handlerMessage } from 'common/functions';

import sellerServices from 'services/seller-services';

import WithdrawComponent from 'components/Pages/Withdraw';

import { PageProps } from 'models/page.models';

const Index = (props: PageProps) => {
  const router = useRouter();
  const [minWithdraw, setMinWithdraw] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!props.auth?.token) {
      router.push(`/login?redirect=${router.asPath}`);
    }
  }, []);

  useEffect(() => {
    const fetchMinWithDraw = async () => {
      setLoading(true);
      try {
        const resp = await sellerServices.getMinWithdraw();
        if (!resp.error) {
          setMinWithdraw(+resp.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(true);
        router.push('/seller/withdraw');
        handlerMessage('Not found your withdraw amount', 'error');
      }
    };
    if (props.auth?.token) {
      fetchMinWithDraw();
    }
  }, []);

  if (!props.auth?.token) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Withdraw | VRStyler</title>
      </Head>

      <WithdrawComponent
        minWithdraw={minWithdraw}
        loading={loading}
        maxWithdraw={props.auth?.user?.market_seller_wallet?.avalible || 0}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  return { props: { auth } };
};

export default withLayout(Index, { header: { show: false }, footer: { show: false } });
