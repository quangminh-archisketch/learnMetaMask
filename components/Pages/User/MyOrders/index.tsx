import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Head from 'next/head';

import { Spin } from 'antd';

import config from 'config';

import useWindowScroll from 'hooks/useWindowScroll';

import { getNewObjByFields } from 'common/functions';

import orderServices, { BodyGetOrder } from 'services/order-services';

import ResultEmpty from 'components/Fragments/ResultEmpty';
import UserPageTabContent from '../Layout/TabContent';
import HeaderPage from '../Fragments/HeaderPage';
import OrderHeader from './Fragments/OrderHeader';
import OrderProduct from './Fragments/OrderProduct';
import OrderItemFooter from './Fragments/OrderItemFooter';

import { UserPageOrderProps } from 'models/user.models';
import { OrderModel } from 'models/order.model';
import { AppState } from 'store/type';

import * as L from './style';

const pageSize: number = 20;

const MyOrdersPage = (props: UserPageOrderProps) => {
  const pageYOffset = useWindowScroll();
  const orderAction = useSelector((state: AppState) => state.order);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [paramFilter, setParamFilter] = useState<BodyGetOrder>({
    type: '1',
    keySearch: 'null',
    offset: 0,
    limit: pageSize,
  });
  const [data, setData] = useState<{ orders: OrderModel[]; orderTotal: number }>({
    orders: [],
    orderTotal: 0,
  });

  // const typeGetOrder = props.tabName === 'success' ? '1' : 'all';

  //Get Order FirstTime
  useEffect(() => {
    setPage(1);
    setData({ orders: [], orderTotal: 0 });
    setParamFilter({ type: '1', keySearch: 'null', offset: 0, limit: pageSize });
  }, [props.tabName]);

  //Get Order
  useEffect(() => {
    const onGetOrder = async () => {
      try {
        setLoading(true);
        const { data: response } = await orderServices.getOrders(paramFilter);
        if (!response.error)
          setData({
            orders:
              data.orders.length <= paramFilter.offset
                ? data.orders.concat(response.data)
                : response.data,
            orderTotal: response.total,
          });
        setLoading(false);
        setLoadingMore(false);
      } catch (error) {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    onGetOrder();
  }, [paramFilter]);

  //Load more
  useEffect(() => {
    const isScrollBottom =
      (document.getElementById('__next')?.offsetHeight || 0) -
        document.getElementsByTagName('footer')[0].offsetHeight -
        50 <
      pageYOffset + window.innerHeight + 100;

    if (isScrollBottom && data.orderTotal > page * pageSize && !isLoadingMore) {
      setPage(page + 1);
      setParamFilter((p) => ({ ...p, offset: page * pageSize }));
      setLoadingMore(true);
    }
  }, [pageYOffset]);

  useEffect(() => {
    if (orderAction?.type === 'cancel-success') {
      let orderClone = [...data.orders];
      const indexOrder = data.orders.findIndex((i) => i.id === orderAction.order?.id);
      orderClone.splice(indexOrder, 1, { ...data.orders[indexOrder], status: 6 });
      setData((s) => ({ ...s, orders: orderClone }));
    }
  }, [orderAction]);

  return (
    <>
      <Head>
        <title>My Orders | {config.websiteName}</title>
      </Head>

      <UserPageTabContent
        tabs={[
          {
            title: 'ALL',
            url: '/user/my-orders/all',
            active: [null, 'all'].includes(props.tabName),
          },
          // {
          //   title: 'Successful',
          //   url: '/user/my-orders/success',
          //   active: props.tabName === 'success',
          // },
          // { title: 'Refund', active: props.tabName === 'refund' },
        ]}
        isSearch
        isResetSearchChangeTab
        onSearch={(keySearch) => setParamFilter((p) => ({ ...p, keySearch: keySearch || 'null' }))}
        placeholder='Search by Order Number or Product Name'
      />

      <L.OrderTotal_wrapper>
        <HeaderPage title='Total Orders' total={data.orderTotal} />

        {!isLoading && data.orderTotal === 0 && (
          <ResultEmpty description="You don't have any orders yet" />
        )}

        <Spin spinning={isLoading}>
          <L.OrderList style={{ minHeight: isLoading ? 300 : 'inherit' }}>
            {data.orders?.map((order) => (
              <L.OrderItem__Wrapper key={order.id}>
                <OrderHeader
                  date={order.createdAt}
                  order_no={order.order_no}
                  status={order.status}
                />
                {order.items?.map((product) => (
                  <OrderProduct key={product.id} data={product} />
                ))}
                <OrderItemFooter
                  data={getNewObjByFields(order, ['id', 'order_no', 'status', 'amount'])}
                />
              </L.OrderItem__Wrapper>
            ))}
          </L.OrderList>
        </Spin>

        {isLoadingMore && (
          <div className='mt-5 pt-3 text-center'>
            <Spin />
          </div>
        )}
      </L.OrderTotal_wrapper>
    </>
  );
};

export default MyOrdersPage;
