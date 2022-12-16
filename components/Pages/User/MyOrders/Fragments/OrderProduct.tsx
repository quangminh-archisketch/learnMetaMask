import { formatNumber } from 'common/functions';
import { ProductOrderModel } from 'models/order.model';
import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

const OrderProduct = (props: { data: ProductOrderModel }) => {
  const { data } = props;

  return (
    <OrderProduct__Wrapper key={data.id}>
      <div className='box'>
        <div className='box__left'>
          <img src={data.image || ''} alt='' loading='lazy' />
          <span>{data.title}</span>
        </div>
        <div className='box__right'>
          {data.old_price ? (
            <span className='box__right--old'>{formatNumber(data.old_price || 0, '$')}</span>
          ) : (
            ''
          )}

          <span className='box__right--new'>{formatNumber(data.price, '$')}</span>
        </div>
      </div>
    </OrderProduct__Wrapper>
  );
};

export default OrderProduct;

const OrderProduct__Wrapper = styled.div`
  padding: 20px 40px;
  border-bottom: 1px solid var(--color-gray-4);

  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    span {
      font-size: 14px;
      line-height: 1.2;
      color: var(--color-gray-9);
    }

    &__left {
      display: flex;
      align-items: center;
      gap: 20px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 0.5rem;
      }
    }

    &__right {
      display: flex;
      align-items: center;
      gap: 10px;

      &--old {
        color: var(--color-gray-6) !important;
        text-decoration: line-through;
      }
    }
  }

  ${maxMedia.medium} {
    padding: 15px 20px;

    .box {
      &__left {
        gap: 10px;
      }
    }
  }
`;
