import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Checkbox, Collapse, Input, Radio, Space } from 'antd';

import useDebounce from 'hooks/useDebounce';
import useWindowSize from 'hooks/useWindowSize';
import useWindowScroll from 'hooks/useWindowScroll';

import { onCheckedFilterCheckMulti } from 'lib/utils/exploreFunctions';

import { changeToSlug } from 'common/functions';

import * as FilterConstant from 'constants/explore.constant';

import Icon from 'components/Fragments/Icons';

import { CategoryModel } from 'models/category.models';
import { ExploreType } from 'models/explore.model';
import { ProductModel } from 'models/product.model';
import { License } from 'models/license.models';

import * as SC from './style';

type Props = {
  exploreType: ExploreType;
  categories?: CategoryModel[];
  license?: License[];
  products?: ProductModel[];
  handelReset?: () => void;
};

const ExploreFilterPanel = (props: Props) => {
  const router = useRouter();
  const screen = useWindowSize();
  const pageYOffset = useWindowScroll();

  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(0);
  const [keywords, setKeywords] = useState<string>(
    router.query.s?.toString()?.replaceAll('+', ' ') || ''
  );

  const debouncedKeywords = useDebounce<string>(keywords, 500);

  const screenH = screen[1];

  useEffect(() => {
    const header = document.getElementsByTagName('header')[0];
    const footer = document.getElementsByTagName('footer')[0];
    const category = document.getElementById('explore-category-banner');

    const headerHeight = header.clientHeight;
    const categoryHeight = category?.clientHeight || 0;
    const heightAdditional = pageYOffset < categoryHeight ? pageYOffset : categoryHeight;
    const heightEliminate =
      pageYOffset + screenH >= footer.offsetTop ? pageYOffset + screenH + 50 - footer.offsetTop : 0;

    setHeight(screenH - headerHeight - categoryHeight + heightAdditional - heightEliminate);
  }, [screenH, pageYOffset, props.products]);

  useEffect(() => {
    setKeywords(router.query.s?.toString() || '');
  }, [router.query.s]);

  useEffect(() => {
    handelSelectFilter('search', debouncedKeywords);
  }, [debouncedKeywords]);

  const handelSelectFilter = (key: string, value: string) => {
    let query = { ...router.query };

    delete query['category'];

    if (isFirst) setIsFirst(false);
    else delete query['page'];

    let categoryFilter: string = router.query.category?.toString() || 'all';

    switch (key) {
      case 'category':
        if (value !== 'all') {
          categoryFilter =
            changeToSlug(props.categories?.find((c) => c.id === value)?.title || '') + '--' + value;
        } else {
          categoryFilter = 'all';
        }
        break;

      case 'price':
        if ((value === 'free' && !query['free']) || (value !== 'free' && query['free']))
          delete query['licenses'];

        delete query['min'];
        delete query['max'];
        delete query['free'];

        if (value === 'free') query['free'] = '1';
        else if (value !== 'all') {
          const priceRange: [number, number] = [1, 500];
          const price: [number, number] = [
            Number(value.split('-')[0]),
            Number(value.split('-')[1]),
          ];
          if (price[0] && price[0] !== priceRange[0]) query.min = price[0].toString();
          if (price[1] && price[1] !== priceRange[1]) query.max = price[1].toString();
        }

        break;

      case 'other':
        if (query[value]) delete query[value];
        else query[value] = '1';

        break;

      case 'sort':
        if (value === 'relevance') delete query['sort'];
        else query['sort'] = value;

        break;

      case 'search':
        if (value.trim()) query.s = value.trim();
        else delete query['s'];

        break;

      default:
        break;
    }
    const pathname = '/' + router.asPath.split('?')[0].split('/')[1] + '/' + categoryFilter;

    router.push({ pathname, query }, undefined, { shallow: true });
  };

  return (
    <SC.Explore__FilterPanel className='hide-scrollbar' height={height}>
      <SC.Explore__FilterPanel__Item>
        <Input
          placeholder='Search model'
          prefix={<Icon iconName='search' />}
          bordered={false}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          onPressEnter={(e) => handelSelectFilter('search', e.target.value)}
        />
      </SC.Explore__FilterPanel__Item>

      <Collapse expandIconPosition='end' bordered={false} defaultActiveKey={['category', 'price']}>
        {/* Category */}
        <Collapse.Panel header='Category' key='category'>
          <Radio.Group
            value={router.query.category?.toString().split('--')[1] || 'all'}
            onChange={(e) => handelSelectFilter('category', e.target.value)}>
            <Space direction='vertical'>
              <Radio value='all'>All Category</Radio>
              {props.categories?.map((cate) => {
                return (
                  <Radio key={cate.id} value={cate.id}>
                    {cate.title}
                  </Radio>
                );
              })}
            </Space>
          </Radio.Group>
        </Collapse.Panel>

        {/* Price */}
        {props.exploreType !== 'free-models' && (
          <Collapse.Panel header='Price' key='price' className='--price'>
            <Radio.Group
              value={
                router.query.free
                  ? 'free'
                  : !router.query.min && !router.query.max
                  ? 'all'
                  : (router.query.min || 1) + '-' + (router.query.max || '')
              }
              onChange={(e) => handelSelectFilter('price', e.target.value)}>
              <Space direction='vertical'>
                {props.exploreType === 'explore' && <Radio value='free'>Free</Radio>}
                <Radio value='all'>All</Radio>
                <Radio value='1-50'>$1 to $50</Radio>
                <Radio value='50-150'>$50 to $150</Radio>
                <Radio value='150-350'>$150 to $350</Radio>
                <Radio value='350-'>$350+</Radio>
              </Space>
            </Radio.Group>
          </Collapse.Panel>
        )}

        {/* Formats */}
        <Collapse.Panel header='Formats' key='formats'>
          <Space direction='vertical'>
            {FilterConstant.filterFormats.map((i) => {
              return (
                <Checkbox
                  key={i.key}
                  value={i.key}
                  checked={router.query.formats?.includes(i.key)}
                  onChange={() =>
                    onCheckedFilterCheckMulti(router, 'formats', i.key, props.exploreType)
                  }>
                  {i.title}
                </Checkbox>
              );
            })}
          </Space>
        </Collapse.Panel>

        {/* License */}
        {props.license && (
          <Collapse.Panel header='License' key='licenses'>
            <Space direction='vertical'>
              {props.license
                .filter((i) => (router.query.free ? i.is_free : !i.is_free))
                .map((i) => {
                  return (
                    <Checkbox
                      key={i.id}
                      value={i.id}
                      checked={router.query.licenses?.toString().includes(i.id)}
                      onChange={() =>
                        onCheckedFilterCheckMulti(
                          router,
                          'licenses',
                          `${changeToSlug(i.title)}--${i.id}`,
                          props.exploreType
                        )
                      }>
                      {i.title}
                    </Checkbox>
                  );
                })}
            </Space>
          </Collapse.Panel>
        )}

        {/* Other */}
        <Collapse.Panel header='Other' key='other'>
          <Space direction='vertical'>
            {FilterConstant.filterOther.map((i) => {
              return (
                <Checkbox
                  key={i.key}
                  value={i.key}
                  checked={typeof router.query[i.key] !== 'undefined'}
                  onChange={() => handelSelectFilter('other', i.key)}>
                  {i.title}
                </Checkbox>
              );
            })}
          </Space>
        </Collapse.Panel>

        {/* Sort by */}
        <Collapse.Panel header='Sort by' key='sort'>
          <Radio.Group
            value={router.query.sort || 'relevance'}
            onChange={(e) => handelSelectFilter('sort', e.target.value)}>
            <Space direction='vertical'>
              {FilterConstant.filterSort.map((i) => {
                return (
                  <Radio key={i.key} value={i.key}>
                    {i.title}
                  </Radio>
                );
              })}
            </Space>
          </Radio.Group>
        </Collapse.Panel>
      </Collapse>

      {screen[0] > 991 && (
        <Button
          className='explore-filter-panel-btn-reset'
          onClick={() => Object.keys(router.query)[0] && props.handelReset && props.handelReset()}>
          Reset
        </Button>
      )}
    </SC.Explore__FilterPanel>
  );
};

export default ExploreFilterPanel;
