import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AlignLeftOutlined, UserOutlined, WarningFilled } from '@ant-design/icons';
import { Avatar, notification } from 'antd';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import { handlerMessage } from 'common/functions';

import sellerServices from 'services/seller-services';

import DashboardComponent from 'components/Pages/SellerCMS/Dashboard';
import MyProductSidebar from 'components/Pages/SellerCMS/Layout/Sidebar';
import ModelsComponent from 'components/Pages/SellerCMS/Models';
import FooterFragments from 'components/Pages/SellerCMS/Fragments/Footer';
import OrderSoldComponent from 'components/Pages/SellerCMS/OrderSold';
import OrderSoldDetail from 'components/Pages/SellerCMS/OrderSold/OrderSoldDetail';
import WithdrawComponent from 'components/Pages/SellerCMS/Withdraw';
import LoadingPage from 'components/Fragments/LoadingPage';
import ReviewComponent from 'components/Pages/SellerCMS/Review/Index';

import { SellerCMSPageTabName } from 'models/seller.models';
import { AuthModel } from 'models/page.models';

import { maxMedia } from 'styles/__media';
import styled from 'styled-components';

type Props = {
  auth?: AuthModel;
  page: SellerCMSPageTabName;
  orderId: string | null;
};

const MyProductPage = (props: Props) => {
  const { page = 'dashboard', orderId } = props;

  const router = useRouter();

  const [isSidebar, setIsSidebar] = useState<boolean>(false);

  // Check widthdraw
  const [minWithdraw, setMinWithdraw] = useState(0);

  const [loadingWithdraw, setLoadingWithdraw] = useState(true);

  useEffect(() => {
    if (!props.auth?.token) {
      router.push('/login');
      return;
    }

    if (typeof window !== 'undefined') {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

      if (vw < 1024) handlerMessage('Only support screen larger than 1024px', 'warning');
    }
  }, []);

  useEffect(() => {
    if (page === 'dashboard' || page === 'withdraw') {
      const onFetchMinWithdraw = async () => {
        setLoadingWithdraw(true);

        try {
          const resp = await sellerServices.getMinWithdraw();
          if (!resp.error) {
            setLoadingWithdraw(false);
            setMinWithdraw(+resp.data || 0);
          }
        } catch (error) {
          setLoadingWithdraw(false);

          handlerMessage('Not found min withdraw', 'error');
        }
      };

      onFetchMinWithdraw();
    }
  }, [page]);

  const onCheckWithdraw = () => {
    if ((props.auth?.user?.market_seller_wallet.avalible || 0) < minWithdraw) {
      notification.info({
        className: 'custom__notification',
        message: 'Error',
        icon: <WarningFilled className='warning-alert' />,
        placement: 'top',
        getContainer: () => document.getElementById('containerWrapper') || document.body,
        description: `You don't have enough money to withdraw.`,
      });
    } else {
      router.push('/withdraw');
    }
  };

  if (!props.auth?.token) return <LoadingPage />;

  return (
    <>
      <Container_wrapper id='containerWrapper'>
        <AlignLeftOutlined className='icon__mobile' onClick={() => setIsSidebar(!isSidebar)} />
        <LeftSidebar className={`${isSidebar ? 'show' : ''}`} onBlur={() => setIsSidebar(false)}>
          <div className='overlay' onClick={() => setIsSidebar(false)} />
          <MyProductSidebar tabName={page || 'dashboard'} />
        </LeftSidebar>

        <Content>
          <HeaderLogo>
            <Link href={`/seller/profile/${props.auth?.user?.id}`}>
              <a>
                <Avatar
                  shape='circle'
                  src={props.auth?.user?.image}
                  size={48}
                  icon={<UserOutlined />}
                />
                <p className='name'>{props.auth?.user?.name}</p>
              </a>
            </Link>
          </HeaderLogo>
          {page === 'dashboard' && (
            <DashboardComponent
              myWithdraws={{
                onCheckWithdraw: onCheckWithdraw,
                loadingWithdraw: loadingWithdraw,
                minWithdraw: minWithdraw,
                currentWithdraw: props.auth?.user?.market_seller_wallet.avalible || 0,
              }}
            />
          )}
          {page === 'models' && <ModelsComponent />}
          {page === 'orders' && !orderId && <OrderSoldComponent />}
          {page === 'orders' && orderId && <OrderSoldDetail orderId={orderId} />}
          {page === 'withdraw' && (
            <WithdrawComponent
              myWithdraws={{
                onCheckWithdraw: onCheckWithdraw,
                loadingWithdraw: loadingWithdraw,
                minWithdraw: minWithdraw,
                currentWithdraw: props.auth?.user?.market_seller_wallet.avalible || 0,
              }}
            />
          )}
          {page === 'reviews' && <ReviewComponent />}
        </Content>
      </Container_wrapper>

      <FooterFragments />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  const path = content.query.content;

  const page = path ? path[0] || 'dashboard' : null;
  const orderId = path && path.length >= 2 ? path[1] : null;

  return {
    props: {
      auth,
      page,
      orderId,
    },
  };
};

const Container_wrapper = styled.main`
  display: flex;
  position: relative;

  .icon__mobile {
    display: none;
    position: absolute;
    left: 20px;
    top: 35px;
    color: var(--color-primary-700);
    cursor: pointer;

    svg {
      width: auto;
      height: 20px;
    }
  }

  .custom__notification {
    background-color: #fff1f0;
    border: 1px solid #ffccc7;
    box-shadow: 0px 4px 8px rgba(255, 77, 79, 0.1);
    padding: 10px 16px;

    .ant-notification-notice-message {
      margin-left: 26px;
      margin-bottom: 0;
      color: var(--text-title);
      font-weight: 500;
      font-size: 18px;
    }

    .ant-notification-notice-close {
      top: 10px;
    }

    .ant-notification-notice-description {
      margin-top: 10px;
      margin-left: 0;
    }

    .ant-notification-notice-icon {
      margin-left: 0;
      margin-top: -5px;
    }

    .warning-alert {
      color: #ff4d4f;
      svg {
        width: 16px;
        height: auto;
      }
    }
  }

  ${maxMedia.medium} {
    .icon__mobile {
      display: block;
    }
  }
`;

const LeftSidebar = styled.div`
  width: 240px;

  .overlay {
    transform: translateX(-120%);
    position: fixed;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    background-color: #333;
    z-index: 1;
    visibility: hidden;
    transition: 0.3s;
  }

  ${maxMedia.medium} {
    position: fixed;
    top: 0;
    transition: 0.3s;
    transform: translateX(-120%);
    z-index: 2;

    &.show {
      transform: translateX(0);

      .overlay {
        transform: translateX(0);

        opacity: 0.7;
        visibility: visible;
      }
    }
  }
`;

const Content = styled.div`
  width: calc(100vw - 240px);
  padding: 20px;

  table {
    border: 1px solid var(--color-gray-4);
  }

  .ant-pagination-item {
    color: var(--color-primary-700);
  }

  .ant-pagination-item-link {
    background-color: #fefefe;
    color: var(--color-gray-5);
    border-color: var(--color-gray-5);
  }

  td.ant-table-cell.product__title {
    color: var(--color-gray-11);
    font-weight: 500;

    a {
      color: var(--color-gray-11);
      font-weight: 500;

      &:hover {
        color: var(--color-primary-700);
      }
    }
  }

  th.ant-table-cell {
    color: var(--color-gray-11);
  }

  td.ant-table-cell {
    color: var(--text-caption);
  }

  .ant-table-thead tr th {
    background-color: var(--color-gray-4);
  }

  .ant-table-tbody tr:last-child td {
    border-bottom: 0;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: var(--color-primary-25);
  }

  .ant-table-row {
    &-selected {
      background-color: var(--color-primary-50);
    }
  }

  .ant-table-tbody > tr.ant-table-row-selected > td {
    background-color: var(--color-primary-50);
  }

  .img {
    border-radius: 4px;
  }

  .ant-select-item:hover {
    background-color: var(--color-primary-100);
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: var(--color-primary-100);
  }

  tr.ant-table-expanded-row > td,
  tr.ant-table-expanded-row:hover > td {
    background-color: transparent;
  }

  ${maxMedia.medium} {
    width: 100%;
  }
`;

const HeaderLogo = styled.div`
  width: fit-content;
  margin-left: auto;

  margin-bottom: 20px;
  a {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .name {
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.54px;
    color: #0a1f30;
    font-weight: 500;
  }
`;

export default withLayout(MyProductPage, {
  footer: { show: false },
  header: {
    show: false,
  },
});
