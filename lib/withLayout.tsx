import React, { CSSProperties, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import axios from 'axios';
import { BackTop } from 'antd';

import { AppState } from 'store/type';
import { CloseCart, CloseSellerRegister } from 'store/reducer/modal';
import { GetCart, ResetCartRedux } from 'store/reducer/cart';
import { ClearAuthRedux, SaveAuthRedux } from 'store/reducer/auth';
import { MovePageEnd, MovePageStart, ShowNotificationBar } from 'store/reducer/web';

import { removeToken } from 'lib/utils/auth';

import useWindowSize from 'hooks/useWindowSize';

import checkoutServices from 'services/checkout-services';

import Header from 'components/Layout/Header';
import MenuMobile from 'components/Layout/MenuMobile';
import SearchDrawer from 'components/Layout/Search';
import Footer from 'components/Layout/Footer';
import CartPreview from 'components/Layout/CartPreview';
import SalesRegistration from 'components/Pages/SalesRegistration';
import LoadingPage from 'components/Fragments/LoadingPage';
import BannerFreeFragment from 'components/Fragments/BannerFree';

import { PageProps } from 'models/page.models';
import cancelLoadingPage from './helpers/cancelLoadingPage';

interface SSRComponentElements {
  getInitialProps?: () => Promise<any>;
}

type SSRProps = {};

export type WithLayoutProps = SSRProps & {};

type PropsLayoutType = {
  header?: {
    show?: boolean;
    isSearch?: boolean;
    style?: CSSProperties;
  };
  footer?: {
    show?: boolean;
    style?: CSSProperties;
  };
};

const withLayout = (
  BaseComponent: React.ComponentType<WithLayoutProps | undefined | any> & SSRComponentElements,
  propsLayout?: PropsLayoutType
) => {
  const App = (props: PageProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [width] = useWindowSize();
    const isMovingPage = useSelector((state: AppState) => state.web.movingPage);
    const isNotiBar = useSelector((state: AppState) => state.web.notificationBar);

    const { header, footer } = propsLayout || {};

    const showFooter = typeof footer?.show !== 'undefined' ? footer.show : true;
    const showHeader = typeof header?.show !== 'undefined' ? header.show : true;
    const isSearchHeader = typeof header?.isSearch !== 'undefined' ? header.isSearch : true;

    if (props.auth?.token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.auth.token;

    useEffect(() => {
      if (props.auth?.token) {
        dispatch(SaveAuthRedux(props.auth));
        if (!props.auth.user?.email && typeof isNotiBar !== 'boolean')
          dispatch(ShowNotificationBar());
      } else {
        removeToken();
        dispatch(ClearAuthRedux());
      }
    }, [props.auth?.token]);

    // Scroll to Top when reload page and have notification bar
    useEffect(() => {
      if (isNotiBar) window.scrollTo(0, 0);
    }, [isNotiBar]);

    //Show loading page when change page
    useEffect(() => {
      const start = (path: string) => {
        const currentPage = router.asPath.split('?')[0],
          nextPage = path.split('?')[0];

        if (cancelLoadingPage(currentPage, nextPage)) return false;
        else dispatch(MovePageStart());
      };
      const end = () => dispatch(MovePageEnd());

      router.events.on('routeChangeStart', start);
      router.events.on('routeChangeComplete', end);
      router.events.on('routeChangeError', end);

      return () => {
        router.events.off('routeChangeStart', start);
        router.events.off('routeChangeComplete', end);
        router.events.off('routeChangeError', end);
      };
    }, []);
    //Show loading page when change page -----> End

    //Get Cart
    useEffect(() => {
      const onGetCart = async () => {
        await checkoutServices
          .getCart()
          .then((res) => dispatch(GetCart(res.data || [])))
          .catch((err) => console.error('Get Cart', err));
      };

      if (props.auth?.token && props.auth?.user?.status) onGetCart();
      else dispatch(ResetCartRedux());
    }, [props.auth]);

    // Reset Redux
    useEffect(() => {
      dispatch(CloseCart());
      dispatch(CloseSellerRegister());
    }, []);

    // Remove payment_intent_client_secret when not checkout
    useEffect(() => {
      if (router.pathname !== '/checkout') localStorage.removeItem('payment_intent_client_secret');
    }, [router]);

    // Minimum page height should be 100vh
    useEffect(() => {
      const heightScreen = window.innerHeight;
      const heightHeader = document.getElementsByTagName('header')[0]?.clientHeight || 0;
      const heightFooter = document.getElementsByTagName('footer')[0]?.clientHeight || 0;
      const pageContent =
        document.querySelector('#__next > main') ||
        document.querySelector('#__next > header + div + div');
      const pageStyle = pageContent?.getAttribute('style');
      const minHeight = heightScreen - heightHeader - heightFooter + 'px';
      pageContent?.setAttribute('style', `${pageStyle || ''}min-height: ${minHeight}`);
    }, []);

    return (
      <>
        {isMovingPage && <LoadingPage blur />}

        {showHeader && <Header {...props} isSearch={isSearchHeader} style={header?.style} />}

        <BaseComponent {...props} />

        {showFooter && <Footer style={footer?.style} />}
        {width < 992 && <MenuMobile {...props} />}
        <BannerFreeFragment />
        <CartPreview />
        <SearchDrawer />
        <SalesRegistration />
        <BackTop visibilityHeight={600} duration={1000} style={{ right: '30px', bottom: '30px' }} />
      </>
    );
  };

  return App;
};

export default withLayout;
