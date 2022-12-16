import { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { handlerMessage } from 'common/functions';

import sellerServices from 'services/seller-services';

import FilterFragments from '../Fragments/Header';
import Action from './Action';
import TableComponent from './Table';

import { MyWithdrawType, TypeFilter, WithdrawModel } from 'models/seller.model';

import * as L from './style';

type Props = {
  myWithdraws: MyWithdrawType;
};

const WithdrawComponent = (props: Props) => {
  const { myWithdraws } = props;

  const router = useRouter();

  const [isView, setIsView] = useState<boolean>(false);
  const [dataView, setDataView] = useState<WithdrawModel | {}>({});

  const [filterType, setFilterType] = useState<{
    status?: number;
    started: boolean;
  }>({ started: false });
  const [page, setPage] = useState(1);

  const [withdrawLists, setWithdrawLists] = useState<{
    total: number;
    data: WithdrawModel[] | null;
  }>({
    total: 0,
    data: null,
  });

  useEffect(() => {
    const idWithdraw: string | string[] | undefined = router.query?.id;
    if (idWithdraw) {
      onFetchWithdrawDetail(idWithdraw as string);
    }
    setFilterType({
      status: router.query.status ? Number(router.query.status) : undefined,
      started: true,
    });
  }, []);

  const filterLists = [
    {
      placeholder: 'Sort by',
      values: [
        {
          value: 0,
          label: 'ALL',
        },
        {
          value: 1,
          label: 'Success',
        },
        {
          value: 2,
          label: 'Unsuccessful',
        },
        {
          value: 3,
          label: 'Wait for confirmation',
        },
      ],
      data: filterType.status,
      type: 'status',
    },
  ];

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
        [type]: value,
      }));
    }
    if (router.query.status) {
      router.replace({ pathname: '/seller/withdraw' }, undefined, { shallow: true });
    }
  };

  const onFetchWithdrawDetail = async (id: string) => {
    try {
      const resp = await sellerServices.getWithdrawDetail(id);

      if (!resp.error) {
        setDataView(resp.data[0]);
        setIsView(true);
      }
    } catch (error) {
      handlerMessage('Not found withdraw detail', 'error');
    }
  };

  return (
    <>
      <Head>
        <title>Withdraw Seller | VRStyler</title>
      </Head>

      <L.WithdrawMoney>
        <FilterFragments
          uploadName='Withdraw money'
          totalNum={withdrawLists.total || 0}
          totalName='withdraw'
          isFilterDate
          filterLists={filterLists}
          isLine
          onFilter={onFilter}
          myWithdraws={myWithdraws}
        />

        <TableComponent
          onFilter={onFilter}
          total={withdrawLists.total}
          page={page}
          filterType={filterType}
          setFilterType={setFilterType}
          data={withdrawLists.data || []}
          setWithdrawLists={setWithdrawLists}
          setPage={setPage}
          setDataView={setDataView}
          setIsView={setIsView}
        />

        <Action isView={isView} setIsView={setIsView} data={dataView} />
      </L.WithdrawMoney>
    </>
  );
};

export default WithdrawComponent;
