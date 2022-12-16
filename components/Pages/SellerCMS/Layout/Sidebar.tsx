import Router, { useRouter } from 'next/router';
import Link from 'next/link';

import { onLogout } from 'lib/utils/auth';

import Icon from 'components/Fragments/Icons';

import { SellerCMSPageTabName } from 'models/seller.models';
import { maxMedia } from 'styles/__media';
import styled from 'styled-components';

type Props = {
  tabName: SellerCMSPageTabName;
};

const MyProductSidebar = (props: Props) => {
  const { tabName } = props;
  const router = useRouter();

  const onChangePage = (page: SellerCMSPageTabName) => {
    Router.push(Router.asPath.split('/').slice(0, 2).join('/') + '/' + page);
  };

  return (
    <>
      <MyProductSidebarTabs_Wrapper className='hide-scrollbar'>
        <div className='header'>
          <Logo__wrapper>
            <Link href='/'>
              <a>
                <Icon iconName='logo-main' />
              </a>
            </Link>
          </Logo__wrapper>

          <div className='tab__lists'>
            <div
              className={'tabs_item' + (tabName === 'dashboard' ? ' --active' : '')}
              onClick={() => onChangePage('dashboard')}>
              <Icon iconName='dashboard' />
              Dashboard
            </div>
            <div
              className={'tabs_item' + (tabName === 'models' ? ' --active' : '')}
              onClick={() => onChangePage('models')}>
              <Icon iconName='calendar' />
              Models
            </div>

            <div
              className={'tabs_item' + (tabName === 'orders' ? ' --active' : '')}
              onClick={() => onChangePage('orders')}>
              <Icon iconName='chart' />
              Orders
            </div>

            <div
              className={'tabs_item' + (tabName === 'withdraw' ? ' --active' : '')}
              onClick={() => onChangePage('withdraw')}>
              <Icon iconName='profile' />
              Withdraw
            </div>

            <div
              className={'tabs_item' + (tabName === 'reviews' ? ' --active' : '')}
              onClick={() => onChangePage('reviews')}>
              <Icon iconName='seller-star' />
              Reviews
            </div>
          </div>
        </div>

        <Footer_wrapper onClick={() => onLogout(router)}>
          <Icon iconName='logout' />
          Logout
        </Footer_wrapper>
      </MyProductSidebarTabs_Wrapper>
    </>
  );
};

const MyProductSidebarTabs_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  position: sticky;
  top: 0;
  border-right: 1px solid var(--color-gray-5);
  background-color: #fefefe;

  .logo-main svg {
    width: 200px;
    height: 35px;

    g {
      fill: var(--color-gray-11);
    }
  }

  .tab__lists {
    display: flex;
    flex-direction: column;
    gap: 24px;

    overflow-x: auto;
  }

  .tabs_item {
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
    padding: 12px 0;
    padding-left: 50px;
    width: 100%;

    font-size: 16px;
    line-height: 1;
    color: var(--text-title);
    transition: all 100ms ease-in-out;
    white-space: nowrap;
    opacity: 70%;

    cursor: pointer;

    .my-icon {
      font-size: 24px;
      transition: all 100ms ease-in-out;
    }

    &:before {
      position: absolute;
      top: 0;
      left: 0;

      content: '';
      height: 100%;
      width: 4px;
      opacity: 0;
      background-color: var(--color-primary-700);

      transition: all 100ms ease-in-out;
    }

    &.--active,
    &:hover {
      font-weight: 600;
      color: var(--color-primary-700);

      .my-icon {
        color: currentColor;
      }
    }
    &.--active::before {
      opacity: 1;
    }
  }

  ${maxMedia.custom(1300)} {
    .tab__lists {
      gap: 19px;
    }

    .tabs_item {
      padding-left: 40px;
    }
  }

  ${maxMedia.medium} {
    display: flex;
    position: relative;
    z-index: 2;
    height: 100vh;
  }
`;

const Logo__wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 20px;

  ${maxMedia.custom(1300)} {
    padding: 32px 16px;
  }
`;

const Footer_wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
  padding: 12px 0;
  padding-left: 45px;
  font-size: 16px;
  line-height: 16px;
  opacity: 0.8;
  cursor: pointer;

  .my-icon svg {
    width: auto;
    height: 24px;
    color: transparent;
  }

  ${maxMedia.custom(1300)} {
    padding-left: 36px;
  }
`;

export default MyProductSidebar;
