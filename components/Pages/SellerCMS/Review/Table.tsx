import { memo, useEffect, useState } from 'react';
import moment from 'moment';

import { Avatar, Rate, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { deleteItemInObject, handlerMessage } from 'common/functions';

import sellerServices from 'services/seller-services';

import Icon from 'components/Fragments/Icons';

import { ParamReview, ReviewModel } from 'models/seller.model';

const pageSize = 10;

type Props = {
  total: number;
  page: number;
  data: ReviewModel[] | null;
  filterType: any;
  setModalLists: React.Dispatch<
    React.SetStateAction<{ isShow: boolean; data: ReviewModel | null }>
  >;
  setReviewLists: React.Dispatch<
    React.SetStateAction<{ total: number; data: ReviewModel[] | null }>
  >;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const TableComponent = (props: Props) => {
  const { total, page, data, filterType, setModalLists, setReviewLists, setPage } = props;

  const [loading, setLoading] = useState(true);

  const onFetchReview = async (body?: ParamReview) => {
    setLoading(true);
    try {
      const resp = await sellerServices.getReviews(pageSize, (page - 1) * pageSize, body || null);
      if (!resp.error) {
        setReviewLists({
          total: resp.total,
          data: resp.data,
        });

        setLoading(false);
      }
    } catch (error) {
      handlerMessage('Reviews not found', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Object.getOwnPropertyNames(deleteItemInObject(filterType)).length !== 0) {
      onFetchReview(filterType);
    } else {
      onFetchReview();
    }
  }, [page, filterType]);

  const columns: ColumnsType<ReviewModel> = [
    {
      title: 'Images',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (_, record) => (
        <img
          style={{ width: '60px', height: '60px' }}
          className='img'
          src={record.market_item.image}
          alt=''
        />
      ),
    },
    {
      title: 'Product name',
      dataIndex: 'product_name',
      key: 'product_name',
      className: 'product__title',
      render: (_, record) => record.market_item.title,
    },
    {
      title: 'Review',
      dataIndex: 'rate',
      key: 'rate',
      render: (value) => (
        <div className='rate__column'>
          <Rate value={value} disabled />
        </div>
      ),
    },
    {
      title: 'Review by',
      dataIndex: 'review_by',
      key: 'review_by',
      render: (_, record) => (
        <div className='buyer__column'>
          <Avatar size={24} src={record.market_user?.image}>
            {record.market_user?.name}
          </Avatar>
          {record.market_user?.name || 'Avatar'}
        </div>
      ),
    },
    {
      title: 'Date review',
      dataIndex: 'createdAt',
      key: 'createAt',
      render: (value) => moment(value).format('DD/MM/YYYY'),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      className: 'action-column',
      align: 'center',
      render: (_, record) => (
        <Icon
          onClick={() =>
            setModalLists({
              isShow: true,
              data: {
                ...record,
                content: record.content.replaceAll('\n', '<br/>'),
              },
            })
          }
          iconName='seller-eye'
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      pagination={
        total > pageSize
          ? {
              current: page,
              pageSize,
              total,
              onChange: (page) => setPage(page),
              showSizeChanger: false,
            }
          : false
      }
      loading={loading}
      rowKey='id'
      dataSource={data || []}
      scroll={{ x: data?.length || 0 > 0 ? 992 : undefined }}
    />
  );
};

export default memo(TableComponent);
