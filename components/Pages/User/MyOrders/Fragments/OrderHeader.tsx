import Icon from 'components/Fragments/Icons';

import moment from 'moment';
import styled from 'styled-components';

import { OrderStatus } from 'constants/order.constant';
import { OrderStatusType } from 'models/order.model';

import { maxMedia } from 'styles/__media';

type Props = {
  status: OrderStatusType;
  date: string;
  order_no: string;
};

const OrderHeader = (props: Props) => {
  return (
    <OrderHeader__Wrapper className='order--header' type={props.status}>
      <div className='OrderHeader__Left'>
        <Icon iconName='order' />
        <div className='OrderHeader__Info'>
          <p>
            <span>Date:</span> {moment(props.date).format('MMMM DD, YYYY')}
          </p>
          <p className='order-code'>
            <span>Order Code:</span> {props.order_no}
          </p>
        </div>
      </div>
      <p className='OrderHeader__Right'>{OrderStatus[props.status]}</p>
    </OrderHeader__Wrapper>
  );
};

export default OrderHeader;

const OrderHeader__Wrapper = styled.div<{ type: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 6px 40px;
  background-color: ${(props) => {
    switch (props.type) {
      case 1:
        return 'var(--order-success-background)';
      case 2:
        return 'var(--color-primary-rgb-700, 20%)';
      case 3:
        return 'var(--color-primary-rgb-700, 20%)';
      case 4:
        return 'var(--order-new-background)';
      case 5:
        return 'var(--order-fail-background)';
      case 6:
        return 'var(--order-cancel-background)';
    }
  }};

  .OrderHeader__Left {
    display: flex;
    align-items: center;
    gap: 2rem;

    .OrderHeader__Info {
      font-size: 12px;
      color: var(--color-gray-9);

      .order-code {
        color: var(--color-primary-700);
      }
      span {
        color: var(--color-gray-11);
        font-weight: 500;
      }
    }

    .my-icon {
      display: flex;
      align-items: center;
      line-height: initial;
      font-size: initial;

      &.order {
        color: var(--color-primary-700);
      }
    }

    svg {
      width: 22px;
      fill: var(--color-main-6);
    }
  }

  .OrderHeader__Right {
    font-size: 14px;
    line-height: 1.4;
    color: ${(props) => {
      switch (props.type) {
        case 1:
          return 'var(--order-success-color)';
        case 2:
          return 'var(--color-primary-rgb-700, 20%)';
        case 3:
          return 'var(--color-primary-rgb-700, 20%)';
        case 4:
          return 'var(--order-new-color)';
        case 5:
          return 'var(--order-fail-color)';
        case 6:
          return 'var(--order-cancel-color)';
      }
    }};
  }

  ${maxMedia.medium} {
    padding: 6px 20px;

    .box {
      &__left {
        gap: 10px;
      }
    }
  }
`;
