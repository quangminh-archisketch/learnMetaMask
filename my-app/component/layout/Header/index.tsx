import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAppSelector } from 'redux/hooks';
import { selectAuthState } from 'redux/reducers/auth';

import { removeCookie } from 'common/functions';

import { tokenList } from 'common/constant';

import * as SC from './style';

const Header = () => {
  const { me }: any = useAppSelector(selectAuthState);

  const router = useRouter();

  const onLogout = () => {
    removeCookie([tokenList.TOKEN, tokenList.REFRESH_TOKEN]);
    localStorage.removeItem('me');

    axios.defaults.headers.common['Authorization'] = '';

    router.push('/login');
  };

  const menuUser = (
    <Menu
      items={[
        { key: 'profile', label: <Link href={'/profile'}>Profile</Link> },
        { type: 'divider' },
        { key: 'logout', label: 'Logout', onClick: onLogout },
      ]}
    />
  );

  return (
    <SC.Header_Wrapper id='header'>
      <Dropdown
        overlay={menuUser}
        trigger={['click']}
        arrow
        placement='bottomRight'
        overlayClassName='pt-1'
        getPopupContainer={() => document.getElementById('header') || document.body}>
        <div className='user-dropdown'>
          <Avatar size={28} src={me?.image || null} icon={<UserOutlined />} />
          {me?.name}
        </div>
      </Dropdown>
    </SC.Header_Wrapper>
  );
};

export default Header;
