import { useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import config from 'config';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import commonServices from 'services/common-services';

import { PageProps } from 'models/page.models';

type Props = PageProps & {
  data: any;
};

const Index = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/explore/all');
  }, []);

  return (
    <Head>
      <title>
        {props.seo?.title} | {config.websiteName}
      </title>

      <meta name='description' content={props.seo?.descriptions} />

      {/* Facebook Open Graph */}
      <meta property='og:title' content={props.seo?.title} />
      <meta property='og:description' content={props.seo?.descriptions} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={config.urlRoot + router.asPath} />
      <meta property='og:image' content={props.seo?.image} />
      <meta property='keywords' content={props.seo?.keywords} />

      {/* Twitter */}
      <meta property='twitter:card' content='VRStyler_Explore' />
      <meta property='twitter:site' content={config.urlRoot + router.asPath} />
      <meta property='twitter:title' content={props.seo?.title} />
      <meta property='twitter:description' content={props.seo?.descriptions} />
      <meta property='twitter:image' content={props.seo?.image} />

      <link rel='image_src' href={props.seo?.image} />
      <link rel='canonical' href={config.urlRoot + router.asPath} />
    </Head>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  let props: any = {};

  const data = await Promise.all([
    commonServices.seoPage('explore'),
    checkAuth((content.req ? content.req.headers.cookie : window.document.cookie) || ''),
  ]);
  props.seo = data[0].data ? data[0].data : '';
  const auth = data[1];

  return { props: { auth, ...props } };
};

export default withLayout(Index);
