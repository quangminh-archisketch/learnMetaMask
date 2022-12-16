import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import axios from 'axios';
import { Button, Result } from 'antd';

import config from 'config';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import apiConstant from 'api/api-constants';

import commonServices from 'services/common-services';

import ProductDetail from 'components/Pages/ProductDetail';

import { ProductModel } from 'models/product.model';
import { ProductText } from 'constants/product.constant';

type Props = {
  seo: any;
  data: ProductModel;
};

const Index = (props: Props) => {
  const { data, seo } = props;

  const router = useRouter();

  const title = data ? seo?.title.replace(/{{name}}/g, data?.title) : seo?.title;
  const descriptions = seo?.descriptions.replace(/{{name}}/g, data?.title);
  const keywords = seo?.keywords.replace(/{{name}}/g, data?.title);
  const thumbnail = data?.image || seo?.image || config.urlRoot + '/static/thumbnail.jpg';

  return (
    <>
      <Head>
        <title>{(title || ProductText.notFound.title) + ' | ' + config.websiteName}</title>

        <meta name='description' content={data?.seo_description || descriptions} />

        {/* Facebook Open Graph */}
        <meta property='og:title' content={data?.seo_title || title} />
        <meta property='og:description' content={data?.seo_description || descriptions} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={config.urlRoot + router.asPath} />
        <meta property='og:image' content={thumbnail} />
        <meta property='keywords' content={keywords} />

        {/* Twitter */}
        <meta property='twitter:card' content={`VRStyler_Product_${title}`} />
        <meta property='twitter:site' content={config.urlRoot + router.asPath} />
        <meta property='twitter:title' content={data?.seo_title || title} />
        <meta property='twitter:description' content={data?.seo_description || descriptions} />
        <meta property='twitter:image' content={thumbnail} />

        <link rel='image_src' href={thumbnail} />
        <link rel='canonical' href={config.urlRoot + router.asPath} />
      </Head>

      {data ? (
        <ProductDetail data={data} />
      ) : (
        <Result
          status='404'
          title='Oops!'
          subTitle={ProductText.notFound.caption}
          extra={
            <Button type='primary'>
              <Link href='/'>Back Home</Link>
            </Button>
          }
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let props: any = {};

  const cookie = context.req ? context.req.headers.cookie : window.document.cookie;
  props.auth = await checkAuth(cookie || '');

  try {
    const productId: any =
      context.query.productId?.toString().split('--')[1] || context.query.productId?.toString();
    const data = await Promise.all([
      commonServices.seoPage('product'),
      axios.get(`${apiConstant.products}/${productId}`, {
        headers: { Authorization: 'Bearer ' + context.req.cookies.token },
      }),
    ]);
    props.seo = data[0].data || null;
    props.data = data[1]?.data?.data || null;
  } catch (error) {}

  return { props };
};

export default withLayout(Index);
