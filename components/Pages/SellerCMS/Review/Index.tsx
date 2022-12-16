import { useEffect, useRef, useState } from 'react';

import Head from 'next/head';

import { deleteItemInObject, handlerMessage } from 'common/functions';

import sellerServices from 'services/seller-services';

import FilterFragments from '../Fragments/Header';
import TableComponent from './Table';
import ModalComponent from './Modal';

import { ReviewModel, TypeFilter } from 'models/seller.model';
import { ProductModel } from 'models/product.model';

import * as L from './style';

const pageSize = 10;

const ReviewComponent = () => {
  const [page, setPage] = useState<number>(1);
  const [modalLists, setModalLists] = useState<{ isShow: boolean; data: ReviewModel | null }>({
    isShow: false,
    data: null,
  });
  const [reviewLists, setReviewLists] = useState<{ total: number; data: ReviewModel[] | null }>({
    total: 0,
    data: null,
  });

  const [filterType, setFilterType] = useState({});
  const [pageProduct, setPageProduct] = useState(1);
  const [filterProduct, setFilterProduct] = useState({ name: '' });
  const [loadingLoad, setLoadingLoad] = useState(false);
  const [loadingOption, setLoadingOption] = useState(false);

  const [productLists, setProductLists] = useState<{
    total: number;
    data: { value: string; label: string }[] | null;
  }>({
    total: 0,
    data: null,
  });

  const selectRef = useRef<any>(null);

  const onFilter = ({ type, value }: { type: TypeFilter; value: any }) => {
    setPage(1);
    setProductLists((prevState) => ({
      ...prevState,
      isLoad: false,
    }));
    setPageProduct(1);

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

  const onFetchSellerProduct = async (body?: { name: string }) => {
    setLoadingOption(true);
    try {
      const resp = await sellerServices.getMyModes(pageSize, 0, body || null);

      if (!resp.error) {
        setProductLists((prevState) => ({
          ...prevState,
          total: resp.total,
          data: resp.data?.map((item: ProductModel) => ({ value: item.id, label: item.title })),
        }));
        setLoadingOption(false);
        selectRef?.current?.scrollTo(0, 0);
      }
    } catch (error: any) {
      setLoadingOption(false);
      handlerMessage(error?.message, 'error');
    }
  };

  const onScroll = async (e: any) => {
    if ((productLists.data?.length || 0) >= productLists.total || loadingLoad) return;

    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      setPageProduct((prevState) => prevState + 1);
    }
  };

  const onFetchSellerProductLoad = async (body?: { name: string }) => {
    setLoadingLoad(true);
    try {
      const resp = await sellerServices.getMyModes(
        pageSize,
        (pageProduct - 1) * pageSize,
        body || null
      );
      if (!resp.error && resp.data?.length) {
        setProductLists((prevState) => ({
          total: resp.total,
          data: prevState.data
            ? [
                ...prevState.data,
                ...resp.data?.map((item: ProductModel) => ({ value: item.id, label: item.title })),
              ]
            : resp.data?.map((item: ProductModel) => ({ value: item.id, label: item.title })),
        }));
      }
      setLoadingLoad(false);
    } catch (error) {
      setLoadingLoad(false);
    }
  };

  const onSearch = (value: string) => {
    setFilterProduct({ name: value });
    setPageProduct(1);
  };

  const onClear = () => {
    setFilterProduct({ name: '' });
  };

  useEffect(() => {
    if (pageProduct === 1) return;

    onFetchSellerProductLoad();
  }, [pageProduct]);

  useEffect(() => {
    if (Object.getOwnPropertyNames(deleteItemInObject(filterProduct)).length !== 0) {
      onFetchSellerProduct(filterProduct);
      return;
    }
    onFetchSellerProduct();
  }, [filterProduct]);

  const filterLists = [
    {
      placeholder: 'Filter by',
      values: [
        {
          value: null,
          label: 'ALL',
        },
        {
          value: true,
          label: 'Reply',
        },
        {
          value: false,
          label: 'UnReply',
        },
      ],
      type: 'is_replied',
    },
    {
      placeholder: 'Filter review',
      values: [
        {
          value: null,
          label: 'ALL',
        },
        {
          value: 1,
          label: '1 star',
        },
        {
          value: 2,
          label: '2 stars',
        },
        {
          value: 3,
          label: '3 stars',
        },
        {
          value: 4,
          label: '4 stars',
        },
        {
          value: 5,
          label: '5 stars',
        },
      ],
      type: 'rate',
    },
    {
      placeholder: 'Search your product',
      values: productLists.data || [],
      type: 'item_id',
      total: productLists.total - ((productLists.data && productLists.data?.length) || 0),
      selectType: 'search',
      onScroll,
      onSearch,
      onClear,
      selectRef,
      loadingLoad,
      loadingOption,
    },
  ];

  return (
    <>
      <Head>
        <title>Reviews Seller | VRStyler</title>
      </Head>

      <L.ReviewComponent_wrapper>
        <FilterFragments
          totalNum={reviewLists.total || 0}
          totalName={reviewLists.total > 1 ? 'reviews' : 'review'}
          isFilterDate
          isLine
          placeholderSearch='Search your product'
          filterLists={filterLists}
          onFilter={onFilter}
        />

        <TableComponent
          total={reviewLists.total}
          page={page}
          data={reviewLists.data}
          filterType={filterType}
          setModalLists={setModalLists}
          setReviewLists={setReviewLists}
          setPage={setPage}
        />

        <ModalComponent
          modalLists={modalLists}
          setModalLists={setModalLists}
          setReviewLists={setReviewLists}
        />
      </L.ReviewComponent_wrapper>
    </>
  );
};

export default ReviewComponent;
