import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import { CaretDownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';

import { UserModel } from 'models/user.models';
import { onLogout } from 'lib/utils/auth';

type Props = {
  isHome?: boolean;
  user: UserModel;
};

const HeaderUser = (props: Props) => {
  const { isHome, user } = props;
  const router = useRouter();

  const menu = (
    <Menu
      items={[
        user.is_seller
          ? { key: 'dashboard', label: <Link href={`/seller/dashboard`}>Seller Channel</Link> }
          : null,
        user.is_seller ? { type: 'divider' } : null,
        { key: 'my-orders', label: <Link href={`/user/my-orders`}>My Orders</Link> },
        { key: 'models', label: <Link href={`/user/models`}>My Models</Link> },
        { key: 'likes', label: <Link href={`/user/likes`}>Likes</Link> },
        // { key: 'coins', label: <Link href={`/user/coins`}>My Coins</Link> },
        { key: 'setting', label: <Link href={`/user/settings`}>Settings</Link> },
        { type: 'divider' },
        { key: 'Logout', label: 'Logout', onClick: () => onLogout(router) },
      ]}
    />
  );

  return (
    <Wrapper id='user_logged' isHome={isHome}>
      <Dropdown
        overlay={menu}
        placement='bottom'
        trigger={['click']}
        getPopupContainer={() => document.getElementById('user_logged') || document.body}>
        <div className='avatar'>
          <Avatar src={user.image} /> <CaretDownOutlined />
        </div>
      </Dropdown>
    </Wrapper>
  );
};

export default HeaderUser;

const Wrapper = styled.div<{ isHome?: boolean }>`
  display: flex;
  align-items: center;

  height: 4.2rem;
  padding: 0 0.5rem;
  border-radius: 3rem;
  transition: background-color 0.16s ease 0s;

  &:hover,
  &:has(.ant-dropdown:not(.ant-dropdown-hidden)) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .avatar {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    cursor: pointer;

    .anticon {
      font-size: 1.4rem;
      color: ${(props) => (props.isHome ? '#ffffff' : 'var(--color-gray-7)')};
    }
  }

  .ant-avatar {
    width: 3.4rem;
    height: 3.4rem;
  }

  .ant-dropdown-menu {
    min-width: 12rem;
    margin-top: 0.9rem;
    border-radius: 1rem;
    overflow: hidden;

    .ant-dropdown-menu-item {
      font-size: 1.4rem;
      line-height: 1.57;
      color: var(--color-gray-7);

      &:hover {
        color: var(--color-primary-700);
      }

      a {
        transition: all 100ms;
      }
    }
  }
`;
