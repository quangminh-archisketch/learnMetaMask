import Head from 'next/head';

import config from 'config';

import UserPageTabContent from '../Layout/TabContent';
import SettingProfile from './SettingProfile';
import SettingEmail from './SettingEmail';
import SettingPassword from './SettingPassword';
import SettingNotification from './SettingNotification';

import { UserPageSettingProps } from 'models/user.models';

import styled from 'styled-components';
import { ChangeRemMobileToPC, maxMedia } from 'styles/__media';

const MySettings = (props: UserPageSettingProps) => {
  const { auth, tabName } = props;

  return (
    <>
      <Head>
        <title>Settings | {config.websiteName}</title>
      </Head>

      <UserPageTabContent
        tabs={[
          {
            title: 'Profile',
            url: '/user/settings/profile',
            active: [null, 'profile'].includes(tabName),
          },
          { title: 'Email', url: '/user/settings/email', active: tabName === 'email' },
          {
            title: 'Password',
            url: '/user/settings/change-password',
            active: tabName === 'change-password',
          },
          {
            title: 'Notification',
            url: '/user/settings/notification',
            active: tabName === 'notification',
          },
        ]}
      />

      <MySettings_Content>
        {[null, 'profile'].includes(tabName) && <SettingProfile auth={auth} />}
        {tabName === 'email' && <SettingEmail user={auth?.user} />}
        {tabName === 'change-password' && <SettingPassword />}
        {tabName === 'notification' && <SettingNotification auth={auth} />}
      </MySettings_Content>
    </>
  );
};

export default MySettings;

const MySettings_Content = styled.div`
  padding: 26px 40px 40px;

  ${maxMedia.medium} {
    padding: 2rem 20px;
  }

  .Setting__Content {
    max-width: 640px;
    margin-top: 4.6rem;
  }
  .ant-form .ant-form-item {
    margin-bottom: 3rem;

    .ant-form-item-control-input-content {
      & > .ant-input,
      .ant-input-password .ant-input {
        height: 38px;
        border-radius: var(--border-radius-base);
      }
      .ant-input-password {
        padding: 0 1rem;
        border-radius: var(--border-radius-base);
      }
    }
  }
  .Btn__Submit {
    min-width: 224px;
    height: 41px;
    font-weight: 600;

    ${maxMedia.small} {
      height: ${ChangeRemMobileToPC('small', 4.2)};
    }
  }
`;
