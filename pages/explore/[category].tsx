import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import commonServices from 'services/common-services';
import categoryServices from 'services/category-services';

import HeadSeo from 'components/Fragments/HeadSeo';
import ExplorePage from 'components/Pages/Explore';

import { AuthModel, PageProps, SeoPage } from 'models/page.models';
import { CategoryModel } from 'models/category.models';

type Props = PageProps & {
  category?: CategoryModel[];
  seo?: SeoPage;
  auth?: AuthModel;
};

const Index = (props: Props) => {
  const router = useRouter();

  const categoryId: string = router.query.category?.toString().split('--')[1] || '';
  const category = props.category?.find((i) => i.id === categoryId);
  const preTitle = router.query.sort === 'best-selling' ? 'Best Selling of ' : '';
  const title = preTitle + (category ? category?.title + ' 3D Models' : props.seo?.title);

  return (
    <>
      <HeadSeo
        title={title}
        descriptions={props.seo?.descriptions || ''}
        keywords={props.seo?.keywords}
        twitter_card={`VRStyler_Explore${category?.title ? '_' + category.title : ''}`}
      />

      <ExplorePage exploreType='explore' />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  let props: { category?: CategoryModel[]; seo?: SeoPage; auth?: AuthModel } = {};

  await categoryServices
    .getAllCategory()
    .then((res) => (props.category = res.data))
    .catch((err) => console.error(err));
  await commonServices
    .seoPage('explore')
    .then((res) => (props.seo = res.data))
    .catch((err) => console.error(err));
  props.auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  return { props };
};

export default withLayout(Index, { header: { isSearch: false } });
