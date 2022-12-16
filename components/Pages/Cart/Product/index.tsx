import { useDispatch } from 'react-redux';
import { RemoveProductCartRedux } from 'store/reducer/cart';

import { changeToSlug, formatNumber } from 'common/functions';
import { RemoveProductCart } from 'lib/utils/checkout';

import Icon from 'components/Fragments/Icons';

import { ProductCartModel } from 'models/checkout.models';

import * as SC from './style';
import Link from 'next/link';
import urlPage from 'constants/url.constant';

type Props = {
  products: ProductCartModel[];
};

const CartProduct = (props: Props) => {
  const dispatch = useDispatch();

  const onRemoveCart = async (id: string) => {
    const { error } = await RemoveProductCart(id);
    if (!error) dispatch(RemoveProductCartRedux(id));
  };

  return (
    <SC.CartProduct_Wrapper>
      <div className='cart_header'>
        Shopping Cart <span>{props.products.length}</span>
      </div>

      {props.products.map((product) => {
        return (
          <SC.CartProduct_Item key={product.id}>
            <div>
              <img src={product.market_item.image} alt={product.market_item.title} loading='lazy' />
              <h5>
                <Link
                  href={urlPage.productDetail.replace(
                    '{slug}',
                    changeToSlug(product.market_item.title) + '--' + product.market_item.id
                  )}>
                  {product.market_item.title}
                </Link>
              </h5>
            </div>
            <div>
              <p>{formatNumber(product.market_item.price, '$')}</p>
              <Icon iconName='close-circle' onClick={() => onRemoveCart(product.id)} />
            </div>
          </SC.CartProduct_Item>
        );
      })}
    </SC.CartProduct_Wrapper>
  );
};

export default CartProduct;
