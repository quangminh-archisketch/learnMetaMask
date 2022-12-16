import Router from 'next/router';

import styled from 'styled-components';

import { UserPageTabName } from 'models/user.models';
import { maxMedia } from 'styles/__media';

type Props = {
  tabName: UserPageTabName;
};

const UserSidebarTabs = (props: Props) => {
  const { tabName } = props;

  const onChangePage = (page: UserPageTabName) => {
    Router.push(Router.asPath.split('/').slice(0, 2).join('/') + '/' + page);
  };

  return (
    <UserSidebarTabs_Wrapper className='hide-scrollbar'>
      <div
        className={'tabs_item' + (tabName === 'my-orders' ? ' --active' : '')}
        onClick={() => onChangePage('my-orders')}>
        Orders
      </div>
      <div
        className={'tabs_item' + (tabName === 'models' ? ' --active' : '')}
        onClick={() => onChangePage('models')}>
        Models
      </div>

      <div
        className={'tabs_item' + (tabName === 'likes' ? ' --active' : '')}
        onClick={() => onChangePage('likes')}>
        Likes
      </div>

      {/* <div
        className={'tabs_item' + (tabName === 'coins' ? ' --active' : '')}
        onClick={() => onChangePage('coins')}>
        Coins
      </div> */}

      <div
        className={'tabs_item' + (tabName === 'settings' ? ' --active' : '')}
        onClick={() => onChangePage('settings')}>
        Settings
      </div>
    </UserSidebarTabs_Wrapper>
  );
};

export default UserSidebarTabs;

const UserSidebarTabs_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.7rem;

  padding-top: 2.4rem;

  ${maxMedia.medium} {
    flex-direction: row;
    gap: 4.5rem;
    padding-top: 0;
    overflow-x: auto;
  }

  .tabs_item {
    position: relative;

    padding: 0.6rem 1.2rem;

    font-size: 16px;
    line-height: 1;
    color: var(--color-gray-6);
    transition: color 200ms ease-in-out;

    cursor: pointer;

    ${maxMedia.medium} {
      padding: 16px 0;

      &:first-child {
        margin-left: 20px;
      }
      &:last-child {
        margin-right: 20px;
      }
    }

    &:before {
      position: absolute;
      left: 0;
      top: 0;

      content: '';
      width: 0;
      height: 100%;
      background-color: transparent;

      transition: all 100ms ease-in-out;

      ${maxMedia.medium} {
        top: unset;
        bottom: 0;
        height: 3px;
      }
    }

    &:hover {
      color: rgba(var(--color-primary-rgb-700), 80%);
    }

    &.--active {
      font-weight: 500;
      color: var(--color-primary-700);

      &::before {
        width: 3px;
        background-color: var(--color-primary-700);

        ${maxMedia.medium} {
          width: 100%;
        }
      }
    }
  }
`;
