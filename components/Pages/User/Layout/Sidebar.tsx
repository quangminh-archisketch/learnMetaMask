import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { SaveAuthRedux } from 'store/reducer/auth';

import moment from 'moment';
import styled from 'styled-components';
import { Button, message, UploadProps } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';

import useWindowSize from 'hooks/useWindowSize';

import getBase64 from 'common/functions/getBase64';
import showNotification from 'common/functions/showNotification';
import { messageError } from 'common/constant';
import userServices from 'services/user-services';

import Icon from 'components/Fragments/Icons';
import UserSidebarTabs from 'components/Pages/User/Layout/SidebarTabs';
import AvatarUser from 'components/Pages/User/Fragments/AvatarUser';

import { UserPageTabName } from 'models/user.models';
import { AuthModel } from 'models/page.models';

import { maxMedia } from 'styles/__media';

type Props = {
  tabName: UserPageTabName;
  auth?: AuthModel;
};

const UserPageSidebar = (props: Props) => {
  const dispatch = useDispatch();
  const [screenW] = useWindowSize();

  const { auth, tabName } = props;

  const onSelectImage: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'done') {
      try {
        const image: any = await getBase64(info.file.originFileObj);
        const { error, data } = await userServices.changeAvatar({
          oldImage: auth?.user?.image,
          image,
          filename: info.file.name,
          filetype: info.file.type || '',
        });

        if (!error) {
          dispatch(SaveAuthRedux({ ...props.auth, user: { ...props.auth?.user, ...data.user } }));
          message.success('Change avatar successfully');
        }
      } catch (error: any) {
        showNotification('error', {
          message: "Can't change avatar",
          description:
            (error?.status ? error?.status + ' - ' : '') +
            (error?.data?.message || messageError.an_unknown_error),
        });
      }
    }
  };

  return (
    <UserPageSidebar_Wrapper>
      <UserPageSidebar_User>
        <AvatarUser
          avatar={auth?.user?.image}
          onSelect={(info: UploadChangeParam<UploadFile>) => onSelectImage(info)}
        />
        <h5 className='user_name'>{auth?.user?.name}</h5>
        <Button shape='round'>
          <Link href='/user/settings'>Edit Profile</Link>
        </Button>
        {screenW > 992 && <hr />}
      </UserPageSidebar_User>

      <UserSidebarTabs tabName={tabName} />

      {screenW > 992 && auth?.user && (
        <UserPageSidebar_RegisterSince>
          MEMBER SINCE: {moment(auth?.user.createdAt).format('MMMM DD, YYYY').toUpperCase()}
        </UserPageSidebar_RegisterSince>
      )}

      {screenW > 992 && (
        <UserPageSidebar_Footer>
          <Icon iconName='logo-main' />
          <Button shape='round'>
            <Link href='/contact-us'>Contact Us</Link>
          </Button>
        </UserPageSidebar_Footer>
      )}
    </UserPageSidebar_Wrapper>
  );
};

export default UserPageSidebar;

const UserPageSidebar_Wrapper = styled.aside`
  position: sticky;
  top: 8rem;
  align-self: start;

  border-radius: 0.5rem;
  background-color: var(--color-white);
  box-shadow: var(--box-shadow);

  ${maxMedia.medium} {
    position: inherit;
    border-radius: 0;
    box-shadow: none;
  }
`;

const UserPageSidebar_User = styled.div`
  padding: 20px 20px 0;
  text-align: center;

  ${maxMedia.medium} {
    padding: 20px;
    background-color: var(--userPage_backgroundColorMain);
  }

  .user_name {
    margin-top: 1.9rem;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.88px;
    color: var(--text-title);
  }
  .ant-btn {
    margin-top: 10px;
    color: var(--color-primary-700);
    border-color: var(--color-primary-700);
  }
  hr {
    margin: 2rem 0 0;
    border-color: var(--color-line);
  }
`;

const UserPageSidebar_RegisterSince = styled.div`
  padding: 3rem 0.9rem;

  font-size: 1.1rem;
  line-height: 1.45;
  letter-spacing: -0.22px;
  color: var(--text-caption);
  text-align: center;
`;

const UserPageSidebar_Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 1.6rem;

  background-color: var(--color-main-1);
  text-align: center;

  .my-icon.logo-main svg {
    height: 2rem;
    width: auto;
    color: var(--text-title);
  }
  .ant-btn {
    font-size: 12px;
    color: var(--color-primary-700);
    border-color: var(--color-primary-700);
  }
`;
