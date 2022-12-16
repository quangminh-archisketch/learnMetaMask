import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { UpOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Collapse, Drawer } from 'antd';

import urlPage from 'constants/url.constant';
import useWindowSize from 'hooks/useWindowSize';
import { onLogout } from 'lib/utils/auth';
import { changeToSlug } from 'common/functions';
import { AppState } from 'store/type';
import { CloseMenuMobile, OpenCart, OpenSearch } from 'store/reducer/modal';

import Icon from 'components/Fragments/Icons';
import SocialInBanner from 'components/Fragments/SocicalBanner';

import { PageProps } from 'models/page.models';

import * as SC from './style';
import { IconAction, IconActionGroup } from '../Header/style';

const MenuMobile = (props: PageProps) => {
  const { auth } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const visible = useSelector((state: AppState) => state.modal.menuMobile);
  const cartCount: number = useSelector((state: AppState) => state.cart.products?.length || 0);
  const categories = useSelector((state: AppState) => state.web.categories);
  const [width] = useWindowSize();

  useEffect(() => {
    if (visible || (visible && width > 991)) dispatch(CloseMenuMobile());
  }, [width, router]);

  useEffect(() => {
    if (visible) document.body.style.overflowY = 'hidden';
    else document.body.style.removeProperty('overflow-y');
  }, [visible]);

  return (
    <Drawer
      placement='right'
      closable={false}
      width='100%'
      bodyStyle={{ padding: '0' }}
      visible={visible}
      onClose={() => dispatch(CloseMenuMobile())}>
      <SC.MenuMobile_Wrapper>
        <SC.MenuMobile_Header>
          <Icon iconName='logo-main' />
          <IconActionGroup>
            <IconAction
              className='search'
              onClick={() => {
                dispatch(CloseMenuMobile());
                dispatch(OpenSearch());
              }}>
              <Icon iconName='search' />
            </IconAction>

            <IconAction
              className='cart'
              onClick={() => {
                dispatch(CloseMenuMobile());
                dispatch(OpenCart());
              }}>
              <Badge count={cartCount}>
                <Icon iconName='shopping-cart' />
              </Badge>
            </IconAction>

            <Icon iconName='close' onClick={() => dispatch(CloseMenuMobile())} />
          </IconActionGroup>
        </SC.MenuMobile_Header>

        <SC.MenuMobile_Content>
          {auth?.token && (
            <SC.UserCollapse>
              <Collapse
                defaultActiveKey='user'
                expandIcon={({ isActive }) => <UpOutlined rotate={isActive ? 180 : 0} />}
                expandIconPosition='end'>
                <Collapse.Panel
                  key='user'
                  header={
                    <div className='user-avatar'>
                      <Avatar src={auth?.user?.image} />
                      <h4>{auth?.user?.name}</h4>
                    </div>
                  }>
                  <ul>
                    {auth?.user?.is_seller ? (
                      <li>
                        <Link href={`/seller/dashboard`}>Dashboard</Link>
                      </li>
                    ) : (
                      ''
                    )}
                    <li className={router.asPath === urlPage.my_order ? 'active' : ''}>
                      <Link href={`/user/my-orders`}>My Orders</Link>
                    </li>
                    <li className={router.asPath.startsWith(urlPage.my_model) ? 'active' : ''}>
                      <Link href={`/user/models`}>My Models</Link>
                    </li>
                    <li className={router.asPath === urlPage.my_model_like ? 'active' : ''}>
                      <Link href={`/user/likes`}>Likes</Link>
                    </li>
                    {/* <li>
                      <Link href={`/user/coins`}>Coins</Link>
                    </li> */}
                    <li className={router.asPath.startsWith(urlPage.my_settings) ? 'active' : ''}>
                      <Link href={`/user/settings`}>Settings</Link>
                    </li>
                    <li>
                      <span onClick={() => onLogout(router)}>Logout</span>
                    </li>
                  </ul>
                </Collapse.Panel>
              </Collapse>
            </SC.UserCollapse>
          )}

          {!auth?.token && (
            <SC.MenuBtnAction>
              <Button type='primary' shape='round'>
                <Link href='/login'>Login</Link>
              </Button>
            </SC.MenuBtnAction>
          )}

          {/* {auth?.token && (
            <SC.MenuBtnAction>
              <Button type='primary' shape='round'>
                Upload
              </Button>
            </SC.MenuBtnAction>
          )} */}

          <SC.MenuList>
            <Collapse
              defaultActiveKey={
                router.asPath.startsWith('/explore') && !router.asPath.includes('sort=best-selling')
                  ? 'explore'
                  : undefined
              }
              expandIcon={({ isActive }) => <UpOutlined rotate={isActive ? 180 : 0} />}
              expandIconPosition='end'>
              <Collapse.Panel header={<span>Explore</span>} key='explore'>
                <ul>
                  <li
                    className={
                      router.asPath.startsWith(urlPage.explore.replace('{category}', 'all')) &&
                      !router.asPath.includes('sort=best-selling')
                        ? 'active'
                        : ''
                    }>
                    <Link href='/explore/all'>All Category</Link>
                  </li>
                  {categories?.map((cate) => {
                    return (
                      <li
                        key={cate.id}
                        className={
                          router.asPath.includes(cate.id) &&
                          !router.asPath.includes('sort=best-selling')
                            ? 'active'
                            : ''
                        }>
                        <Link href={'/explore/' + changeToSlug(cate.title) + '--' + cate.id}>
                          {cate.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Collapse.Panel>
              <Collapse.Panel
                className={
                  'collapse-item-no-content' +
                  (router.asPath.includes('sort=best-selling') ? ' active' : '')
                }
                header={<Link href='/explore/all?sort=best-selling'>Best Selling</Link>}
                key='best-selling'
                showArrow={false}
                collapsible='header'
              />
              <Collapse.Panel
                className={
                  'collapse-item-no-content' +
                  (router.asPath.startsWith('/sale-off') ? ' active' : '')
                }
                header={<Link href='/sale-off/all'>Sale Off 50%</Link>}
                key='sale-off'
                showArrow={false}
                collapsible='header'
              />
            </Collapse>
          </SC.MenuList>

          <SC.SocialList>
            <SocialInBanner size='large' color='#4d4d4d' />
          </SC.SocialList>
        </SC.MenuMobile_Content>
      </SC.MenuMobile_Wrapper>
    </Drawer>
  );
};

export default MenuMobile;
