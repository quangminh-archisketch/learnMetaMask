import { CSSProperties, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/type';
import { OpenCart, OpenMenuMobile, OpenSearch, OpenSellerRegister } from 'store/reducer/modal';
import { SaveCategory, UpdateNotification } from 'store/reducer/web';

import { Badge, Button, Col, Dropdown, Input, Row } from 'antd';
import { CaretDownOutlined, UploadOutlined } from '@ant-design/icons';

import useWindowSize from 'hooks/useWindowSize';
import useWindowScroll from 'hooks/useWindowScroll';
import useDetectMobile from 'hooks/useDetectMobile';
import { changeToSlug } from 'common/functions';
import categoryServices from 'services/category-services';

import notificationServices from 'services/notification-services';
import NotificationBar from 'components/Fragments/NotificationBar';
import Icon from 'components/Fragments/Icons';
import HeaderUser from 'components/Fragments/HeaderUser';

import { PageProps } from 'models/page.models';
import { CategoryModel } from 'models/category.models';

import { ContainerLarge } from 'styles/__styles';
import * as SC from './style';

const menus = [
  { key: 'film', title: 'Phim', url: '/explore/all' },
  { key: 'best-selling', title: 'Rạp CGV', url: '/explore/all?sort=best-selling' },
  { key: 'sale-off', title: 'Manager', url: '/sale-off/all' },
  { key: '3d-modeling-service', title: 'About', url: '/' },
];

type Props = PageProps & {
  isSearch: boolean;
  style?: CSSProperties;
};

const Header = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);

  const [screenW] = useWindowSize();
  const pageYOffset = useWindowScroll();
  const isMobile = useDetectMobile();

  const [topFixed, setTopFixed] = useState<number | undefined>(0);

  const auth = useSelector((state: AppState) => state.auth);
  const cartCount: number = useSelector((state: AppState) => state.cart.products?.length || 0);
  const isNotificationBar = useSelector((state: AppState) => state.web.notificationBar);
  const categories = useSelector((state: AppState) => state.web.categories);
  const notificationTotal: number = useSelector(
    (state: AppState) => state.web.notificationTotal || 0
  );

  const isHome = router.pathname === '/' && pageYOffset < 600;

  // Get Category
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { error, data } = await categoryServices.getAllCategory();
        if (!error) dispatch(SaveCategory(data));
      } catch (error) {}
    };
    !categories && fetchCategory();
  }, []);

  useEffect(() => {
    setTopFixed(document?.getElementsByClassName('header--noti-bar')[0]?.clientHeight);
  }, [screenW, isNotificationBar]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const { error, total } = await notificationServices.getCountNotificationUnread();
        if (!error) dispatch(UpdateNotification({ type: 'set', count: total }));
      } catch (error) {
        console.log(error);
      }
    };
    auth?.token && getNotification();
  }, [auth?.token]);

  return (
    <>
      <SC.Wrapper
        ref={headerRef}
        style={{ ...props.style }}
        position={
          isNotificationBar ? (pageYOffset > (topFixed || 0) ? 'fixed' : 'sticky') : 'fixed'
        }
        top={topFixed ? -topFixed : 0}>
        {isNotificationBar && <NotificationBar className='header--noti-bar' />}

        <SC.Header__Nav isHome={isHome}>
          <ContainerLarge className='header_box'>
            <SC.Left>
              <SC.Logo isHome={isHome}>
                <Link href={'/'}>
                  <a>
                    <Icon iconName={isHome ? 'logo-white' : 'logo-main'} className='logo' />
                  </a>
                </Link>
              </SC.Logo>

              {screenW > 991 && (
                <SC.Menu>
                  <ul>
                    {menus.map((item) => {
                      const isStartsWith = (match: string) =>
                        router.asPath.startsWith(match) && item.url.startsWith(match);

                      const condition_1 = router.asPath === item.url,
                        condition_2 =
                          isStartsWith('/explore') &&
                          !router.asPath.includes('sort=best-selling') &&
                          !item.url.includes('sort=best-selling'),
                        condition_3 =
                          router.asPath.startsWith('/explore') &&
                          item.url.startsWith('/explore/all?sort=best-selling') &&
                          router.asPath.includes('sort=best-selling'),
                        condition_4 = isStartsWith('/sale-off');

                      const active = condition_1 || condition_2 || condition_3 || condition_4;

                      return item.key === 'marketplace' ? (
                        <Dropdown
                          key={item.key}
                          overlay={
                            categories && categories.length > 0 ? (
                              <MenuDropdown categories={categories} />
                            ) : (
                              <></>
                            )
                          }
                          getPopupContainer={() => document.getElementsByTagName('header')[0]}>
                          <SC.MenuItem key={item.key} isHome={isHome} active={active}>
                            <span>
                              <Link href={item.url || '/'}>{item.title}</Link>
                              {categories && categories.length > 0 && <CaretDownOutlined />}
                            </span>
                          </SC.MenuItem>
                        </Dropdown>
                      ) : (
                        <SC.MenuItem key={item.key} isHome={isHome} active={active}>
                          <Link href={item.url || '/'}>{item.title}</Link>
                        </SC.MenuItem>
                      );
                    })}
                  </ul>
                </SC.Menu>
              )}
            </SC.Left>

            <SC.Right isHome={isHome}>
              {screenW > 1110 && props.isSearch && (
                <SC.SearchBox isHome={isHome}>
                  <Input
                    placeholder='Search models'
                    suffix={<Icon iconName='search' />}
                    onClick={() => dispatch(OpenSearch())}
                  />
                </SC.SearchBox>
              )}

              <SC.IconActionGroup isHome={isHome}>
                {screenW <= 1110 && (
                  <SC.IconAction className='search' onClick={() => dispatch(OpenSearch())}>
                    <Icon iconName='search' />
                  </SC.IconAction>
                )}

                <SC.IconAction className='cart' onClick={() => dispatch(OpenCart())}>
                  <Badge count={cartCount}>
                    <Icon iconName='shopping-cart' />
                  </Badge>
                </SC.IconAction>

                {auth?.token && auth?.user?.is_seller && (
                  <SC.IconAction className='upload' onClick={() => router.push('/upload-model')}>
                    <UploadOutlined className='my-icon' />
                  </SC.IconAction>
                )}

                <SC.IconAction className='btn-open-menu' onClick={() => dispatch(OpenMenuMobile())}>
                  <Icon iconName={'menu'} />
                </SC.IconAction>
              </SC.IconActionGroup>

              {!isMobile && !auth?.token && (
                <Button className='btn_login' type='link'>
                  <Link href='/login'>Login</Link>
                </Button>
              )}

              {!isMobile && auth?.token && !auth?.user?.is_seller && (
                <Button className='btn_seller' onClick={() => dispatch(OpenSellerRegister())}>
                  Become a seller
                </Button>
              )}

              {!isMobile && auth?.token && auth.user && (
                <HeaderUser isHome={isHome} user={auth.user} />
              )}
            </SC.Right>
          </ContainerLarge>
        </SC.Header__Nav>
      </SC.Wrapper>

      {(!isNotificationBar || pageYOffset > (topFixed || 0)) && (
        <div
          style={{
            height: (isNotificationBar ? headerRef.current?.clientHeight : 60) + 'px',
          }}
        />
      )}
    </>
  );
};

export default Header;

// Menu dropdown of Explore
const MenuDropdown = (props: { categories: CategoryModel[] }) => {
  const categoryLeft = [...props.categories].slice(0, props.categories.length / 2);
  const categoryRight = [...props.categories].slice(props.categories.length / 2);

  return (
    <SC.MenuDropdown>
      <Row>
        <Col span={12}>
          <ul className='menu_dropdown__main'>
            {categoryLeft.map((item) => {
              return (
                <li key={item.id}>
                  <Link href={`/explore/${changeToSlug(item.title)}--${item.id}`}>
                    <a>
                      <img src={item.icon} alt='' loading='lazy' />
                      <span>{item.title}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col span={12}>
          <ul className='menu_dropdown__main'>
            {categoryRight.map((item) => {
              return (
                <li key={item.id}>
                  <Link href={`/explore/${changeToSlug(item.title)}--${item.id}`}>
                    <a>
                      <img src={item.icon} alt='' loading='lazy' />
                      <span>{item.title}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Col>
      </Row>
    </SC.MenuDropdown>
  );
};
