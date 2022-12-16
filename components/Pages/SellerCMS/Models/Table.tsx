import { memo, useEffect, useState } from 'react';
import moment from 'moment';

import { useRouter } from 'next/router';

import { message, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { changeToSlug, deleteItemInObject, formatNumber, handlerMessage } from 'common/functions';

import sellerServices from 'services/seller-services';

import Icon from 'components/Fragments/Icons';
import ToolTip from '../Fragments/ToolTip';
import MenuAction from '../Fragments/MenuAction';

import { ModelsType } from 'models/seller.model';

import * as L from './style';
import urlPage from 'constants/url.constant';
import Link from 'next/link';

type Props = {
  total: number;
  data: ModelsType[];
  setSellerLists: any;
  filterType: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const pageSize = 10;

const TableComponent = (props: Props) => {
  const { total, data, setSellerLists, filterType, page, setPage } = props;
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const onFetchSellerProduct = async (body?: any) => {
    setLoading(true);
    try {
      const resp = await sellerServices.getMyModes(
        pageSize,
        (page - 1) * pageSize,
        body ? body : null
      );

      if (!resp.error) {
        setLoading(false);
        setSellerLists({ data: resp.data, total: resp.total });
      }
    } catch (error) {
      setLoading(false);
      handlerMessage('Models seller not found', 'error');
    }
  };

  useEffect(() => {
    if (Object.getOwnPropertyNames(deleteItemInObject(filterType)).length !== 0) {
      onFetchSellerProduct(filterType);
    } else {
      onFetchSellerProduct();
    }
  }, [filterType, page]);

  const onDeleteItem = async (itemId: string) => {
    const onFail = () => {
      setLoading(false);
      message.error('Delete failed, please try again later.');
    };
    await sellerServices
      .deleteProduct(itemId)
      .then((res) => {
        !res.error ? onFetchSellerProduct() : onFail();
      })
      .catch((error) => {
        console.log(error);
        onFail();
      });
  };

  const linkToDetail = (product: ModelsType) => {
    return product.status === 1
      ? urlPage.productDetail.replace('{slug}', changeToSlug(product.title) + '--' + product.id)
      : urlPage.productDraftDetail.replace('{slug}', product.id);
  };

  const columns: ColumnsType<ModelsType> = [
    {
      title: 'Images',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (value, record) => (
        <Link href={linkToDetail(record)}>
          <a>
            <img style={{ width: '60px', height: '60px' }} className='img' src={value} alt='' />
          </a>
        </Link>
      ),
    },
    {
      title: 'Product name',
      dataIndex: 'title',
      key: 'title',
      className: 'product__title',
      render: (value, record) => (
        <Link href={linkToDetail(record)}>
          <a>{value}</a>
        </Link>
      ),
    },
    {
      title: 'Create Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => moment(value).format('DD/MM/YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => {
        return (
          <>
            {value === 1 && <Tag className='status status-2'>Publish</Tag>}
            {value === 5 && <Tag className='status status-1'>Draft</Tag>}
            {value === 7 && <Tag className='status status-3'>Hide</Tag>}
          </>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => (value === 0 ? 'Free' : formatNumber(value, '$')),
    },
    {
      title: (
        <div className='information'>
          <p>Sold</p>
          <ToolTip
            title={
              <>
                <p>The number of products you sold.</p>
                <p>The amount of money you will receive.</p>
              </>
            }
          />
        </div>
      ),
      key: 'sold',
      render: (_, record) => (
        <p className='sold__column'>
          {record.bought_count > 1
            ? `${record.bought_count} (${formatNumber(
                record.summary_sold.aggregate.sum.price,
                '$'
              )})`
            : `${formatNumber(record.summary_sold.aggregate.sum.price, '$')}`}
        </p>
      ),
    },
    {
      title: 'Interaction',
      key: 'interaction',
      render: (_, record) => (
        <L.Reaction_wrapper>
          <ToolTip
            title={
              <>
                {record.like_count > 1 ? record.like_count + ' likes' : record.like_count + ' like'}
              </>
            }>
            <div>
              <Icon iconName='seller-like' />
            </div>
          </ToolTip>

          <ToolTip
            title={
              <>
                {record.viewed_count > 1
                  ? record.viewed_count + ' views'
                  : record.viewed_count + ' view'}
              </>
            }>
            <div>
              <Icon iconName='seller-eye' />
            </div>
          </ToolTip>

          <ToolTip
            title={
              <>
                {record.sumamry_review.aggregate.count > 1
                  ? record.sumamry_review.aggregate.count +
                    ' reviews: ' +
                    record.sumamry_review.aggregate.avg.rate?.toFixed(1) +
                    '/5'
                  : record.sumamry_review.aggregate.count + ' review'}
              </>
            }>
            <div>
              <Icon iconName='seller-star' />
            </div>
          </ToolTip>

          <ToolTip
            title={
              <>
                {record.summary_comment.aggregate.count > 1
                  ? record.summary_comment.aggregate.count + ' comments'
                  : record.summary_comment.aggregate.count + ' comment'}
              </>
            }>
            <div>
              <Icon iconName='seller-message' />
            </div>
          </ToolTip>
        </L.Reaction_wrapper>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_, record) => {
        const allowDelete = !record.summary_sold.aggregate.sum.price;

        return (
          <L.MenuAction_wrapper>
            <MenuAction
              data={record}
              handleView={() => router.push(linkToDetail(record))}
              handleEdit={() => router.push(`/upload-model/${record.id}`)}
              handleDelete={allowDelete ? () => onDeleteItem(record.id) : undefined}
            />
          </L.MenuAction_wrapper>
        );
      },
    },
  ];

  return (
    <Table
      loading={loading}
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
      key='models'
      rowKey='id'
      columns={columns}
      dataSource={data}
      scroll={{ x: data?.length > 0 ? 1100 : undefined }}
    />
  );
};

export default memo(TableComponent);
