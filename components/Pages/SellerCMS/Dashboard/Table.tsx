import { memo, useEffect, useState } from 'react';
import Link from 'next/link';

import moment from 'moment';

import { ColumnsType } from 'antd/es/table';
import { Avatar, Rate, Table } from 'antd';

import { changeToSlug, handlerMessage } from 'common/functions';
import urlPage from 'constants/url.constant';

import sellerServices from 'services/seller-services';

import { ReviewModel } from 'models/seller.model';

import * as L from './style';

const TableComponent = () => {
  const [loading, setLoading] = useState(true);
  const [latestReview, setLatestReview] = useState<ReviewModel[] | null | any>(null);

  useEffect(() => {
    const onFetchLatestReview = async () => {
      try {
        const resp = await sellerServices.getLatestReview(5);

        if (!resp.error) {
          setLatestReview(resp.data.market_reviews);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        handlerMessage('Latest review not found', 'error');
      }
    };
    onFetchLatestReview();
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: 'Images',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (_, record) => (
        <Link
          href={
            urlPage.productDetail.replace(
              '{slug}',
              changeToSlug(record.title) + '--' + record.id
            ) || ''
          }>
          <a>
            <img
              style={{ width: '60px', height: '60px' }}
              className='img'
              src={record.market_item.image}
              alt=''
            />
          </a>
        </Link>
      ),
    },
    {
      title: 'Product name',
      dataIndex: 'productName',
      key: 'productName',
      className: 'product__title',
      render: (_, record) => (
        <Link
          href={
            urlPage.productDetail.replace(
              '{slug}',
              changeToSlug(record.market_item.title) + '--' + record.market_item.id
            ) || ''
          }>
          <a>{record.market_item.title}</a>
        </Link>
      ),
    },
    {
      title: 'Date review',
      dataIndex: 'dataReview',
      className: 'date_review',
      render: (value) => moment(value).format('DD/MM/YYYY'),
    },
    {
      title: 'Review by',
      dataIndex: 'reviewBy',
      key: 'reviewBy',
      render: (_, record) => (
        <div className='reivewby__column'>
          <Avatar src={record.market_user.image} size={40}>
            {record.market_user.name[0]}
          </Avatar>
          {record.market_user.name}
        </div>
      ),
    },
    {
      title: 'Review',
      dataIndex: 'rate',
      render: (value) => <Rate defaultValue={value} disabled={true} />,
    },
  ];

  return (
    <L.Table__wrapper>
      <h3 className='title'>Latest review</h3>

      <Table
        columns={columns}
        className='dashboard'
        loading={loading}
        pagination={false}
        rowKey='id'
        dataSource={latestReview || []}
        scroll={{ x: latestReview?.length > 0 ? 992 : undefined }}
      />
    </L.Table__wrapper>
  );
};

export default memo(TableComponent);
