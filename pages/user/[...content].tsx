import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import UserPageSidebar from 'components/Pages/User/Layout/Sidebar';
import MyOrdersPage from 'components/Pages/User/MyOrders';
import OrderDetail from 'components/Pages/User/MyOrders/OrderDetail';
import ModalCancelOrder from 'components/Pages/User/MyOrders/Fragments/ModalCancelOrder';
import MyModels from 'components/Pages/User/MyModels';
// import MyCoins from 'components/Pages/User/MyCoins';
import MyLikes from 'components/Pages/User/MyLikes';
import MySettings from 'components/Pages/User/MySettings';

import { AppState } from 'store/type';
import { UserPageProps } from 'models/page.models';

import { Container } from 'styles/__styles';
import { maxMedia } from 'styles/__media';

const UserPage = (props: UserPageProps) => {
  const { page = 'my-orders', pageSub, orderId, tabContent } = props;

  const router = useRouter();
  const auth = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (!props.auth?.token) router.push('/login?redirect=' + router.asPath);
  }, [props.auth]);

  if (!auth?.token || !auth.user) return null;

  return (
    <>
      <UserPage_Wrapper>
        <Container>
          <UserPage_Layout>
            <UserPageSidebar tabName={page || 'my-orders'} auth={auth} />

            <UserPage_Content>
              {/* Order */}
              {page === 'my-orders' && !pageSub && !orderId && (
                <MyOrdersPage tabName={tabContent || null} />
              )}
              {page === 'my-orders' && pageSub === 'detail' && orderId && (
                <OrderDetail orderId={orderId} />
              )}
              {/* {page === 'my-orders' && pageSub === 'cancel' && orderId && 'Refund'} */}

              {/* Models */}
              {page === 'models' && <MyModels tabName={tabContent || null} />}

              {/* Coins */}
              {/* {page === 'coins' && <MyCoins tabName={tabContent || null} />} */}

              {/* Like */}
              {page === 'likes' && <MyLikes auth={auth} />}

              {/* Setting */}
              {page === 'settings' && <MySettings auth={auth} tabName={tabContent || null} />}
            </UserPage_Content>
          </UserPage_Layout>
        </Container>
      </UserPage_Wrapper>

      <ModalCancelOrder />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  const path = content.query.content;
  const page = path ? path[0] || 'my-orders' : null;
  const pageSub = path && path.length > 2 ? path[1] : null;
  const tabContent = !pageSub && path && path[1] ? path[1] : null;
  const orderId = path && page === 'my-orders' ? (pageSub ? path[2] : null) : null;

  return { props: { auth, page, pageSub, orderId, tabContent } };
};

export default withLayout(UserPage, {
  footer: { style: { backgroundColor: 'var(--userPage_backgroundColorMain)' } },
});

export const UserPage_Wrapper = styled.main`
  padding: 20px 0 2rem;

  background: var(--userPage_backgroundColorMain);

  ${maxMedia.medium} {
    padding-bottom: 0;

    & > div {
      padding: 0;
    }
  }
`;

export const UserPage_Layout = styled.div`
  display: grid;
  grid-template-columns: 24rem calc(100% - 26rem);
  gap: 0 2rem;

  ${maxMedia.medium} {
    display: block;
  }
`;

export const UserPage_Content = styled.div`
  border-radius: 0.5rem;
  background-color: var(--color-white);
  box-shadow: var(--box-shadow);
`;
