import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import { Input } from 'antd';

import useDebounce from 'hooks/useDebounce';

import Icon from 'components/Fragments/Icons';

import { maxMedia } from 'styles/__media';

type Props = {
  tabs: {
    title: string;
    active: boolean;
    url: string;
  }[];
  isSearch?: boolean;
  keySearch?: string;
  placeholder?: string;
  isResetSearchChangeTab?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSearch?: (value: string) => void;
};

const UserPageTabContent = (props: Props) => {
  const router = useRouter();

  const [keySearch, setKeySearch] = useState<string>('');
  const debouncedKeySearch = useDebounce<string>(keySearch, 500);

  useEffect(() => {
    props.onSearch && props.onSearch(debouncedKeySearch);
  }, [debouncedKeySearch]);

  useEffect(() => {
    const end = () => props.isResetSearchChangeTab && setKeySearch('');

    router.events.on('routeChangeComplete', end);
    return () => router.events.off('routeChangeComplete', end);
  }, []);

  return (
    <UserPageTabContent_Wrapper>
      <UserPageTabContent_Tabs className='hide-scrollbar'>
        {props.tabs.map((tab, index) => {
          return (
            <div
              key={index}
              className={'tab-item' + (tab.active ? ' --active' : '')}
              onClick={() => router.push(tab.url)}>
              {tab.title}
            </div>
          );
        })}
      </UserPageTabContent_Tabs>

      {props.isSearch && (
        <UserPageTabContent_Search>
          <Input
            placeholder={props.placeholder}
            value={keySearch}
            onChange={(e) => setKeySearch(e.target.value)}
            onPressEnter={() => props.onSearch && props.onSearch(props.keySearch || '')}
          />
          <Icon
            iconName='search'
            onClick={() => props.onSearch && props.onSearch(props.keySearch || '')}
          />
        </UserPageTabContent_Search>
      )}
    </UserPageTabContent_Wrapper>
  );
};

export default UserPageTabContent;

const UserPageTabContent_Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem 4rem;

  min-height: 6rem;
  padding: 1.2rem 4rem;

  border-bottom: var(--border-1px);

  &::-webkit-scrollbar {
    display: none;
  }

  ${maxMedia.medium} {
    flex-direction: column;
    align-items: flex-start;
    min-height: unset;
    padding: 0;
    border-bottom: none;
  }
`;

const UserPageTabContent_Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 0 4.5rem;

  ${maxMedia.medium} {
    width: 100%;
    padding: 16px 20px;
    border-top: var(--border-1px);
    border-bottom: var(--border-1px);

    overflow-x: auto;
  }

  .tab-item {
    font-size: 16px;
    line-height: 1;
    color: var(--color-gray-6);

    cursor: pointer;

    &:hover {
      color: rgba(var(--color-primary-rgb-700), 80%);
    }
    &.--active {
      font-weight: 500;
      color: var(--color-primary-700);
    }
  }
`;

const UserPageTabContent_Search = styled.div`
  position: relative;
  height: 42px;
  flex: auto;
  max-width: 40rem;

  ${maxMedia.medium} {
    flex: unset;
    width: calc(100% - 4rem);
    min-width: unset;
    max-width: unset;
    height: 38px;
    margin-left: 2rem;
  }

  .ant-input {
    height: 100%;
    padding-left: 2rem;
    padding-right: 6.5rem;
    font-size: 14px;
    background-color: var(--color-gray-2);
    border-radius: var(--border-radius-base);
    border-color: var(--color-gray-4);

    &::placeholder {
      line-height: 2.2rem;
      color: var(--color-gray-6);
    }

    ${maxMedia.medium} {
      padding-left: 10px;
      background-color: transparent;
      border-radius: 0.6rem;
    }
  }

  .my-icon.search {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);

    svg {
      width: 2.4rem;
      height: 2.4rem;
      fill: var(--secondary);
    }

    ${maxMedia.medium} {
      right: 10px;
    }
  }
`;
