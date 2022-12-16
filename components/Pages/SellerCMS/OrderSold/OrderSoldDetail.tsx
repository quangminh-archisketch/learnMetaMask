import { useEffect, useState } from 'react';
import moment from 'moment';

import Head from 'next/head';

import { Skeleton, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { formatNumber, handlerMessage } from 'common/functions';

import sellerServices from 'services/seller-services';

import Icon from 'components/Fragments/Icons';
import HeaderPage from 'components/Pages/User/Fragments/HeaderPage';
import FilterFragments from '../Fragments/Header';

import { MarketItemBought, OrderDetailModel } from 'models/seller.model';

import styled from 'styled-components';

type Props = {
  orderId: string | null;
};

const OrderSoldDetail = (props: Props) => {
  const { orderId } = props;

  const [loading, setLoading] = useState(true);
  const [orderDetail, setOrderDetail] = useState<OrderDetailModel | null>(null);

  useEffect(() => {
    const onFetchOrderDetail = async () => {
      try {
        const resp = await sellerServices.getOrderDetail(orderId as string);

        if (!resp.error) {
          setOrderDetail(resp.data?.market_order);
          setLoading(false);
        }
      } catch (error) {
        handlerMessage('Order detail not found', 'error');
        setLoading(false);
      }
    };
    onFetchOrderDetail();
  }, []);

  const columns: ColumnsType<MarketItemBought> = [
    {
      title: 'Images',
      dataIndex: 'image',
      width: 100,
      render: (value, record) => (
        <img
          className='img'
          style={{ width: '60px', height: '60px' }}
          src={record?.market_item?.image}
          alt=''
        />
      ),
    },
    {
      title: 'Product name',
      dataIndex: 'productName',
      className: 'product__title',
      sorter: (a, b) => a.market_item.title.localeCompare(b.market_item.title),
      showSorterTooltip: false,
      render: (value, record) => record?.market_item?.title,
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
      sorter: (a, b) => a.market_item.price - b.market_item.price,
      showSorterTooltip: false,
      render: (value, record) => formatNumber(record?.market_item?.price, '$'),
    },
  ];

  return (
    <>
      <Head>
        <title>Orders Detail Seller | VRStyler</title>
      </Head>

      <OrderSoldDetail_wrapper>
        <FilterFragments totalText='' />
        <HeaderPage title='Order detail' isBack />

        <div className='table__header'>
          <Icon iconName='order' />
          <p className='order-id'>
            <span>Order Id:</span> #{orderDetail?.order_no}
          </p>
          <p>
            <span>Date:</span> {moment(orderDetail?.createdAt).format('MMMM DD, YYYY')}
          </p>
        </div>

        <Table
          columns={columns}
          loading={loading}
          rowKey='Id'
          dataSource={orderDetail?.market_items_boughts || []}
          scroll={{ x: orderDetail ? 992 : undefined }}
          pagination={false}
        />

        <TotalOrder_wrapper>
          <Skeleton loading={loading}>
            <div className='total__table'>
              <div className='table__item'>
                <h4>Subtotal</h4>
                <p>{formatNumber(orderDetail?.subtotal?.aggregate?.sum?.price || 0, '$')}</p>
              </div>

              <div className='table__item'>
                <h4>Discount</h4>
                <p>{orderDetail?.discount || '-'}</p>
              </div>

              <div className='table__item table__item--coupons'>
                <h4>Coupons</h4>
                <p>
                  {orderDetail?.market_coupon
                    ? orderDetail?.market_coupon?.prefix + '-' + orderDetail?.market_coupon?.code
                    : '-'}
                </p>
              </div>

              <div className='table__item table__item--payment'>
                <h4>Payment methods</h4>
                {orderDetail?.payment_method?.split('|')[1] === 'visa' ? (
                  <p>
                    {orderDetail?.payment_method?.split('|')[1] === 'visa' && (
                      <Icon iconName='visa' />
                    )}{' '}
                    {orderDetail?.payment_method?.split('|')[0] === 'card' &&
                      '****' + orderDetail?.payment_method?.split('|')[2]}
                  </p>
                ) : (
                  <p>
                    <span className='title__icon-wrapper'>
                      <Icon iconName='paypal' />
                      Paypal
                    </span>
                    {/* {orderDetail?.payment_method?.split('|')[0] ||
                      '' + '-' + orderDetail?.payment_method?.split('|')[1] ||
                      '' +
                        ' ****' +
                        orderDetail?.payment_method?.split('|')[2].split('@')[0][
                          orderDetail?.payment_method?.split('|')[2].split('@')[0].length - 1
                        ] ||
                      '' + orderDetail?.payment_method?.split('|')[2].split('@')[1] ||
                      ''} */}
                  </p>
                )}

                {/* <p>{<Icon iconName='visa' />} ****4242</p> */}
              </div>

              <div className='table__item table__item--amount'>
                <h4>
                  <img
                    src='/static/images/my-orders/sigma.png'
                    alt=''
                    loading='lazy'
                    style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%' }}
                  />
                  Total amount
                </h4>
                <p>
                  {orderDetail?.subtotal.aggregate.sum.price
                    ? formatNumber(
                        orderDetail?.subtotal.aggregate.sum.price - orderDetail?.discount,
                        '$'
                      )
                    : null}
                </p>
              </div>
            </div>
          </Skeleton>
        </TotalOrder_wrapper>
      </OrderSoldDetail_wrapper>
    </>
  );
};

const OrderSoldDetail_wrapper = styled.div`
  .table__header {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 40px;
    margin-top: 30px;
    background-color: var(--color-primary-100);

    .my-icon {
      width: 22px;
      color: var(--color-primary-700);
    }

    p {
      color: var(--color-gray-9);

      span {
        color: var(--text-title);
        font-weight: 500;
      }
    }
  }

  .ant-table-tbody .ant-table-row:last-child td {
    border-bottom: 0;
  }
`;

const TotalOrder_wrapper = styled.div`
  min-width: 372px;
  width: fit-content;
  margin-left: auto;
  margin-top: 30px;

  .total__table {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .table__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    &:not(:last-child) {
      padding-bottom: 1.4rem;
      border-bottom: 1px solid var(--color-gray-4);
    }

    h4,
    p {
      font-size: 16px;
      line-height: 1;
      color: var(--color-gray-9);
    }

    h4 {
      color: var(--color-gray-11);
      white-space: nowrap;
    }

    &--coupons {
      p {
        font-size: 14px;
        color: #4d4d4d;
        letter-spacing: 0.77px;
      }
    }

    &--amount {
      h4 {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      p {
        font-size: 18px;
        font-weight: 500;
        color: #f43d4f;
      }
    }

    &--payment {
      p {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .my-icon.visa svg {
        width: 43px;
        color: #1a2adf;
      }

      .my-icon.paypal svg {
        width: 22px;
        color: #1a2adf;
      }

      .title__icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        background-color: #f7f7f7;
        padding: 5px;
        border-radius: 4px;
      }
    }
  }
`;

export default OrderSoldDetail;
