import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';
import config from 'config';
import userServices from 'services/user-services';

import LoadingPage from 'components/Fragments/LoadingPage';
import NotVerify from 'components/Pages/verify/NotVerify';
import SentVerifySucceeded from 'components/Pages/verify/SentVerifySucceeded';
import VerifySucceeded from 'components/Pages/verify/VerifySucceeded';
import VerifyError from 'components/Pages/verify/VerifyError';

import { PageProps } from 'models/page.models';

const Index = (props: PageProps) => {
  const router = useRouter();

  const [isChecking, setChecking] = useState<boolean>(true);
  const [status, setStatus] = useState<'not_verify' | 'verified' | 'sent_mail' | 'error'>();

  useEffect(() => {
    onCheckVerify();
  }, []);

  const onCheckVerify = () => {
    if (!props.auth?.token)
      router.push(
        `/login${
          router.query.email && router.query.token
            ? '?redirect=' + router.asPath.replaceAll('&', '__and__')
            : ''
        }`
      );
    else if (props.auth.user?.status) setStatus('verified');
    else if (router.query.token && router.query.email && router.query.token) onConfirmRegister();
    else setStatus('not_verify');
  };

  const onConfirmRegister = async () => {
    try {
      const { error } = await userServices.confirmRegister({
        email: typeof router.query.email === 'string' ? router.query.email : '',
        token:
          typeof router.query.token === 'string' ? router.query.token.replace(/\s+/g, '+') : '',
      });
      setStatus(error ? 'error' : 'verified');

      setChecking(false);
    } catch (error) {
      setChecking(false);
      setStatus('error');
    }
  };

  if (isChecking && !status) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Verify Account | {config.websiteName}</title>
      </Head>

      {status === 'not_verify' && <NotVerify onSuccess={() => setStatus('sent_mail')} />}
      {status === 'sent_mail' && (
        <SentVerifySucceeded customerEmail={props.auth?.user?.email || ''} />
      )}
      {status === 'verified' && <VerifySucceeded />}
      {status === 'error' && <VerifyError onReVerify={() => setStatus('not_verify')} />}
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
