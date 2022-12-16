import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import { Button, Input, InputRef } from 'antd';

import useDebounce from 'hooks/useDebounce';
import urlPage from 'constants/url.constant';

import Icon from 'components/Fragments/Icons';

import { ExploreType } from 'models/explore.model';
import { ContainerFreeSize } from 'styles/__styles';

type Props = {
  className?: string;
  exploreType: ExploreType;
};

const ExploreSearchBox = (props: Props) => {
  const router = useRouter();

  const inputRef = useRef<InputRef>(null);
  const [value, setValue] = useState<string>(
    router.query.s?.toString()?.replaceAll('+', ' ') || ''
  );

  const debouncedKeywords = useDebounce<string>(value, 500);

  useEffect(() => {
    onSearch(debouncedKeywords);
  }, [debouncedKeywords]);

  const onSearch = (text: string) => {
    let query = { ...router.query };
    delete query.category;
    if (text.trim()) query.s = text.trim();
    else delete query.s;

    const pathname = (
      props.exploreType === 'free-models'
        ? urlPage.freeModels
        : props.exploreType === 'sale-off'
        ? urlPage.saleOff
        : urlPage.explore
    ).replace('{category}', router.query.category?.toString() || 'all');
    router.push({ pathname, query }, undefined, { shallow: true });
  };

  return (
    <Wrapper className={props.className}>
      <ContainerFreeSize>
        <div className='Explore__SearchBox'>
          <Input
            ref={inputRef}
            bordered={false}
            placeholder='Search'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={(e) => {
              onSearch(e.target.value);
              inputRef.current?.blur();
            }}
          />
          <Button type='link' onClick={() => onSearch(value)}>
            <Icon iconName='search' />
          </Button>
        </div>
      </ContainerFreeSize>
    </Wrapper>
  );
};

export default ExploreSearchBox;

const Wrapper = styled.div`
  padding: 4px 0;
  border-bottom: var(--border-1px);

  .Explore__SearchBox {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ant-input {
    height: 4.2rem;
    padding: 10px 0;

    border-radius: 1rem;
  }

  .ant-btn {
    height: 4.2rem;
    min-width: 4.2rem;
    padding: 0;

    .my-icon {
      width: 2rem;
      margin: 0;
    }
  }
`;
