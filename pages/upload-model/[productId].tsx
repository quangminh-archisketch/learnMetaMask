import { useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import axios from 'axios';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';
import apiConstant from 'api/api-constants';
import categoryServices from 'services/category-services';
import licenseServices from 'services/license-services';

import UploadModel from 'components/Pages/UploadModel';

import { AuthModel, PageProps } from 'models/page.models';
import { CategoryModel } from 'models/category.models';
import { ProductModel } from 'models/product.model';
import { License } from 'models/license.models';

type Props = PageProps & {
  category: CategoryModel[];
  license: License[];
  data?: ProductModel;
};

const Index = (props: Props) => {
  const { auth, category, data } = props;
  const router = useRouter();

  useEffect(() => {
    if (!props.auth?.token) router.replace('/login?redirect=' + router.asPath);
    if (!props.auth?.user?.is_seller) router.back();
  }, [props.auth]);

  if (!auth?.token || !auth?.user?.is_seller || !data || data.author_id !== auth.user?.id)
    return <main />;

  return (
    <>
      <Head>
        <title>Upload Model | VRStyler</title>
      </Head>
      <UploadModel type='update' category={category} license={props.license} data={props.data} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let props: {
    auth?: AuthModel;
    category?: CategoryModel[];
    license?: License[];
    data?: ProductModel;
  } = {};

  const auth = await checkAuth(context.req.headers.cookie || '');
  props.auth = auth || null;

  const { data: category } = await categoryServices.getAllCategory();
  props.category = category || null;

  const { data: license } = await licenseServices.getList();
  props.license = license || null;

  await axios
    .get(`${apiConstant.seller}/item/${context.query.productId}`, {
      headers: { Authorization: 'Bearer ' + context.req.cookies.token },
    })
    .then((data: any) => (props.data = data?.data?.data || null))
    .catch((error) => console.log(error));

  return { props };
};

export default withLayout(Index);
