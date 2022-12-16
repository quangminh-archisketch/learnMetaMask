import { memo, useEffect, useState } from 'react';
import moment from 'moment';

import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { formatNumber, handlerMessage } from 'common/functions';

import sellerServices from 'services/seller-services';

import Icon from 'components/Fragments/Icons';

import { ParamFilter, WithdrawModel } from 'models/seller.model';

const pageSize = 10;

type Props = {
  total: number;
  data: WithdrawModel[] | [];
  filterType: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setWithdrawLists: React.Dispatch<
    React.SetStateAction<{
      total: number;
      data: WithdrawModel[] | null;
    }>
  >;
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  setDataView: React.Dispatch<React.SetStateAction<WithdrawModel>>;
  onFilter?: any;
  setFilterType: React.Dispatch<React.SetStateAction<any>>;
};

const TableComponent = (props: Props) => {
  const { page, setPage, data, total, setWithdrawLists, filterType, setIsView, setDataView } =
    props;

  const [loading, setLoading] = useState(true);

  const onFetchWithdraw = async (body?: ParamFilter) => {
    setLoading(true);
    try {
      const resp = await sellerServices.getWithdraw(pageSize, (page - 1) * pageSize, body || null);

      if (!resp.error) {
        setWithdrawLists({
          total: resp.total,
          data: resp.data,
        });

        setLoading(false);
      }
    } catch (error) {
      handlerMessage('Withdraw not found', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filterType.started) {
      onFetchWithdraw(filterType);
    }
  }, [filterType, page]);

  const columns: ColumnsType<WithdrawModel> = [
    {
      title: 'Number ID',
      dataIndex: 'order_no',
    },
    {
      title: 'Date create',
      dataIndex: 'createdAt',
      render: (value) => moment(value).format('DD/MM/YYYY'),
    },
    {
      title: 'Account name',
      dataIndex: 'account_name',
    },
    {
      title: 'Card number',
      dataIndex: 'card_number',
    },
    {
      title: 'Swift code',
      dataIndex: 'swift_code',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (value) => formatNumber(value, '$'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => (
        <>
          {value === 1 && (
            <Tag className='status status-1' color='success'>
              Success
            </Tag>
          )}
          {value === 2 && (
            <Tag className='status status-2' color='error'>
              Unsuccessful
            </Tag>
          )}
          {value === 3 && (
            <Tag className='status status-3' color='warning'>
              Wait for confirmation
            </Tag>
          )}
        </>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      className: 'action-column',
      render: (value, record: any) => (
        <Icon
          onClick={() => {
            setIsView(true);
            setDataView(record);
          }}
          iconName='seller-eye'
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
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
      dataSource={data}
      rowKey='id'
      scroll={{ x: data?.length > 0 ? 1100 : undefined }}
    />
  );
};

export default memo(TableComponent);
