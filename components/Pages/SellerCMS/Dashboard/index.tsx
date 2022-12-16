import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Skeleton } from 'antd';
import moment from 'moment';

import { formatNumber, handlerMessage } from 'common/functions';

import sellerServices from 'services/seller-services';

import Icon from 'components/Fragments/Icons';
import FilterFragments from '../Fragments/Header';
import ChartComponent from './Chart';
import TableComponent from './Table';

import { MyWithdrawType, TotalAmountType } from 'models/seller.model';

import * as L from './style';

type Props = {
  myWithdraws: MyWithdrawType;
};

const DashboardComponent = (props: Props) => {
  const { myWithdraws } = props;

  const [loading, setLoading] = useState(true);
  const [totalLists, setTotalLists] = useState<TotalAmountType | null>(null);

  useEffect(() => {
    const onFetchTotalAmount = async () => {
      try {
        const resp = await sellerServices.getTotalAmount();

        if (!resp.error) {
          setTotalLists(resp.data);
          setLoading(false);
        }
      } catch (error) {
        handlerMessage('Total amount not found', 'error');
        setLoading(false);
      }
    };
    onFetchTotalAmount();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard Seller | VRStyler</title>
      </Head>

      <L.DashboardComponent_wrapper>
        <Skeleton loading={loading}>
          <FilterFragments
            uploadName='Withdraw money'
            totalText={'Total current amount: '}
            totalNum={formatNumber(totalLists?.total || 0, '$')}
            subTitleNum={formatNumber(totalLists?.total_revenue?.aggregate?.sum?.price || 0, '$')}
            myWithdraws={myWithdraws}
          />

          <L.TotalDate>
            <div className='table_wrapper'>
              <table>
                <tr className='header'>
                  <th>
                    <div>
                      <p style={{ color: '#2f54eb' }}>Available balance</p>
                    </div>
                    <div className='body'> {formatNumber(totalLists?.avalible || 0, '$')}</div>
                  </th>
                  <th>
                    <div>
                      <p style={{ color: '#faad14' }}>Pending balance</p>
                    </div>
                    <div className='body'> {formatNumber(totalLists?.holding || 0, '$')}</div>
                  </th>
                  <th>
                    <div className='link_wrapper'>
                      <p style={{ color: '#fa541c', paddingRight: '10px' }}>Withdrawing request</p>
                      <a className='link'>
                        <Link href={{ pathname: '/seller/withdraw', query: { status: 3 } }}>
                          <Icon iconName='link-dashboard-seller' />
                        </Link>
                      </a>
                    </div>
                    <div className='body'> {formatNumber(totalLists?.request || 0, '$')}</div>
                  </th>
                  <th>
                    <div className='link_wrapper'>
                      <p style={{ color: '#52c41a', paddingRight: '10px' }}>Withdrawn</p>
                      <a className='link'>
                        <Link href={{ pathname: '/seller/withdraw', query: { status: 1 } }}>
                          <Icon iconName='link-dashboard-seller' />
                        </Link>
                      </a>
                    </div>
                    <div className='body'>{formatNumber(totalLists?.withdraw || 0, '$')}</div>
                  </th>
                </tr>
              </table>
            </div>

            <div className='table_wrapper-two'>
              <table className='header_two'>
                <thead>
                  <tr>
                    <th>
                      <div>
                        <p>Today</p>
                        <Link
                          href={{
                            pathname: '/seller/orders',
                            query: {
                              start_date: `${moment().format()}`,
                              end_date: `${moment().format()}`,
                            },
                          }}>
                          <Icon className='link' iconName='link-dashboard-seller' />
                        </Link>
                      </div>
                      <div className='body'>
                        {formatNumber(totalLists?.total_amount_day.aggregate.sum.price || 0, '$')}
                      </div>
                    </th>
                    <th>
                      <div>
                        <p>Current Month</p>
                        <Link
                          href={{
                            pathname: '/seller/orders',
                            query: {
                              start_date: `${moment().startOf('month').format()}`,
                              end_date: `${moment().endOf('month').format()}`,
                            },
                          }}>
                          <Icon className='link' iconName='link-dashboard-seller' />
                        </Link>
                      </div>
                      <div className='body'>
                        {formatNumber(totalLists?.total_amount_month.aggregate.sum.price || 0, '$')}
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </L.TotalDate>
        </Skeleton>

        <div className='chart__box'>
          <ChartComponent />
        </div>

        <TableComponent />
      </L.DashboardComponent_wrapper>
    </>
  );
};

export default DashboardComponent;
