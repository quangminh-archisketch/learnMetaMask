import { GetServerSideProps } from 'next';

import Head from 'next/head';
import { useRouter } from 'next/router';

import config from 'config';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import blogServices from 'services/blog-services';

import BlogDetailComponent from 'components/Pages/BlogDetail';

import { AuthModel, PageProps } from 'models/page.models';
import { BlogModel } from 'models/blog.models';

type Props = PageProps & {
  data: BlogModel;
};

const Index = (props: Props) => {
  const { data } = props;
  const router = useRouter();

  if (!data) return <main />;

  const imageMeta: string = data.image || config.urlRoot + '/static/thumbnail.jpg';

  return (
    <>
      <Head>
        <title>
          {data.title} - Blog | {config.websiteName}
        </title>

        <meta name='description' content={data.seo_description || data.sumary} />

        {/* Facebook Open Graph */}
        <meta property='og:title' content={data.seo_title || data.title} />
        <meta property='og:description' content={data.seo_description || data.sumary} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={config.urlRoot + router.asPath} />
        <meta property='og:image' content={imageMeta} />

        {/* Twitter */}
        <meta property='twitter:card' content='VRStyler_HelpCenter' />
        <meta property='twitter:site' content={config.urlRoot + router.asPath} />
        <meta property='twitter:title' content={data.seo_title || data.title} />
        <meta property='twitter:description' content={data?.seo_description || data.sumary} />
        <meta property='twitter:image' content={data.image} />

        <link rel='image_src' href={data.image} />
        <link rel='canonical' href={config.urlRoot + router.asPath} />
      </Head>

      <BlogDetailComponent data={data} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  let props: { auth?: AuthModel; data?: BlogModel; blogId?: string } = {};

  props.auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  const blogId: string = content.query.blogId?.toString().split('--')[1] || '';
  await blogServices
    .getDetail(blogId, { headers: { Authorization: '' } })
    .then((res) => (props.data = res.data))
    .catch((err) => console.log(err));

  return { props };
};

export default withLayout(Index);
