import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button, Spin } from 'antd';

import useWindowSize from 'hooks/useWindowSize';

import urlPage from 'constants/url.constant';

import productServices, { BodyFilterProductModel } from 'services/product-services';

import HeaderSection from '../Fragments/HeaderSection';
import ProductCard from 'components/Fragments/ProductCard';
import ResultEmpty from 'components/Fragments/ResultEmpty';

import { ProductModel } from 'models/product.model';

import { ContainerFreeSize } from 'styles/__styles';
import * as L from './style';

const ProductByTabs = () => {
  const [screenW] = useWindowSize();

  const [tab, setTab] = useState<'newest' | 'popular' | 'best-selling' | 'sale-50'>('newest');
  const [isLoading, setLoading] = useState<boolean>(true);
  const [products, setProduct] = useState<ProductModel[]>();

  useEffect(() => {
    screenW && getProduct();
  }, [tab, screenW]);

  const getProduct = async () => {
    try {
      setLoading(true);
      if (tab === 'sale-50') {
        const { status, error, data } = await productServices.getProductSale50(
          0,
          screenW > 1920 ? 18 : screenW > 1440 ? 15 : 8
        );
        if (!error && status !== 204) setProduct(data);
        if (status === 204) setProduct([]);
      } else {
        let body: BodyFilterProductModel = {
          minPrice: 0,
          maxPrice: 99999,
          format: ['FBX', 'MAX', 'BLEND', 'STL', 'GOZ', 'SPP', 'GLB', 'USDZ', 'GLTF', 'OBJ'],
          sort_by: 'createdAt',
          sort_type: 'desc',
          offset: 0,
          limit: screenW > 1920 ? 18 : screenW > 1440 ? 15 : 8,
        };
        if (tab === 'popular') body.sort_by = 'viewed_count';
        if (tab === 'best-selling') body.sort_by = 'bought_count';
        const { status, error, data } = await productServices.filterProducts(body);

        if (!error && status !== 204) setProduct(data);
        if (status === 204) setProduct([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <L.BestSeller_wrapper>
      <ContainerFreeSize>
        <HeaderSection title='Millions of 3D models for <br/>your work' />

        <L.Tabs_wrapper>
          <ul>
            <li
              className={tab === 'newest' ? '--active' : undefined}
              onClick={() => setTab('newest')}>
              New
            </li>
            <li
              className={tab === 'popular' ? '--active' : undefined}
              onClick={() => setTab('popular')}>
              Popular
            </li>
            <li
              className={tab === 'best-selling' ? '--active' : undefined}
              onClick={() => setTab('best-selling')}>
              Best Selling
            </li>
            <li
              className={tab === 'sale-50' ? '--active' : undefined}
              onClick={() => setTab('sale-50')}>
              Sale Over 50%
            </li>
          </ul>
        </L.Tabs_wrapper>

        <Spin spinning={isLoading}>
          {products && products?.length > 0 ? (
            <div className='product_list_scroll hide-scrollbar'>
              <L.Grid_wrapper
                className='ProductList__Grid'
                itemCount={products?.length <= 4 ? products?.length : 4}>
                {products?.map((item, index) => (
                  <ProductCard key={index} data={item} />
                ))}
              </L.Grid_wrapper>
            </div>
          ) : (
            <ResultEmpty description='No products found' />
          )}
        </Spin>

        {products && products?.length > 0 && (
          <Button type='primary' className='btn__explore'>
            <Link
              href={
                tab === 'sale-50'
                  ? urlPage.saleOff.replace('{category}', 'all')
                  : `/explore/all${tab !== 'popular' ? '?sort=' + tab : ''}`
              }>
              Explore All
            </Link>
          </Button>
        )}
      </ContainerFreeSize>
    </L.BestSeller_wrapper>
  );
};

export default ProductByTabs;
