import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import { Button, Drawer } from 'antd';

import { formatNumber } from 'common/functions';

import { AppState } from 'store/type';
import { CloseCart } from 'store/reducer/modal';

import Icon from 'components/Fragments/Icons';
import CartEmpty from 'components/Fragments/CartEmpty';
import ProductCartPreview from 'components/Fragments/ProductCartPreview';

import * as SC from './style';

const CartPreview = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: AppState) => state.cart);
  const show = useSelector((state: AppState) => state.modal.cartPreview);

  return (
    <Drawer
      placement='right'
      closable={false}
      width='auto'
      style={{ zIndex: 1001 }}
      bodyStyle={{ padding: '0' }}
      visible={show}
      onClose={() => dispatch(CloseCart())}>
      <SC.CartPreview>
        <SC.Header>
          <h3 className='d-flex align-items-center'>
            Your Cart <span className='Cart__Count'>{cart.products?.length}</span>
          </h3>

          <Icon
            iconName='close'
            className='btn-close--mobile'
            onClick={() => dispatch(CloseCart())}
          />
        </SC.Header>

        <SC.Content>
          <SC.ProductList>
            {cart.products?.map((product) => {
              return <ProductCartPreview key={product.id} data={product} />;
            })}
          </SC.ProductList>

          {!cart.products?.length && (
            <SC.CartEmpty>
              <CartEmpty
                size='small'
                button={
                  <Button type='primary'>
                    <Link href='/explore/all'>Browse store models</Link>
                  </Button>
                }
              />
            </SC.CartEmpty>
          )}
        </SC.Content>

        <SC.Checkout>
          {cart.products?.length ? (
            <>
              <h4 className='d-flex align-items-center'>
                Total
                <span className='d-inline-block ml-auto'>
                  {formatNumber(
                    cart.products.reduce(
                      (total, product) => (total += product.market_item.price),
                      0
                    ),
                    '$'
                  )}
                </span>
              </h4>

              <Button
                type='primary'
                disabled={!cart.products.length}
                onClick={() => dispatch(CloseCart())}>
                <Link href='/cart'>Go to Cart</Link>
              </Button>
            </>
          ) : null}
        </SC.Checkout>
      </SC.CartPreview>
    </Drawer>
  );
};

export default CartPreview;
