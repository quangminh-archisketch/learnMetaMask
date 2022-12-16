import { Dispatch, SetStateAction, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined, StarFilled } from '@ant-design/icons';
import moment from 'moment';

import { changeToSlug } from 'common/functions';
import { UpdateNotification } from 'store/reducer/web';

import Icon from 'components/Fragments/Icons';

import { NotificationModel } from 'models/notification.models';
import notificationServices from 'services/notification-services';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

type Props = {
  dataRender: NotificationModel;
  setNotification: Dispatch<SetStateAction<{ dataRender: NotificationModel[]; total: number }>>;
};

const NotificationCart = ({ dataRender, setNotification }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const notiCardRef = useRef<HTMLDivElement>(null);

  const getMarkRead = async (id: string) => {
    try {
      notiCardRef.current?.classList.remove('visible');
      const { error } = await notificationServices.markRead(id);
      if (!error) {
        setNotification((prevState) => ({
          ...prevState,
          dataRender: prevState.dataRender?.map((item) =>
            item.id === id ? { ...item, is_read: true } : { ...item }
          ),
        }));
        dispatch(UpdateNotification({ type: 'down' }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDelRead = async (id: string) => {
    try {
      notiCardRef.current?.classList.remove('visible');
      const { error } = await notificationServices.deleteRead(id);
      if (!error) {
        setNotification((prevState) => ({
          ...prevState,
          dataRender: prevState.dataRender?.filter((item) => item.id !== id),
        }));
        if (!dataRender.is_read) dispatch(UpdateNotification({ type: 'down' }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelGoToNotification = () => {
    if (dataRender?.is_read === false) getMarkRead(dataRender?.id);
    router.push(
      '/product/' +
        changeToSlug(dataRender?.market_item.title) +
        '--' +
        dataRender?.market_item.id +
        '#' +
        (dataRender?.type === 2 ? 'comment' : 'review')
    );
  };

  return (
    <Wrapper ref={notiCardRef} onClick={handelGoToNotification}>
      <div className='Notification_Left'>
        <div className='Notification_Icon'>
          {(dataRender?.type === 2 && (
            <Icon style={{ color: '#3fc1d1' }} iconName='noti-comment' />
          )) ||
            (dataRender?.type === 1 && <StarFilled style={{ color: '#ffc043' }} />)}
        </div>
        <div className='Noti_Card_Info'>
          <img className='img-avatar' src={dataRender.market_user_sender?.image} alt='' />

          <div className='Noti_Info_Card'>
            <p className='Noti_Info_Title '>
              <span className='Noti_Info_Name'>{dataRender?.market_user_sender?.name}</span>
              <span className='Noti_Info_Comment'> {dataRender?.content} </span>
              <span className='Noti_Info_Address'>{dataRender?.market_item?.title}</span>
            </p>
            <div className='Noti__Time'>
              <p>
                {moment().diff(dataRender?.createdAt, 'hours') < 24
                  ? moment(dataRender?.createdAt).fromNow()
                  : moment(dataRender?.createdAt).format('DD/MM/YYYY')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='Notification_Right'>
        <div className='Notification_Filter' style={{ cursor: 'pointer' }}>
          <Dropdown
            trigger={['click']}
            className='Filer_Comment_Right'
            placement='bottomRight'
            arrow={{ pointAtCenter: true }}
            getPopupContainer={(elm) => elm || document.body}
            onVisibleChange={(visible) =>
              notiCardRef.current?.classList[visible ? 'add' : 'remove']('visible')
            }
            overlay={
              <Menu
                items={[
                  !dataRender.is_read
                    ? {
                        key: 1,
                        label: 'Mark as read',
                        onClick: (e) => {
                          e.domEvent.stopPropagation();
                          getMarkRead(dataRender.id);
                        },
                      }
                    : null,
                  !dataRender.is_read ? { type: 'divider' } : null,
                  {
                    key: 3,
                    label: 'Delete notification',
                    style: { color: '#f43d4f' },
                    onClick: (e) => {
                      e.domEvent.stopPropagation();
                      getDelRead(dataRender.id);
                    },
                  },
                ]}
              />
            }>
            <div className='icon-filter-dropdown' onClick={(e) => e.stopPropagation()}>
              <EllipsisOutlined className='icon__filter' />
            </div>
          </Dropdown>
        </div>
        <div className={'Noti_Sight_Read' + (dataRender.is_read === true ? ' hidden' : '')} />
      </div>
    </Wrapper>
  );
};
export default NotificationCart;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 12px;
  cursor: pointer;

  &:hover,
  &.visible {
    background-color: var(--color-gray-3);
    .icon-filter-dropdown {
      opacity: 1;
      visibility: visible;
    }
  }

  ${maxMedia.medium} {
    padding: 10px 20px 10px 22px;
  }
  .Notification_Left {
    display: flex;
    flex-wrap: nowrap;
    .Notification_Icon {
      display: inline-block;
      svg {
        width: 20px;
        height: 20px;
      }
    }
    .img-avatar {
      margin-right: 5px;
      margin-left: 7px;
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }

    .Noti_Card_Info {
      display: flex;
      flex-wrap: nowrap;
    }
    .Noti_Info_Card {
      font-size: 14px;
      font-weight: 600;
      line-height: 19px;
      color: var(--color-gray-9);
      .Noti_Info_Title {
        .Noti_Info_Name {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-gray-11);
        }
        .Noti_Info_Comment {
          font-size: 14px;
          font-weight: 400;
          color: var(--color-gray-9);
        }
        .Noti_Info_Address {
          font-size: 14px;
        }
      }
      .Noti__Time {
        font-size: 12px;
        font-weight: 400;
        color: var(--color-gray-7);
        margin-top: 4px;
      }
    }
  }
  .Notification_Right {
    display: flex;
    align-items: center;
    gap: 10px;
    .Notification_Filter {
      .icon__filter {
        width: 24px;
        height: 14px;
        ${maxMedia.medium} {
          width: 24px;
          height: 12px;
        }
        ${maxMedia.small} {
          width: 24px;
          height: 12px;
        }
        ${maxMedia.xsmall} {
          width: 24px;
          height: 8px;
        }
      }
      ${maxMedia.medium} {
        margin-right: -5px;
      }
    }
    .Noti_Sight_Read {
      background: #cf293f;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      &.hidden {
        background: transparent;
      }
    }
  }

  .icon-filter-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: transparent;

    opacity: 0;
    visibility: hidden;

    &:hover,
    &:has(.ant-dropdown:not(.ant-dropdown-hidden)) {
      background-color: var(--color-gray-5);
    }
  }

  .ant-table-thead {
    display: none;
  }
  .ant-dropdown-menu-item {
    white-space: nowrap;
    width: 300px;
    ${maxMedia.small} {
      white-space: nowrap;
    }
  }
`;
