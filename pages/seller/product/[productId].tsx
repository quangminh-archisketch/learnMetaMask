import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import axios from 'axios';
import { Button, Result } from 'antd';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import apiConstant from 'api/api-constants';

import ProductDetail from 'components/Pages/ProductDetail';

import { ProductModel } from 'models/product.model';
import { ProductText } from 'constants/product.constant';
import { AuthModel } from 'models/page.models';

type Props = {
  data: ProductModel;
};

const Index = (props: Props) => {
  const { data } = props;

  if (!data)
    return (
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
    );

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <ProductDetail data={data} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let props: { data?: ProductModel; auth?: AuthModel } = {};

  const cookie = context.req ? context.req.headers.cookie : window.document.cookie;
  props.auth = await checkAuth(cookie || '');

  const productId: string = context.query.productId?.toString() || '';

  await axios
    .get(`${apiConstant.seller}/item/${productId}`, {
      headers: { Authorization: 'Bearer ' + context.req.cookies.token },
    })
    .then((res) => (props.data = res.data.data))
    .catch((err) => console.error(err));

  return { props };
};

export default withLayout(Index);
