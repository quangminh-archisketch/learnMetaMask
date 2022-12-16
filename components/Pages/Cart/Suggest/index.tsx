import { useEffect, useState } from 'react';

import { Button } from 'antd';

import useWindowSize from 'hooks/useWindowSize';

import productServices, { BodyFilterProductModel } from 'services/product-services';

import ProductCard from 'components/Fragments/ProductCard';

import { ProductModel } from 'models/product.model';

import { ContainerFreeSize } from 'styles/__styles';
import CartSuggest_Wrapper from './style';

const rowOfPage = 4;

const CartSuggest = () => {
  const [screenW] = useWindowSize();

  const [data, setData] = useState<{ list: ProductModel[]; total: number }>({ list: [], total: 0 });

  const itemOfPage = rowOfPage * (screenW > 1920 ? 5 : screenW > 1440 ? 4 : 3);

  const getProduct = async (page: number) => {
    try {
      let body: BodyFilterProductModel = {
        minPrice: 0,
        maxPrice: 99999,
        format: ['FBX', 'MAX', 'BLEND', 'STL', 'GOZ', 'SPP', 'GLB', 'USDZ', 'GLTF', 'OBJ'],
        sort_by: 'viewed_count',
        sort_type: 'desc',
        offset: (page - 1) * 14,
        limit: itemOfPage,
      };
      const { status, error, data, total } = await productServices.filterProducts(body);

      if (!error && status !== 204)
        setData((d) => ({
          ...d,
          list: JSON.stringify(d.list) !== JSON.stringify(data) ? d.list.concat(data) : d.list,
          total: total,
        }));
      if (status === 204) setData({ list: [], total: 0 });
    } catch (error) {}
  };

  useEffect(() => {
    screenW && getProduct(1);
  }, [screenW]);

  return (
    <CartSuggest_Wrapper>
      <ContainerFreeSize>
        <h4 className='cartSuggest_title'>Suggested Models</h4>

        <div className='cartSuggest_productList ProductList__Grid hide-scrollbar'>
          {data.list?.map((v, i) => {
            // const isBig =
            //   screenW > 991 &&
            //   (i === 8 ||
            //     i === 13 ||
            //     Number.isInteger((i + 1) / 14) ||
            //     Number.isInteger((i + 1 - 9) / 14));

            return <ProductCard key={i} data={v} />;
          })}
        </div>

        {data.list.length < data.total && data.list.length < 42 && (
          <div className='text-center'>
            <Button
              className='cartSuggest_btnLoad'
              type='primary'
              onClick={() => getProduct(data.list.length / 14 + 1)}>
              See More
            </Button>
          </div>
        )}
      </ContainerFreeSize>
    </CartSuggest_Wrapper>
  );
};

export default CartSuggest;
