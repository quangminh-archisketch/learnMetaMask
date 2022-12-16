import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';

import moment from 'moment';
import FilterFragments from '../Fragments/Header';
import TableComponent from './Table';

import { OrderModel, TypeFilter } from 'models/seller.model';

import * as L from './style';

const OrderSoldComponent = () => {
  const [orders, setOrders] = useState<{
    data: OrderModel[] | null;
    total: number;
  }>({
    data: null,
    total: 0,
  });
  const [filterType, setFilterType] = useState<{
    start_date?: string;
    end_date?: string;
    started: boolean;
  }>({ started: false });

  const [page, setPage] = useState(1);
  const router = useRouter();

  const filterLists = [
    {
      placeholder: 'Order status',
      values: [
        {
          value: null,
          label: 'ALL',
        },
        {
          value: false,
          label: 'Unchecked',
        },
        {
          value: true,
          label: 'Checked',
        },
      ],
      type: 'order_status',
    },
  ];

  useEffect(() => {
    setFilterType({
      start_date: router.query.start_date ? router.query.start_date.toString() : '',
      end_date: router.query.end_date ? router.query.end_date.toString() : '',
      started: true,
    });
  }, []);

  const onFilter = ({ type, value }: { type: TypeFilter; value: any }) => {
    setPage(1);
    if (type === 'date') {
      setFilterType((prevState) => ({
        ...prevState,
        start_date: value && value[0]?._d,
        end_date: value && value[1]?._d,
      }));
    } else {
      setFilterType((prevState) => ({
        ...prevState,
        [type]: typeof value === 'string' ? value.trim() : value,
      }));
    }
    if (router.query.start_date && router.query.end_date) {
      router.replace({ pathname: '/seller/orders' }, undefined, { shallow: true });
    }
  };

  return (
    <>
      <Head>
        <title>Orders Seller | VRStyler</title>
      </Head>

      <L.ProductInteraction>
        <FilterFragments
          totalNum={orders.total || 0}
          totalName='orders'
          isFilterDate
          dataRangePicker={
            router.query.start_date && router.query.end_date
              ? [moment(router.query.start_date), moment(router.query.end_date)]
              : undefined
          }
          isLine
          filterLists={filterLists}
          onFilter={onFilter}
        />

        <TableComponent
          total={orders.total}
          page={page}
          data={orders.data || []}
          filterType={filterType}
          setPage={setPage}
          setOrders={setOrders}
        />
      </L.ProductInteraction>
    </>
  );
};

export default OrderSoldComponent;
