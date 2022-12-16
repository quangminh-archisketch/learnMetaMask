import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import { Button, Collapse } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import {
  getOptionsFilter,
  onCheckedFilterCheckList,
  onCheckedFilterCheckMulti,
} from 'lib/utils/exploreFunctions';
import { filterFormats, filterOther } from 'constants/explore.constant';
import urlPage from 'constants/url.constant';

import ExplorePriceSlider from './PriceSilder';
import ExploreCheckboxCustom from './CheckboxCustom';

import { ChangeRemMobileToPC, maxMedia } from 'styles/__media';
import { ExploreType } from 'models/explore.model';

const Wrapper = styled.div`
  .ant-collapse {
    border: none;
    background-color: var(--color-white);

    .ant-collapse-item {
      border-color: var(--color-line);

      .ant-collapse-header {
        display: flex;
        align-items: center;

        height: 5rem;
        padding: 0 20px;

        .ant-collapse-header-text {
          width: calc(100% - 2rem);
        }

        .ant-collapse-arrow {
          font-size: 10px;
          right: 20px;
          color: var(--color-icon);
        }
      }

      .ant-collapse-content {
        border-color: var(--color-line);

        .ant-collapse-content-box {
          padding: 1.5rem 20px;
        }
      }
    }
  }

  .priceSider {
    width: 100%;
  }

  .checkbox + .checkbox {
    margin-top: 1.5rem;
  }
`;
const CollapseHeader = styled.div`
  width: 100%;

  font-size: 1.6rem;
  font-weight: 300;
  line-height: 1.13;
  color: var(--color-gray-9);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  span {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-primary-700);
  }

  ${maxMedia.xsmall} {
    font-size: ${ChangeRemMobileToPC('small', 1.5)};
  }
`;
const Reset_Apply = styled.div`
  display: flex;
  gap: 1rem;

  padding: 2rem;

  .ant-btn {
    flex: 1;
    height: 42px;

    font-size: 14px;
    font-weight: 600;

    &.btnReset {
      color: var(--color-red-6);
    }
  }
`;

type Props = {
  exploreType: ExploreType;
  onClose?: () => void;
};

const ExploreMobileFilterGroup = (props: Props) => {
  const router = useRouter();

  const [price, setPrice] = useState<[number, number]>([0, 0]);

  const priceRange: [number, number] = [1, 500];

  const pathnameReset = (
    props.exploreType === 'free-models'
      ? urlPage.freeModels
      : props.exploreType === 'sale-off'
      ? urlPage.saleOff
      : urlPage.explore
  ).replace('{category}', 'all');

  useEffect(() => {
    setPrice([
      Number(router.query.min || priceRange[0]),
      Number(router.query.max || priceRange[1]),
    ]);
  }, [router]);

  const onChecked = (key: 'formats' | 'licenses' | 'other', value: string) => {
    if (key === 'formats' || key === 'licenses')
      onCheckedFilterCheckMulti(router, key, value, props.exploreType);
    else onCheckedFilterCheckList(router, value, props.exploreType);
  };

  const getOptionsFilterByMore = () => {
    let selected: string[] = [];
    filterOther.forEach((i) => {
      if (router.query[i.key]) selected.push(i.title);
    });
    if (selected.length > 0) return selected.join(', ');
    else return 'Any';
  };

  return (
    <Wrapper>
      <Collapse
        expandIconPosition='end'
        expandIcon={({ isActive }) => <CaretDownOutlined rotate={isActive ? 180 : 0} />}>
        {props.exploreType !== 'free-models' && (
          <Collapse.Panel
            header={
              <CollapseHeader>
                <span>Price: </span>${price[0]} to ${price[1]}
              </CollapseHeader>
            }
            key='price'>
            <ExplorePriceSlider
              className='priceSider'
              exploreType={props.exploreType}
              onChange={(value) => setPrice(value)}
              onChangePrice={(value) => console.log(value)}
            />
          </Collapse.Panel>
        )}

        <Collapse.Panel
          header={
            <CollapseHeader>
              <span>Formats: </span>
              {getOptionsFilter(router, 'formats')}
            </CollapseHeader>
          }
          key='formats'>
          {filterFormats.map((item, index) => {
            return (
              <ExploreCheckboxCustom
                key={index}
                className='checkbox'
                title={item.title}
                active={
                  router.query.formats === item.key || router.query.formats?.includes(item.key)
                }
                onChecked={() => onChecked('formats', item.key)}
              />
            );
          })}
        </Collapse.Panel>

        {/* {props.exploreType !== 'free-models' && (
          <Collapse.Panel
            header={
              <CollapseHeader>
                <span>Licenses: </span>
                {getOptionsFilter(router, 'licenses')}
              </CollapseHeader>
            }
            key='licenses'>
            {filterLicenses.map((item, index) => {
              return (
                <ExploreCheckboxCustom
                  key={index}
                  className='checkbox'
                  title={item.title}
                  active={
                    router.query.licenses === item.key || router.query.licenses?.includes(item.key)
                  }
                  onChecked={() => onChecked('licenses', item.key)}
                />
              );
            })}
          </Collapse.Panel>
        )} */}

        <Collapse.Panel
          header={
            <CollapseHeader>
              <span>More: </span>
              {getOptionsFilterByMore()}
            </CollapseHeader>
          }
          key='other'>
          {filterOther
            .filter((i) => (props.exploreType !== 'explore' ? i.key !== 'free' : i))
            .map((item, index) => {
              return (
                <ExploreCheckboxCustom
                  key={index}
                  className='checkbox'
                  title={item.title}
                  active={router.query[item.key] === '1'}
                  onChecked={() => onChecked('other', item.key)}
                />
              );
            })}
        </Collapse.Panel>
      </Collapse>

      <Reset_Apply>
        <Button
          className='btnReset'
          type='text'
          shape='round'
          onClick={() => router.push({ pathname: pathnameReset }, undefined, { shallow: true })}>
          Reset
        </Button>
        <Button className='btnApply' type='primary' shape='round' onClick={props.onClose}>
          Apply
        </Button>
      </Reset_Apply>
    </Wrapper>
  );
};

export default ExploreMobileFilterGroup;
