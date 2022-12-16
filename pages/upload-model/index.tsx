import { useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';
import categoryServices from 'services/category-services';
import licenseServices from 'services/license-services';

import UploadModel from 'components/Pages/UploadModel';

import { AuthModel, PageProps } from 'models/page.models';
import { CategoryModel } from 'models/category.models';
import { License } from 'models/license.models';

type Props = PageProps & {
  category: CategoryModel[];
  license: License[];
};

const Index = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!props.auth?.token) router.replace('/login?redirect=' + router.asPath);
    if (!props.auth?.user?.is_seller) router.back();
  }, [props.auth]);

  if (!props.auth?.token || !props.auth?.user?.is_seller) return <main />;

  return (
    <>
      <Head>
        <title>Upload Model | VRStyler</title>
      </Head>
      <UploadModel category={props.category} license={props.license} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  let props: { auth?: AuthModel; category?: CategoryModel[]; license?: License[] } = {};

  const data = await Promise.all([
    checkAuth((content.req ? content.req.headers.cookie : window.document.cookie) || ''),
    categoryServices.getAllCategory(),
    licenseServices.getList(),
  ]);
  props.auth = data[0];
  props.category = data[1].data;
  props.license = data[2].data;

  return { props };
};

export default withLayout(Index);
