import { GetServerSideProps } from 'next';
import Head from 'next/head';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';
import config from 'config';
import commonServices from 'services/common-services';
import homepageServices from 'services/homepage-services';

import Market from 'components/Pages/Market';

import { PageProps } from 'models/page.models';

type Props = PageProps & {
  data: any;
};

const Home = (props: Props) => {
  const imageMeta: string = props.seo?.image || config.urlRoot + '/static/thumbnail.jpg';

  return (
    <>
      <Head>
        <title>
          {props.seo?.title} | {config.websiteName}
        </title>
        <meta name='description' content={props.seo?.descriptions} />

        {/* Facebook Open Graph */}
        <meta property='og:title' content={props.seo?.title} />
        <meta property='og:description' content={props.seo?.descriptions} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={config.urlRoot} />
        <meta property='og:image' content={imageMeta} />
        <meta property='keywords' content={props.seo?.keywords} />

        {/* Twitter */}
        <meta property='twitter:card' content='VRStyler_Homepage' />
        <meta property='twitter:site' content={config.urlRoot} />
        <meta property='twitter:title' content={props.seo?.title} />
        <meta property='twitter:description' content={props.seo?.descriptions} />
        <meta property='twitter:image' content={imageMeta} />

        <link rel='image_src' href={imageMeta} />
        <link rel='canonical' href={config.urlRoot} />
      </Head>

      <Market data={props.data} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  let props: any = {};

  const data = await Promise.all([
    commonServices.seoPage('index'),
    homepageServices.getData(),
    checkAuth((content.req ? content.req.headers.cookie : window.document.cookie) || ''),
  ]);

  props.seo = data[0].data ? data[0].data : {};
  props.data = data[1].data;
  const auth = data[2] || null;

  return { props: { auth, ...props } };
};

export default withLayout(Home);
