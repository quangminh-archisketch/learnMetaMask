import { useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import config from 'config';

import commonServices from 'services/common-services';

import { AuthModel, PageProps, SeoPage } from 'models/page.models';

const Index = (props: PageProps) => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/blog/all');
  }, []);

  const imageMeta: string = props.seo?.image || config.urlRoot + '/static/thumbnail.jpg';

  return (
    <>
      <Head>
        <title>
          {props.seo?.title || 'Blog'} | {config.websiteName}
        </title>

        <meta name='description' content={props.seo?.descriptions} />

        {/* Facebook Open Graph */}
        <meta property='og:title' content={props.seo?.title} />
        <meta property='og:description' content={props.seo?.descriptions} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={config.urlRoot + router.asPath} />
        <meta property='og:image' content={imageMeta} />
        <meta property='keywords' content={props.seo?.keywords} />

        {/* Twitter */}
        <meta property='twitter:card' content='VRStyler_HelpCenter' />
        <meta property='twitter:site' content={config.urlRoot + router.asPath} />
        <meta property='twitter:title' content={props.seo?.title} />
        <meta property='twitter:description' content={props.seo?.descriptions} />
        <meta property='twitter:image' content={imageMeta} />

        <link rel='image_src' href={imageMeta} />
        <link rel='canonical' href={config.urlRoot + router.asPath} />
      </Head>
      <main />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  let props: { auth?: AuthModel; seo?: SeoPage } = {};

  props.auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  await commonServices
    .seoPage('blogs')
    .then((res) => (props.seo = res.data))
    .catch((err) => console.error(err));

  return { props };
};

export default withLayout(Index);
