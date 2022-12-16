import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { SaveAuthRedux } from 'store/reducer/auth';

import styled from 'styled-components';
import { Button, message, Switch } from 'antd';

import userServices from 'services/user-services';
import showNotification from 'common/functions/showNotification';
import { messageError } from 'common/constant';

import HeaderPage from '../Fragments/HeaderPage';

import { AuthModel } from 'models/page.models';

import { maxMedia } from 'styles/__media';

const SettingNotification = ({ auth }: { auth: AuthModel }) => {
  const dispatch = useDispatch();

  const [noti, setNoti] = useState<{ email_subscription: boolean }>({
    email_subscription: auth.user?.email_subscription || false,
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setNoti((n) => ({ ...n, email_subscription: auth.user?.email_subscription || false }));
  }, [auth]);

  const onUpdateNoti = async () => {
    try {
      setLoading(true);
      const { error } = await userServices.updateNotification(noti);
      if (!error) {
        message.success('Update successful');
        auth.user && dispatch(SaveAuthRedux({ ...auth, user: { ...auth.user, ...noti } }));
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      showNotification('error', {
        message: 'Update failed',
        description:
          (error?.status ? error?.status + ' - ' : '') +
          (error?.data?.message || messageError.an_unknown_error),
      });
    }
  };

  return (
    <>
      <HeaderPage
        title='Announcement of events and benefits'
        // subtitle='Notification'
        // caption='Find out event information quickly, such as deals, coupons, and more.'
      />

      <SettingNotification__Content className='Setting__Content'>
        <SettingNotification__Card>
          <div className='Setting__Card__Content'>
            <p>Email</p>
            <p>You can receive various content by email</p>
          </div>
          <Switch
            checked={noti.email_subscription}
            onChange={(checked) => setNoti((n) => ({ ...n, email_subscription: checked }))}
          />
        </SettingNotification__Card>

        <Button
          type='primary'
          htmlType='submit'
          className='Btn__Submit'
          loading={isLoading}
          onClick={onUpdateNoti}>
          Save
        </Button>
      </SettingNotification__Content>
    </>
  );
};

export default SettingNotification;

const SettingNotification__Content = styled.div`
  .Btn__Submit {
    margin-top: 4rem;
  }
`;

const SettingNotification__Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  max-width: 47rem;
  padding: 3.1rem 4.6rem;

  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 7%) 0.2rem 0.2rem 1.1rem 0px;

  ${maxMedia.xsmall} {
    max-width: unset;
    padding: 15px 20px;
  }

  .Setting__Card__Content {
    p:first-child {
      font-size: 16px;
      font-weight: 500;
      color: var(--color-primary-700);
    }
    p:last-child {
      margin-top: 0.4rem;
      font-size: 12px;
      color: var(--color-gray-7);
    }
  }
`;
