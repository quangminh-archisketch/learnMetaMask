import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { Spin } from 'antd';

import config from 'config';

import { checkAuth } from 'lib/utils/auth';
import withLayout from 'lib/withLayout';

import { handlerMessage } from 'common/functions';

import licenseServices from 'services/license-services';

import { AssetModel } from 'models/asset.models';
import { AuthModel } from 'models/page.models';

const LicenseComponent = dynamic(() => import('components/Pages/License'), {
  ssr: false,
});

type Props = {
  data: AssetModel;
  auth?: AuthModel;
};

const Index = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!props.auth?.token) {
      router.push('/login?redirect=' + router.asPath);
      return;
    } else if ((!props.data && !loading) || !props.data) {
      router.push('/user/models');
      handlerMessage('Not found license', 'error');
    }
  }, [props.auth, props.data]);

  useEffect(() => {}, [props.data]);

  if (!props.auth?.token || !props.auth?.user) return null;

  return (
    <>
      <Head>
        <title>License Certificate | {config.websiteName}</title>
      </Head>

      {loading && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            height: '100vh',
          }}>
          <Spin />
        </div>
      )}
      <LicenseComponent data={props.data} loading={loading} setLoading={setLoading} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const licenseId =
    content.query.licenseId?.toString().split('--')[1] || content.query.licenseId?.toString();

  const auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  let data = null;
  try {
    const resp = await licenseServices.download(licenseId || '');

    if (!resp.error) {
      data = resp.data;
    }
  } catch (error) {
    data = null;
  }

  return { props: { auth, data } };
};

export default withLayout(Index, { header: { show: false }, footer: { show: false } });
