import { useEffect, useState } from 'react';
import Head from 'next/head';

import { Spin } from 'antd';

import useWindowScroll from 'hooks/useWindowScroll';

import assetsServices, { BodyGetModel } from 'services/assets-services';

import config from 'config';

import ResultEmpty from 'components/Fragments/ResultEmpty';
import UserPageTabContent from '../Layout/TabContent';
import FilterModel from './Fragments/FilterModel';
import HeaderPage from '../Fragments/HeaderPage';
import ModelItem from './Fragments/ModelItem';

import { UserPageMyModelsProps } from 'models/user.models';
import { AssetModel } from 'models/asset.models';

import * as L from './style';

const pageSize = 30;

const MyModels = (props: UserPageMyModelsProps) => {
  const [models, setModels] = useState<{ list: AssetModel[]; total: number }>({
    list: [],
    total: 0,
  });
  const [keySearch, setKeySearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingMore, setLoadingMore] = useState<boolean>(false);
  const [paramFilter, setParamFilter] = useState<BodyGetModel>({
    type: 'all',
    keywords: '',
    sort: 'recently',
    offset: 0,
    limit: pageSize,
  });
  const pageYOffset = useWindowScroll();

  // Get models when change Tab
  useEffect(() => {
    setModels({ list: [], total: 0 });
    setParamFilter({
      type: props.tabName || 'all',
      keywords: '',
      sort: 'recently',
      offset: 0,
      limit: pageSize,
    });
  }, [props.tabName]);

  // Check scroll Load more
  useEffect(() => {
    const isScrollBottom =
      (document.getElementById('__next')?.offsetHeight || 0) -
        document.getElementsByTagName('footer')[0].offsetHeight -
        50 <
      pageYOffset + window.innerHeight + 100;

    if (isScrollBottom && models.total > page * pageSize && !isLoadingMore) {
      setPage(page + 1);
      setParamFilter((p) => ({ ...p, offset: page * pageSize, limit: pageSize }));
    }
  }, [pageYOffset]);

  // Get Model
  useEffect(() => {
    const onGetModels = async () => {
      try {
        setLoading(true);
        const { data: response } = await assetsServices.getModel(paramFilter);
        if (!response.error)
          setModels((m) => ({
            ...m,
            list:
              m.list.length <= paramFilter.offset ? m.list.concat(response.data) : response.data,
            total: response.total,
          }));
        setLoading(false);
        setLoadingMore(false);
      } catch (error) {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    onGetModels();
  }, [paramFilter]);

  return (
    <>
      <Head>
        <title>My Models | {config.websiteName}</title>
      </Head>

      <UserPageTabContent
        tabs={[
          {
            title: 'ALL',
            url: '/user/models/all',
            active: [null, 'all'].includes(props.tabName),
          },
          {
            title: 'Downloaded',
            url: '/user/models/downloaded',
            active: props.tabName === 'downloaded',
          },
          {
            title: 'Not Downloaded',
            url: '/user/models/not-downloaded',
            active: props.tabName === 'not-downloaded',
          },
        ]}
        isSearch
        placeholder='Search'
        isResetSearchChangeTab
        onSearch={(keywords) => {
          setKeySearch(keySearch);
          setParamFilter((p) => ({ ...p, offset: 0, keywords }));
        }}
      />

      <L.MyModels_wrapper>
        <L.Header_wrapper>
          <HeaderPage
            title={
              props.tabName === 'downloaded'
                ? 'Models have been downloaded'
                : props.tabName === 'not-downloaded'
                ? 'Models not downloaded yet'
                : 'All your models'
            }
            total={models.total}
            className='model__title'
          />

          <FilterModel
            isResetWhenChangeTab
            onChange={(value) => setParamFilter((p) => ({ ...p, sort: value }))}
          />
        </L.Header_wrapper>

        {models.total === 0 && !isLoading && (
          <ResultEmpty
            description={
              props.tabName === 'downloaded'
                ? 'No models have been downloaded yet!'
                : props.tabName === 'not-downloaded'
                ? 'No models have not been downloaded yet!'
                : 'You have not purchased any products yet!'
            }
          />
        )}

        <Spin spinning={isLoading}>
          <L.MyModels__List style={{ minHeight: isLoading ? '300px' : 'inherit' }}>
            {models.list.map((item) => (
              <ModelItem key={item.id} data={item} />
            ))}
          </L.MyModels__List>
        </Spin>

        {isLoadingMore && (
          <div className='mt-5 pt-3 text-center'>
            <Spin />
          </div>
        )}
      </L.MyModels_wrapper>
    </>
  );
};

export default MyModels;
