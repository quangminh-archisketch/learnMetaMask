import { useRef } from 'react';

import { Button, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import notificationServices from 'services/notification-services';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

type Props = {
  onChangeToRead: () => void;
  onChangeToDelete: () => void;
};
const Header = (props: Props) => {
  const wrapperRef = useRef<HTMLElement>(null);

  const allReadData = async () => {
    try {
      const { error } = await notificationServices.markAllRead(null);
      if (!error) props.onChangeToRead();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReadData = async () => {
    try {
      const { error } = await notificationServices.deleteAllRead();
      if (!error) props.onChangeToDelete();
    } catch (error) {
      console.log(error);
    }
  };

  const menuNotification = (
    <Menu
      items={[
        { key: '1', label: 'Mark all as read', onClick: allReadData },
        {
          key: '2',
          label: 'Delete all notification',
          style: { color: '#f43d4f' },
          onClick: deleteReadData,
        },
      ]}
    />
  );

  return (
    <Wrapper ref={wrapperRef}>
      <h1>Notification</h1>
      <Dropdown
        getPopupContainer={() => wrapperRef.current || document.body}
        trigger={['click']}
        overlay={menuNotification}
        placement='bottomRight'
        arrow={{ pointAtCenter: true }}>
        <Button shape='circle' type='text'>
          <EllipsisOutlined />
        </Button>
      </Dropdown>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  ${maxMedia.medium} {
    padding: 10px 20px;
  }
  h1 {
    font-size: 18px;
    font-weight: 500;
    color: var(--color-gray-11);
  }

  .ant-dropdown-menu {
    width: 300px;
  }
  .ant-btn {
    padding: 0;
    min-width: unset;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: var(--color-gray-5);
    }
    .anticon {
      font-size: 18px;
      color: var(--color-gray-7);
    }
  }
`;
