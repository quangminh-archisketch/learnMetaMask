import { ReactNode } from 'react';
import { Input, DatePicker, Select, Button, Skeleton } from 'antd';

import { searchDebounce } from 'common/functions';

import Icon from 'components/Fragments/Icons';

import { MyWithdrawType } from 'models/seller.model';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

type Props = {
  uploadName?: string | ReactNode;
  totalText?: string;
  totalNum?: string | number;
  subTitleNum?: string;
  searchType?: 'name' | 'title' | '';
  isFilterDate?: boolean;
  dataRangePicker?: any;
  filterLists?: {
    placeholder: string;
    selectType?: string;
    values: {
      value: string | number | boolean | null;
      label: string;
    }[];
    data?: string | number;
    type: string;
    loadingLoad?: boolean;
    loadingOption?: boolean;
    total?: number;
    // eslint-disable-next-line no-unused-vars
    onScroll?: (e: any) => void;
    // eslint-disable-next-line no-unused-vars
    onSearch?: (value: string) => void;
    onClear?: () => void;
    selectRef?: any;
  }[];
  onFilter?: any;
  totalName?: string;
  isLine?: boolean;
  placeholderSearch?: string;
  myWithdraws?: MyWithdrawType;
};

const FilterFragments = (props: Props) => {
  const {
    searchType,
    placeholderSearch,
    isFilterDate,
    filterLists,
    uploadName,
    totalNum,
    totalName,
    totalText = 'Total',
    isLine = false,
    onFilter,
    myWithdraws,
  } = props;

  return (
    <Header_wrapper isLine={isLine}>
      {(totalNum || totalText) && (
        <Total_wrapper>
          <div>
            <h3>
              Total revenue: <span>{totalNum}</span> {totalName}
            </h3>
          </div>
        </Total_wrapper>
      )}

      <Filter_box id='selectBox'>
        {searchType && (
          <Input
            placeholder={placeholderSearch}
            className='search__input filter-item'
            onChange={searchDebounce((e) => onFilter({ value: e.target.value, type: searchType }))}
            suffix={<Icon iconName='search' />}
          />
        )}

        {isFilterDate && (
          <DatePicker.RangePicker
            className='date__picker filter-item'
            getPopupContainer={() => document.getElementById('selectBox') || document.body}
            onChange={(value) => onFilter({ value, type: 'date' })}
            defaultValue={props.dataRangePicker}
          />
        )}

        {filterLists?.length &&
          filterLists.map((item, index) => {
            if (item.selectType === 'search')
              return (
                <Select
                  style={{ minWidth: '300px' }}
                  key={index}
                  placement='bottomRight'
                  allowClear={true}
                  showSearch={true}
                  ref={item.selectRef}
                  placeholder={item.placeholder}
                  onClear={item.onClear}
                  onChange={(value) => onFilter({ value, type: item.type })}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  className='filter__box filter-item'
                  onSearch={searchDebounce((value) => item.onSearch && item.onSearch(value))}
                  onPopupScroll={item.onScroll}
                  filterOption={false}>
                  {item.loadingOption ? (
                    <Select.Option key='loading' disabled>
                      <Skeleton active paragraph={{ rows: 4 }} />
                    </Select.Option>
                  ) : (
                    item.values?.map((v, i) => (
                      <Select.Option value={v.value} label={v.label} key={i}>
                        {v.label}
                      </Select.Option>
                    ))
                  )}

                  {item.loadingLoad && (
                    <Select.Option key='loading' disabled>
                      <Skeleton active paragraph={{ rows: 2 }} />
                    </Select.Option>
                  )}
                </Select>
              );

            return (
              <Select
                style={{ minWidth: '130px' }}
                key={index}
                placement='bottomRight'
                // dropdownMatchSelectWidth={false}
                placeholder={item.placeholder}
                onChange={(value) => onFilter({ value, type: item.type })}
                value={item.data}
                className='filter__box filter-item'>
                {item.values?.map((v, i) => (
                  <Select.Option value={v.value} label={v.label} key={i}>
                    {v.label}
                  </Select.Option>
                ))}
              </Select>
            );
          })}

        {uploadName && (
          <Button
            type='primary'
            className='btn__upload'
            disabled={myWithdraws?.loadingWithdraw ? myWithdraws.loadingWithdraw : false}
            loading={myWithdraws?.loadingWithdraw ? myWithdraws.loadingWithdraw : false}
            onClick={myWithdraws?.onCheckWithdraw ? myWithdraws.onCheckWithdraw : undefined}>
            {uploadName}
          </Button>
        )}
      </Filter_box>
    </Header_wrapper>
  );
};

const Header_wrapper = styled.div<{ isLine: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  padding: 15px 0;
  margin-bottom: 15px;
  border-bottom: ${(props) => (props.isLine ? '1px solid var(--color-gray-4)' : 'none')};

  .total {
    width: fit-content;
    font-size: 20px;
    color: var(--color-gray-11);
    white-space: nowrap;

    span {
      color: #cf293f;
      font-weight: 600;
    }
  }
`;

const Filter_box = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .selectBox {
    .ant-select-item {
      color: #434343;
    }
  }

  .date__picker {
    min-width: 256px;
    max-width: 256px;
  }

  .filter__box {
    .ant-select-selector {
      align-items: center;
      height: 41px;

      input {
        height: 100% !important;
      }
    }
  }

  .search__input {
    width: 300px;
  }

  input::placeholder,
  .ant-select-selection-placeholder {
    color: var(--color-gray-8);
    font-size: 14px;
  }

  .btn__upload {
    min-width: 170px;
    height: 37px;
    border-radius: 4px;
  }

  input {
    height: 100%;
  }

  ${maxMedia.custom(1200)} {
    flex-wrap: wrap;

    .filter-item {
      flex: 100%;
      height: 41px;
    }

    .search__input {
      max-width: initial;
    }

    .date__picker {
      max-width: initial;
      min-width: initial;
    }
  }

  ${maxMedia.small} {
    .ant-picker-panels {
      flex-direction: column;
      width: 100%;
    }

    .ant-picker-content,
    .ant-picker-panel,
    .ant-picker-date-panel {
      width: 100%;
    }
  }
`;

const Total_wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 24px;
    color: var(--color-gray-11);

    span {
      color: var(--color-primary-700);
      font-weight: 600;
    }
  }

  .subtitle {
    margin-top: 8px;
    font-size: 16px;
    color: var(--color-gray-11);

    span {
      color: #f43d4f;
      font-weight: 600;
    }
  }
`;

export default FilterFragments;
