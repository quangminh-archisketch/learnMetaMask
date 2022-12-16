import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from 'antd';

import useWindowSize from 'hooks/useWindowSize';

import { changeToSlug } from 'common/functions';

import urlPage from 'constants/url.constant';

import productServices from 'services/product-services';

import ProductCard from 'components/Fragments/ProductCard';
import DividerMain from 'components/Fragments/DividerMain';

import { ProductModel } from 'models/product.model';

import * as L from './style';

type Props = {
  productId: string;
  categories_id: string[];
  categoryName: string;
};

const Suggested = ({ productId, categories_id, categoryName }: Props) => {
  const [screenW] = useWindowSize();

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestLists, setSuggestList] = useState<{ total: number; data: ProductModel[] }>({
    total: 0,
    data: [],
  });

  const pageSize = screenW > 1920 ? 10 : screenW > 1440 ? 8 : 6;

  useEffect(() => {
    screenW && getProductRelated();
  }, [productId, screenW]);

  const getProductRelated = async () => {
    setLoading(true);
    try {
      const { total, data } = await productServices.getProductRelated(
        productId,
        categories_id,
        pageSize
      );
      setSuggestList({ total, data });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (!suggestLists.total) return <></>;

  return (
    <>
      <DividerMain />
      <L.Suggested_wrapper>
        <h3 className='title'>Similar Models</h3>

        <L.Grid_wrapper className='ProductList__Grid'>
          {suggestLists.data?.map((item, index) => (
            <ProductCard className='product__card--item' data={item} key={index} />
          ))}
        </L.Grid_wrapper>

        {suggestLists.total > pageSize && (
          <Button className='btn__load' type='primary' loading={loading}>
            <Link
              href={urlPage.explore.replace(
                '{category}',
                changeToSlug(categoryName) + '--' + categories_id[0]
              )}>
              See All
            </Link>
          </Button>
        )}
      </L.Suggested_wrapper>
    </>
  );
};

export default Suggested;
