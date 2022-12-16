import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Button, Drawer, Pagination } from 'antd';

import useWindowSize from 'hooks/useWindowSize';
import productServices from 'services/product-services';
import licenseServices from 'services/license-services';
import { AppState } from 'store/type';

import ResultEmpty from 'components/Fragments/ResultEmpty';
import CategoryExplore from './Fragments/Category';
import ExploreFilterPanel from './FilterPanel';
// import FlashDealComponent from 'components/Fragments/FlashDeal';
import ExploreResult from './Result';
import ProductSkeleton from './Fragments/Skeleton';

import { ExploreType } from 'models/explore.model';
import { ProductModel } from 'models/product.model';
import { License } from 'models/license.models';

import * as SC from './style';
import { ContainerFreeSize } from 'styles/__styles';

const rowOfPage = 7;

const ExplorePage = (props: { exploreType: ExploreType }) => {
  const { exploreType = 'explore' } = props;

  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const categories = useSelector((state: AppState) => state.web.categories);

  const [width] = useWindowSize();

  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [license, setLicense] = useState<License[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [filtering, setFiltering] = useState<boolean>(false);
  const [queryUrl, setQueryUrl] = useState<string>('');
  const [products, setProduct] = useState<{ data: ProductModel[]; total: number }>({
    data: [],
    total: 0,
  });

  // const itemOfPage = rowOfPage * (width > 1920 ? 6 : width > 1440 ? 5 : 4);
  const itemOfPage = rowOfPage * (width > 1920 ? 5 : width > 1440 ? 4 : 3);

  // get data initial
  useEffect(() => {
    const fetchLicense = async () => {
      await licenseServices
        .getList()
        .then((res) => setLicense(res.data))
        .catch((err) => console.error(err));
    };

    fetchLicense();
  }, []);

  useEffect(() => {
    if (queryUrl) onFilterProduct();
  }, [queryUrl]);

  useEffect(() => {
    if (JSON.stringify(router.query) !== queryUrl) setQueryUrl(JSON.stringify({ ...router.query }));
  }, [router.query]);

  //Filter Product
  const onFilterProduct = async () => {
    setFiltering(true);
    const filter: any = { ...router.query };
    try {
      let params: any = {
        saleoff: exploreType === 'sale-off',
        minPrice: exploreType === 'free-models' || filter.free ? 0 : 1,
        maxPrice: exploreType === 'free-models' || filter.free ? 0 : 99999999,
        is_pbr: filter.pbr === '1',
        is_animated: filter.animated === '1',
        is_rigged: filter.rigged === '1',
        sort_by:
          filter.sort === 'best-selling'
            ? 'bought_count'
            : filter.sort === 'newest'
            ? 'createdAt'
            : ['lower-price', 'higher-price'].includes(filter.sort)
            ? 'price'
            : 'viewed_count',
        sort_type: filter.sort === 'lower-price' ? 'asc' : 'desc',
        offset: (Number(filter.page || 1) - 1) * itemOfPage,
        limit: itemOfPage,
      };

      if (filter.s) {
        params.keyword = filter.s;
        // Remove special characters
        params.keyword = params.keyword.replace(/[!@#$%^&*/\-/\_/\(/\)]/g, ' ');
        // Convert multi space to one space
        params.keyword = params.keyword.replace(/[\s]/gi, ' ');
        // Convert + on url to space
        params.keyword = params.keyword.replace(/\+/g, ' ');
        // Remove 2 leading spaces
        params.keyword = params.keyword.replace(/\s+/g, ' ').trim();
        // Convert to array
        params.keyword = params.keyword.split(' ');
      }

      if (filter.category && filter.category !== 'all')
        params.category = [filter.category.split('--')[1]];
      if (filter.min && exploreType !== 'free-models') params.minPrice = Number(filter.min);
      if (filter.max && exploreType !== 'free-models') params.maxPrice = Number(filter.max);
      if (filter.formats)
        params.format =
          typeof filter.formats === 'string'
            ? [filter.formats.toUpperCase()]
            : filter.formats.map((i: string) => i.toUpperCase());
      if (filter.licenses)
        params.license_ids =
          typeof filter.licenses === 'string'
            ? [filter.licenses.split('--')[1]]
            : filter.licenses.map((i: string) => i.split('--')[1]);

      const { error, data, total } = await productServices.filterProducts(params);
      if (!error) {
        setProduct((p) => ({ ...p, data, total: total || 0 }));
      }

      setFiltering(false);
      loading && setLoading(false);
    } catch (error) {
      setLoading(false);
      setFiltering(false);

      console.error(error);
    }
  };

  const handelChangePage = (page: number) => {
    if ((!router.query.page && page !== 1) || Number(router.query.page || 1) !== page) {
      let query = { ...router.query };
      delete query['category'];

      if (page === 1) delete query['page'];
      else query['page'] = page.toString();

      const pathname = router.asPath.split('?')[0];

      router.push({ pathname, query }, undefined, { shallow: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handelReset = () => {
    const pathname = '/' + router.asPath.split('?')[0].split('/')[1] + '/all';
    router.push({ pathname }, undefined, { shallow: true });
    if (openPanel) setOpenPanel(false);
  };

  // const chunkArray = (arr: any[], size: number) => {
  //   let newArr: any[] = [];
  //   while (arr.length) {
  //     newArr.push(arr.splice(0, size));
  //   }
  //   return newArr;
  // };

  return (
    <SC.Wrapper ref={wrapperRef}>
      <CategoryExplore
        category={categories?.find(
          (cate) => cate.id === router.query.category?.toString().split('--')[1]
        )}
      />

      <SC.Explore__Layout>
        <ContainerFreeSize className='explore-layout'>
          {width > 991 && (
            <ExploreFilterPanel
              exploreType={exploreType}
              categories={categories}
              license={license}
              products={products.data}
              handelReset={handelReset}
            />
          )}
          <div className='explore-product-list'>
            <ExploreResult products={products.data} isLoading={filtering} />

            {!loading && !filtering && products.total === 0 && (
              <ResultEmpty
                title='0 results found'
                description='Please, modify filters or choose a different category'
              />
            )}

            {(loading || (filtering && products.total === 0)) && (
              <ProductSkeleton length={(itemOfPage / 7) * 3} />
            )}

            {products.total > itemOfPage && (
              <SC.Explore__Pagination>
                <Pagination
                  pageSize={itemOfPage}
                  total={products.total}
                  showSizeChanger={false}
                  current={router.query.page ? Number(router.query.page?.toString()) : 1}
                  onChange={handelChangePage}
                />
              </SC.Explore__Pagination>
            )}
          </div>
        </ContainerFreeSize>
      </SC.Explore__Layout>

      {width <= 991 && (
        <>
          <Drawer
            visible={openPanel}
            title='Filter Panel'
            placement='left'
            width='100vw'
            getContainer={() => wrapperRef.current || document.body}
            onClose={() => setOpenPanel(false)}>
            <ExploreFilterPanel
              exploreType={exploreType}
              categories={categories}
              license={license}
            />
          </Drawer>

          <SC.Explore__ButtonFilter>
            {openPanel && (
              <Button
                className='explore-btn-reset'
                type='text'
                onClick={() => Object.keys(router.query)[0] && handelReset()}>
                Reset
              </Button>
            )}

            <Button
              className='explore-btn-open-close-panel'
              onClick={() => setOpenPanel(!openPanel)}>
              {openPanel ? 'Apply' : 'Filter'}
            </Button>
          </SC.Explore__ButtonFilter>
        </>
      )}

      {/* <ExploreResult products={[...products.data.slice(0, itemOfPage / 2)]} isLoading={loading} /> */}

      {/* {width > 991 && (
        <SC.FlashDeal__Wrapper>
          <FlashDealComponent />
        </SC.FlashDeal__Wrapper>
      )} */}

      {/* {[...chunkArray([...products.data.slice(itemOfPage / 2)], 13)].map((products, index) => {
        return <ExploreResult key={index} products={products} isReverse={(index + 1) % 2 === 1} />;
      })} */}
    </SC.Wrapper>
  );
};

export default ExplorePage;
