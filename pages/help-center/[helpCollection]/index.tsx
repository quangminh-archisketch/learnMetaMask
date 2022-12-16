import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import config from 'config';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import helpCenterServices from 'services/helpCenter-services';

import HeaderSample from 'components/Layout/HeaderSample';
import FooterSample from 'components/Layout/FooterSample';
import HelpCollection from 'components/Pages/HelpCenterCollection';

import { AuthModel, PageProps } from 'models/page.models';
import { HelpCategory } from 'models/help.models';

type Props = PageProps & {
  helpCollection: HelpCategory;
};

const Index = (props: Props) => {
  const router = useRouter();

  const title = props.helpCollection?.title;
  const descriptions = props.helpCollection?.description;
  const image = props.helpCollection?.icon || config.urlRoot + '/static/thumbnail.jpg';

  return (
    <>
      <Head>
        <title>
          {title} | {config.websiteName} - Help Center
        </title>

        <meta name='description' content={descriptions} />

        {/* Facebook Open Graph */}
        <meta property='og:title' content={title} />
        <meta property='og:description' content={descriptions} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={config.urlRoot + router.asPath} />
        <meta property='og:image' content={image} />

        {/* Twitter */}
        <meta property='twitter:card' content='VRStyler_HelpCenter' />
        <meta property='twitter:site' content={config.urlRoot + router.asPath} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={descriptions} />
        <meta property='twitter:image' content={image} />

        <link rel='image_src' href={image} />
        <link rel='canonical' href={config.urlRoot + router.asPath} />
      </Head>

      <HeaderSample style={{ padding: '18px 0' }} />
      <HelpCollection helpCollection={props.helpCollection} />
      <FooterSample />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  let props: { auth?: AuthModel; helpCollection?: HelpCategory } = {};

  const cookie: string = (content.req ? content.req.headers.cookie : window.document.cookie) || '';
  props.auth = await checkAuth(cookie);

  const collectionId: string =
    content.query.helpCollection && typeof content.query.helpCollection === 'string'
      ? content.query.helpCollection.split('--')[1]
      : '';
  await helpCenterServices
    .getCollectionDetail(collectionId, { headers: { Authorization: '' } })
    .then((res) => (props.helpCollection = res.data))
    .catch((err) => console.error(err));

  return { props };
};

export default withLayout(Index, { header: { show: false }, footer: { show: false } });
