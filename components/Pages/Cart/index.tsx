import { useSelector } from 'react-redux';

import Link from 'next/link';

import { Button } from 'antd';

import { AppState } from 'store/type';

import DividerMain from 'components/Fragments/DividerMain';
import CartEmpty from 'components/Fragments/CartEmpty';
import CartProduct from './Product';
import CartTotal from './Total';
import CartSuggest from './Suggest';

import * as SC from './style';
import { Container } from 'styles/__styles';

const CartPage = () => {
  const products = useSelector((state: AppState) => state.cart.products);

  return (
    <SC.Wrapper>
      <Container>
        <SC.Content>
          {products && products.length > 0 ? (
            <>
              <CartProduct products={products} />
              <CartTotal
                subTotal={products.reduce(
                  (total, product) => (total += product.market_item.price),
                  0
                )}
              />
            </>
          ) : (
            <div className='w-100 text-center'>
              <CartEmpty
                size='small'
                button={
                  <Button type='primary'>
                    <Link href='/explore/all'>Go to market</Link>
                  </Button>
                }
              />
            </div>
          )}
        </SC.Content>
        <DividerMain />
      </Container>
      <CartSuggest />
    </SC.Wrapper>
  );
};

export default CartPage;
