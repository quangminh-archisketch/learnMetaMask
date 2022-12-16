import React, { memo, useEffect, useState } from 'react';
import moment from 'moment';

import Link from 'next/link';

import { Avatar, Badge, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { formatNumber, handlerMessage } from 'common/functions';

import sellerServices from 'services/seller-services';

import { OrderModel } from 'models/seller.model';

const pageSize = 10;

type Props = {
  total: number;
  page: number;
  data: OrderModel[] | [];
  filterType: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOrders: React.Dispatch<
    React.SetStateAction<{
      data: OrderModel[] | null;
      total: number;
    }>
  >;
};

const TableComponent = (props: Props) => {
  const { setOrders, data, total, filterType, setPage, page } = props;

  const [loading, setLoading] = useState<boolean>(true);

  const onFetchAllOrder = async (body?: any) => {
    setLoading(true);
    try {
      const resp = await sellerServices.getAllOrder(pageSize, (page - 1) * pageSize, body || null);
      if (!resp.error) {
        setLoading(false);
        setOrders({
          data: resp.data,
          total: resp.total,
        });
      }
    } catch (error) {
      handlerMessage('Order not found', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filterType.started) {
      onFetchAllOrder(filterType);
    }
  }, [filterType, page]);

  const columns: ColumnsType<OrderModel> = [
    {
      title: 'Order ID',
      dataIndex: 'order_no',
      render: (value, record) => (
        <Link href={`/seller/orders/${record.id}`}>
          <a className='order__column' title={`#${value}`}>
            #{value}
          </a>
        </Link>
      ),
    },
    {
      title: 'Sale date',
      dataIndex: 'createdAt',
      render: (value) => (
        <div className='sale__date__column'>
          <p>{moment(value).format('DD/MM/YYYY,h:mm a').split(',')[0]}</p>
          <p>{moment(value).format('DD/MM/YYYY,h:mm a').split(',')[1]}</p>
        </div>
      ),
    },
    {
      title: 'Total payment',
      dataIndex: 'totalPayment',
      render: (value, record) =>
        formatNumber(record?.market_items_boughts_aggregate?.aggregate?.sum?.price || 0, '$'),
    },
    {
      title: 'Coupon code',
      dataIndex: 'couponCode',
      render: (value, record) => record.market_coupon?.code || '-',
    },
    {
      title: 'Total earning',
      dataIndex: 'totalEarning',
      render: (value, record) =>
        formatNumber(record?.market_items_boughts_aggregate?.aggregate?.sum?.price || 0, '$'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (value, record) => record.market_items_boughts_aggregate?.aggregate?.count || 0,
    },
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      render: (value, record) => (
        <div className='buyer__column'>
          <Avatar size={24} src={record.market_user?.image}>
            {record.market_user?.name}
          </Avatar>
          {record.market_user?.name}
        </div>
      ),
    },
    {
      title: 'Order status',
      dataIndex: 'orderStatus',
      render: (value, record) =>
        record.market_items_boughts_aggregate?.nodes[0]?.is_checked ? (
          <div className=''>
            <Badge dot status='success' />
            Checked
          </div>
        ) : (
          <div className=''>
            <Badge dot status='error' />
            Unchecked
          </div>
        ),
    },
  ];

  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={data}
      rowKey='id'
      pagination={
        total > pageSize
          ? {
              pageSize,
              current: page,
              total,
              onChange: (page) => setPage(page),
              showSizeChanger: false,
            }
          : false
      }
      scroll={{ x: data?.length > 0 ? 1100 : undefined }}
    />
  );
};

export default memo(TableComponent);
