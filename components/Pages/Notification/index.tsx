import styled from 'styled-components';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { Divider, Button, Tabs, Select, Spin } from 'antd';

import { UpdateNotification } from 'store/reducer/web';
import notificationServices from 'services/notification-services';

import Header from './Header';
import NotificationCard from './Fragments/NotificationCard';
import Empty from './Fragments/Empty';

import { NotificationModel } from 'models/notification.models';

import { maxMedia } from 'styles/__media';
import { Container } from 'styles/__styles';

type NotiType = 'all' | 'review' | 'comment';
type NotiSort = 'all' | 'read' | 'unread';

type Props = {
  isPopup?: boolean;
};

const Notification = (props: Props) => {
  const router = useRouter();
  const [loadingNoti, setLoadingNoti] = useState<boolean>(true);
  const [notiType, setNotiType] = useState<NotiType>('all');
  const [notiSort, setNotiSort] = useState<NotiSort | string>('all');
  const [notifications, setNotification] = useState<{
    dataRender: NotificationModel[];
    total: number;
  }>({ dataRender: [], total: 0 });

  //dispatch redux
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    fetchData();
  }, [notiType, notiSort]);

  const fetchData = async (loadmore?: boolean) => {
    try {
      let param: { is_read?: boolean; type?: 1 | 2 } = {};
      if (notiType !== 'all') param['type'] = notiType === 'review' ? 1 : 2;
      if (notiSort !== 'all') param['is_read'] = notiSort === 'read' ? true : false;

      const { data, total, error } = await notificationServices.getAllNotification(
        props.isPopup ? 5 : 10,
        notifications?.dataRender.length || 0,
        param
      );
      if (!error && data) {
        setNotification((noti) => ({
          ...noti,
          dataRender: loadmore && noti.dataRender ? noti.dataRender.concat(data) : data,
          total: total,
        }));
      } else setNotification({ dataRender: [], total: 0 });

      setLoadingNoti(false);
    } catch (error) {
      setLoadingNoti(false);
    }
  };

  const onChangeToRead = () => {
    setNotification((n) => ({
      ...n,
      dataRender: n.dataRender.map((i) => ({ ...i, is_read: true })),
    }));
    dispatch(UpdateNotification({ type: 'reset' }));
  };

  const onChangeToDelete = () => {
    setNotification({ dataRender: [], total: 0 });
    dispatch(UpdateNotification({ type: 'reset' }));
  };

  const operations = (
    <Select
      placeholder='Filter'
      getPopupContainer={(elm) => elm || document.body}
      defaultValue='all'
      options={[
        { label: 'All', value: 'all' },
        { label: 'Read', value: 'read' },
        { label: 'Unread', value: 'unread' },
      ]}
      onChange={(value) => {
        setLoadingNoti(true);
        setNotification({ dataRender: [], total: 0 });
        setNotiSort(value);
      }}
    />
  );

  return (
    <Wrapper>
      <Container className={!props.isPopup ? 'container-mobile' : ''}>
        <Header onChangeToRead={onChangeToRead} onChangeToDelete={onChangeToDelete} />
        <Divider />
        <div className='tabName'>
          <Tabs
            defaultActiveKey='all'
            type='line'
            tabBarExtraContent={!props.isPopup ? operations : undefined}
            onChange={(key) => {
              setLoadingNoti(true);
              setNotification({ dataRender: [], total: 0 });
              setNotiType(key === 'all' ? 'all' : key === 'review' ? 'review' : 'comment');
            }}>
            <Tabs.TabPane tab='All' key='all'></Tabs.TabPane>
            <Tabs.TabPane tab='Review' key='review'></Tabs.TabPane>
            <Tabs.TabPane tab='Comment' key='comment'></Tabs.TabPane>
          </Tabs>

          {loadingNoti ? (
            <Spin spinning size='default' />
          ) : (
            <>
              {notifications?.dataRender && notifications?.dataRender.length > 0 ? (
                notifications?.dataRender.map((noti, index) => {
                  return (
                    <Fragment key={index}>
                      <NotificationCard dataRender={noti} setNotification={setNotification} />
                      <Divider />
                    </Fragment>
                  );
                })
              ) : (
                <Empty title='You do not have any notification' />
              )}
            </>
          )}

          {!props.isPopup &&
            notifications &&
            notifications.dataRender?.length < notifications?.total && (
              <div className='Notification__LoadMores' onClick={() => fetchData(true)}>
                <Button type='primary' loading={loadingNoti}>
                  Load more{' '}
                </Button>
              </div>
            )}
          {props.isPopup && notifications && notifications?.dataRender.length > 0 && (
            <Button
              className='btn-see-more'
              type='text'
              onClick={() => router.push('/notification')}>
              See all notification
            </Button>
          )}
        </div>
      </Container>
    </Wrapper>
  );
};

export default Notification;

const Wrapper = styled.main`
  padding: 20px 0 40px;
  .container-mobile {
    padding: 0 50px;
    ${maxMedia.medium} {
      padding: 0;
    }
  }
  ${maxMedia.medium} {
    margin: 0;
    padding-bottom: 80px;
    padding-top: 0;
  }
  .ant-spin {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  margin: 0 auto 80px auto;
  .ant-divider-horizontal {
    margin: 0;
  }
  .ant-tabs-tab-btn {
    font-size: 13px;
    font-weight: 400;
    color: var(--color-gray-6);
  }
  .ant-tabs-tab-active {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-primary-700);
  }
  .ant-select-selection-placeholder {
    color: var(--color-gray-8);
    font-size: 14px;
    font-weight: 400;
  }
  .ant-select {
    width: 100px;
    .ant-select-dropdown {
      .ant-select-item {
        font-size: 14px;
        font-weight: 400;
        color: var(--text-caption);

        &:hover.ant-select-item-option-active {
          background-color: var(--color-primary-50);
        }
        &.ant-select-item-option-active {
          background-color: transparent;
        }
        &.ant-select-item-option-selected {
          background-color: var(--color-primary-100);
        }
      }
    }
  }
  .Notification__LoadMores {
    margin: 40px 0 40px 0;
    text-align: center;
    .ant-btn {
      font-size: 12px;
      line-height: 1;
      text-transform: uppercase;
    }
    ${maxMedia.small} {
      margin: 0;
    }
  }
  .Notification_LoadMore_None {
    display: none;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin: 0;
    padding: 0 10px;
    ${maxMedia.medium} {
      padding: 0 20px;
    }
  }
`;
