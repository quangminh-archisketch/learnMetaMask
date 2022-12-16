import Icon from 'components/Fragments/Icons';
import Link from 'next/link';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

const CardItem = () => {
  const fakeData = [
    {
      type: 'cancelled',
      title: 'Canceled order',
      orderId: '#12341',
      subtitle: 'Coins refund from cancelled order',
      time: '12:20 March 13, 2022',
      total: '000.000',
    },
    {
      type: 'paid',
      title: 'Order',
      orderId: '#12341',
      subtitle: 'Coins refund from cancelled order',
      time: '12:20 March 13, 2022',
      total: '000.000',
    },
    {
      type: 'cancelled',
      title: 'Canceled order',
      orderId: '#12341',
      subtitle: 'Coins refund from cancelled order',
      time: '12:20 March 13, 2022',
      total: '000.000',
    },
    {
      type: 'paid',
      title: 'Order',
      orderId: '#12341',
      subtitle: 'Coins refund from cancelled order',
      time: '12:20 March 13, 2022',
      total: '000.000',
    },
  ];
  return (
    <>
      {fakeData.map((item, index) => (
        <CardItem_wrapper key={index} className={item.type}>
          <div className='card__left'>
            {item.type === 'cancelled' && (
              <img
                src='/static/images/my-orders/dollar.png'
                className='my-icon'
                alt=''
                loading='lazy'
              />
            )}
            {item.type === 'paid' && <Icon iconName='order' />}

            <div className='content'>
              <h3>
                {item.title}{' '}
                <span>
                  <Link href='#'>{item.orderId}</Link>
                </span>
              </h3>

              <h2>{item.subtitle}</h2>
              <p>
                <span>Time: </span>
                {item.time}
              </p>
            </div>
          </div>
          <div className='card__right'>
            {item.type === 'cancelled' && '+' + item.total}
            {item.type === 'paid' && '-' + item.total}
          </div>
        </CardItem_wrapper>
      ))}
    </>
  );
};

const CardItem_wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.15rem 4rem;
  margin-top: 2rem;

  .card__left {
    display: flex;
    align-items: center;
    gap: 2rem;

    .my-icon {
      width: 2.6rem;
      height: 2.6rem;
      color: var(--color-main-6);
    }

    .content {
      h3 {
        font-size: 1.4rem;
        color: var(--color-gray-11);
        font-weight: 500;

        a {
          color: var(--color-main-6);
        }
      }

      h2 {
        font-size: 1.2rem;
        color: var(--color-gray-8);
      }

      p {
        font-size: 1.2rem;
        color: var(--color-gray-7);

        span {
          font-weight: 500;
        }
      }
    }
  }

  .card__right {
    font-size: 1.6rem;
    line-height: 2.2rem;
    font-weight: 500;
  }

  &.paid {
    background-color: var(--color-gray-4);

    .card__right {
      color: var(--color-red-6);
    }
  }

  &.cancelled {
    background-color: rgba(230, 244, 245, 0.5);

    .card__right {
      color: #ffc043;
    }
  }

  ${maxMedia.medium} {
    padding: 2.15rem 2rem;
  }
`;

export default CardItem;
