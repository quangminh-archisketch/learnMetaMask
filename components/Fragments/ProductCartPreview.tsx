import { useDispatch } from 'react-redux';
import { RemoveProductCartRedux } from 'store/reducer/cart';

import styled from 'styled-components';

import { RemoveProductCart } from 'lib/utils/checkout';
import { formatNumber, decimalPrecision } from 'common/functions';

import Icon from './Icons';

import { ProductCartModel } from 'models/checkout.models';

import { maxMedia } from 'styles/__media';

const ProductCartPreview = (props: { data: ProductCartModel }) => {
  const { data } = props;

  const dispatch = useDispatch();

  const onRemoveCart = async () => {
    const { error } = await RemoveProductCart(data.id);
    if (!error) dispatch(RemoveProductCartRedux(data.id));
  };

  return (
    <Wrapper>
      <img src={data.market_item.image} alt='' loading='lazy' />
      <div className='product-info'>
        <h4 className='title text-truncate-line'>{data.market_item.title}</h4>
        <p className='price'>{formatNumber(data.market_item.price, '$')}</p>
        {data.market_item.old_price && (
          <p className='price-discount'>
            {data.market_item.old_price && (
              <span className='discount'>
                -{decimalPrecision((data.market_item.price / data.market_item.old_price) * 100, 2)}%
              </span>
            )}
            <span>{formatNumber(data.market_item.old_price, '$')}</span>
          </p>
        )}
      </div>
      <Icon iconName='close-circle' className='btn-remove' onClick={onRemoveCart} />
    </Wrapper>
  );
};

export default ProductCartPreview;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 30px 10px 20px;
  position: relative;

  & + div {
    background-image: url('/static/images/homepage/cart-preview_product_line-dash.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: top;
  }

  img {
    width: 8.9rem;
    height: 8.9rem;
    border-radius: 5px;

    ${maxMedia.small} {
      width: 81px;
      height: 81px;
    }
  }

  .product-info {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .title {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-caption);

      ${maxMedia.small} {
        -webkit-line-clamp: 2;
      }
    }

    .price {
      font-size: 18px;
      font-weight: 500;
      color: var(--color-gray-8);

      &-discount {
        font-size: 13px;
        line-height: 16px;
        color: var(--color-main-6);
        font-weight: 500;

        span {
          margin-right: 5px;
          font-size: 14px;
          color: var(--color-gray-7);

          &.discount {
            font-weight: 500;
            color: var(--color-primary-500);
          }
        }
      }
    }
  }

  .btn-remove {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;

    cursor: pointer;

    &:hover {
      color: var(--color-red-6);
    }
  }
`;
