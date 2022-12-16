import { formatNumber } from 'common/functions';
import { ProductCartModel } from 'models/checkout.models';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

type Props = {
  products: ProductCartModel[];
};

const CheckoutProduct = (props: Props) => {
  const { products } = props;

  return (
    <Wrapper>
      <div className='checkout-section-header'>
        <h4>Order</h4>
        <div className='checkout-method-commit'>
          {products.length} item{products.length > 1 ? 's' : ''} in cart
        </div>
      </div>
      {products.map((product) => {
        return (
          <div key={product.id} className='checkout-product-item'>
            <img src={product.market_item.image} alt='' />
            <h4>{product.market_item.title}</h4>
            <div>
              {product.market_item.old_price && (
                <span>{formatNumber(product.market_item.old_price, '$')}</span>
              )}
              {formatNumber(product.market_item.price, '$')}
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};
export default CheckoutProduct;

const Wrapper = styled.div`
  .checkout-section-header {
    margin-bottom: 5px;
  }
  .checkout-product-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 0;
    & + .checkout-product-item {
      border-top: var(--border-1px);
    }
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: var(--border-radius-base);
    }
    h4 {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-title);
    }
    div {
      flex: auto;
      text-align: right;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-caption);
      span {
        margin-right: 20px;
        text-decoration: line-through;
        color: var(--color-gray-6);
      }
    }

    ${maxMedia.small} {
      padding: 10px 0;
    }
  }
`;
