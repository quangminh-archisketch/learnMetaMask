import React from 'react';
import moment from 'moment';

import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { formatNumber } from 'common/functions';

import * as L from './style';

interface DataType {
  key: string;
  image: string;
  productName: string;
  status: string;
  saleDate: Date;
  price: number;
  earnings: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    width: 80,
    render: (_, record) => (
      <>
        <img style={{ width: '60px', height: '60px' }} className='img' src={record.image} alt='' />
      </>
    ),
  },
  {
    title: 'Product name',
    dataIndex: 'productName',
    className: 'product__title',
    key: 'productName',
    sorter: (a, b) => a.productName.localeCompare(b.productName),
    showSorterTooltip: false,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      {
        text: 'Original price',
        value: '1',
      },
      {
        text: 'Coupon',
        value: '3',
      },
      {
        text: 'Discount',
        value: '2',
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    render: (_, record) => {
      return (
        <>
          {record.status === '1' && <Tag className='status status-1'>Original price</Tag>}
          {record.status === '2' && <Tag className='status status-2'>Discount</Tag>}
          {record.status === '3' && <Tag className='status status-3'>Coupon</Tag>}
        </>
      );
    },
  },
  {
    title: 'Sale Date',
    dataIndex: 'saleDate',
    key: 'saleDate',
    sorter: (a, b) => moment(a.saleDate).unix() - moment(b.saleDate).unix(),
    showSorterTooltip: false,
    render: (value) => value.toLocaleDateString('en-US'),
  },
  {
    title: 'Price',
    key: 'price',
    dataIndex: 'price',
    sorter: (a, b) => (a.price > b.price ? 1 : -1),
    showSorterTooltip: false,
    render: (value) => formatNumber(value, '$'),
  },
  {
    title: 'Earnings',
    dataIndex: 'earnings',
    key: 'earnings',
    sorter: (a, b) => (a.earnings > b.earnings ? 1 : -1),
    showSorterTooltip: false,
    render: (value) => formatNumber(value, '$'),
  },
];

const data: DataType[] = [
  {
    key: '1',
    image: 'https://picsum.photos/200/300',
    productName: 'Name 1',
    status: '1',
    saleDate: new Date('03/08/1980'),
    price: 1,
    earnings: 1,
  },
  {
    key: '2',
    image: 'https://picsum.photos/200/300',
    productName: 'Name 2',
    status: '2',
    saleDate: new Date('04/08/1980'),
    price: 2,
    earnings: 1,
  },
  {
    key: '3',
    image: 'https://picsum.photos/200/300',
    productName: 'Name 3',
    status: '3',
    saleDate: new Date('03/02/1980'),
    price: 5,
    earnings: 1,
  },
];

const SalesComponent: React.FC = () => (
  <L.Sales_wrapper>
    <Table className='table__sales' columns={columns} dataSource={data} scroll={{ x: 992 }} />
  </L.Sales_wrapper>
);

export default SalesComponent;
