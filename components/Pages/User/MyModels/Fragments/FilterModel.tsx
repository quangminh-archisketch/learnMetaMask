import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import { Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import { UserPageOptionFilterModel } from 'models/user.models';

type Props = {
  isResetWhenChangeTab?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: UserPageOptionFilterModel) => void;
};

const FilterModel = (props: Props) => {
  const router = useRouter();

  const [selected, setSelected] = useState<UserPageOptionFilterModel>('recently');

  useEffect(() => {
    if (props.isResetWhenChangeTab) setSelected('recently');
  }, [router]);

  const options = [
    { label: 'Recently', key: 'recently' },
    { label: 'Oldest', key: 'oldest' },
    { label: 'Last week', key: 'lastweek' },
    { label: 'Last month', key: 'lastmonth' },
    { label: 'A-Z', key: 'az' },
    { label: 'Z-A', key: 'za' },
  ];

  return (
    <ModelSelect_wrapper id='modelDropdown'>
      <Select
        value={selected}
        suffixIcon={<CaretDownOutlined />}
        getPopupContainer={() => document.getElementById('modelDropdown') || document.body}
        onChange={(value) => {
          setSelected(value);
          props.onChange(value);
        }}>
        {options.map((item, index) => (
          <Select.Option value={item.key} key={index}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </ModelSelect_wrapper>
  );
};

const ModelSelect_wrapper = styled.div`
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    min-width: 12rem;
    border-radius: 0.5rem;
  }

  .ant-select-selection-item,
  .anticon-caret-down {
    color: var(--color-main-6);
  }

  .ant-select-item {
    color: var(--color-gray-6);

    &:hover {
      color: rgba(var(--color-primary-rgb-700), 70%);
    }

    &.ant-select-item-option-selected {
      background-color: transparent;
      color: var(--color-main-6);
      font-weight: 400;
    }
  }
`;

export default FilterModel;
