import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Head from 'next/head';

import { Spin } from 'antd';

import config from 'config';

import { getNewObjByFields } from 'common/functions';

import orderServices from 'services/order-services';

import HeaderPage from '../../Fragments/HeaderPage';
import OrderHeader from '../Fragments/OrderHeader';
import OrderProduct from '../Fragments/OrderProduct';
import OrderTotal from './OrderTotal';

import { OrderModel } from 'models/order.model';
import { AppState } from 'store/type';

import * as L from './style';

type Props = {
  orderId: string;
};

const OrderDetail = (props: Props) => {
  const orderAction = useSelector((state: AppState) => state.order);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<OrderModel>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { error, data } = await orderServices.getOrderDetail(props.orderId);
      if (!error) setOrder(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderAction?.type === 'cancel-success' && order) {
      setOrder({
        ...order,
        status: 6,
        payment_note: orderAction.order?.payment_note,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [orderAction]);

  return (
    <>
      <Head>
        <title>
          Order #{order?.order_no} | {config.websiteName}
        </title>
      </Head>
      <L.OrderDetail_wrapper>
        <HeaderPage title='Order detail' isBack />

        {isLoading && (
          <Spin
            style={{ height: 300 }}
            className='d-flex align-items-center justify-content-center'
          />
        )}

        {order && (
          <L.OrderDetail_Content>
            <OrderHeader date={order.createdAt} order_no={order.order_no} status={order.status} />

            {order.items.map((product, index) => (
              <OrderProduct key={index} data={product} />
            ))}

            <OrderTotal
              data={getNewObjByFields(order, [
                'id',
                'order_no',
                'subtotal',
                'discount',
                'amount',
                'market_coupon',
                'payment_method',
                'payment_note',
                'status',
                'paidAt',
                'createdAt',
                'updatedAt',
              ])}
            />
          </L.OrderDetail_Content>
        )}
      </L.OrderDetail_wrapper>
    </>
  );
};

export default OrderDetail;
