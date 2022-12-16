import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import FilterFragments from '../Fragments/Header';
import TableComponent from './Table';

import { ModelsType, TypeFilter } from 'models/seller.model';

import * as L from './style';

const ModelsComponent: React.FC = () => {
  const [sellerLists, setSellerLists] = useState<{ total: number; data: ModelsType[] | null }>({
    data: null,
    total: 0,
  });

  const [filterType, setFilterType] = useState({});

  const [page, setPage] = useState(1);

  const onFilter = ({ type, value }: { type: TypeFilter; value: any }) => {
    setPage(1);
    if (type === 'date') {
      setFilterType((prevState) => ({
        ...prevState,
        start_date: value && value[0]?._d,
        end_date: value && value[1]?._d,
      }));
    } else if (type === 'price') {
      setFilterType((prevState) => ({
        ...prevState,
        sort_type: value,
        sort_by: value && type,
      }));
    } else {
      setFilterType((prevState) => ({
        ...prevState,
        [type]: typeof value === 'string' ? value.trim() : value,
      }));
    }
  };

  const filterLists = [
    {
      placeholder: 'Sort by',
      values: [
        { value: '', label: 'ALL' },
        { value: 'asc_nulls_first', label: 'Low to high price' },
        { value: 'desc_nulls_last', label: 'High to low price' },
      ],
      type: 'price',
    },
    {
      placeholder: 'Product status',
      values: [
        { value: '', label: 'ALL' },
        { value: 5, label: 'Draft' },
        { value: 1, label: 'Publish' },
      ],
      type: 'status',
    },
  ];

  return (
    <>
      <Head>
        <title>Models Seller | VRStyler</title>
      </Head>

      <L.Models_wrapper>
        <FilterFragments
          uploadName={
            <Link href='/upload-model'>
              <a>Upload 3D model</a>
            </Link>
          }
          totalNum={sellerLists.total || 0}
          totalName='models'
          searchType='name'
          placeholderSearch='Search for model name'
          isFilterDate
          isLine
          filterLists={filterLists}
          onFilter={onFilter}
        />

        <TableComponent
          total={sellerLists.total}
          data={sellerLists.data || []}
          setSellerLists={setSellerLists}
          filterType={filterType}
          page={page}
          setPage={setPage}
        />
      </L.Models_wrapper>
    </>
  );
};

export default ModelsComponent;
