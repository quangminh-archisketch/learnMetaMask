import { useDispatch } from 'react-redux';

import { message, UploadFile, UploadProps } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import { SaveAuthRedux } from 'store/reducer/auth';

import userServices from 'services/user-services';

import getBase64 from 'common/functions/getBase64';
import showNotification from 'common/functions/showNotification';
import { messageError } from 'common/constant';

import AvatarUser from '../User/Fragments/AvatarUser';
import Icon from 'components/Fragments/Icons';

import { AuthModel } from 'models/page.models';
import { UserSellerModel } from 'models/profileSeller';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

type Props = {
  auth: AuthModel | undefined;
  profileSeller: UserSellerModel | null;
  rating: {
    aggregate: {
      avg: {
        rate: number;
      };
    };
  };
};

const SideBar = (props: Props) => {
  const { profileSeller, auth, rating } = props;

  const dispatch = useDispatch();
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
    <SideBar_wrapper>
      <Sidebar_User>
        <AvatarUser
          avatar={profileSeller?.id === auth?.user?.id ? auth?.user?.image : profileSeller?.image}
          isUpload={profileSeller?.id === auth?.user?.id}
          onSelect={(info: UploadChangeParam<UploadFile>) => onSelectImage(info)}
        />
        <h5 className='user_name'>{profileSeller?.name}</h5>
        <p className='work'>{profileSeller?.work}</p>
      </Sidebar_User>
      {<hr />}

      <Sidebar_View>
        <div className='box'>
          <div className='box__icon'>
            <Icon iconName='star-rounded' />
            <p>Rating</p>
          </div>
          <p className='box__count'>
            {rating?.aggregate.avg.rate ? Math.round(rating?.aggregate.avg.rate * 10) / 10 : 0}
          </p>
        </div>
        <div className='box'>
          <div className='box__icon'>
            <Icon iconName='seller-eye' className='icon' />
            <p>Model views</p>
          </div>
          <p className='box__count'>
            {profileSeller?.market_items_aggregate?.aggregate.sum.viewed_count || 0}
          </p>
        </div>
        <div className='box'>
          <div className='box__icon'>
            <Icon iconName='product-like' className='icon' />
            <p>Model likes</p>
          </div>
          <p className='box__count'>
            {profileSeller?.market_items_aggregate?.aggregate.sum.like_count || 0}
          </p>
        </div>
      </Sidebar_View>

      {<hr />}

      <SideBar_Link>
        <h3 className='title'>Website</h3>
        {profileSeller?.website && (
          <a
            href={profileSeller?.website}
            className='title__content'
            target='_blank'
            rel='noreferrer'>
            {profileSeller?.website}
          </a>
        )}
      </SideBar_Link>

      {<hr />}

      <SideBar_Software>
        <h3 className='title'>3D Software</h3>
        {profileSeller?.softwares && (
          <div className='tag__group title__content'>
            {profileSeller?.softwares?.map((soft, index) => (
              <span className='tag' key={index}>
                {soft}
              </span>
            ))}
          </div>
        )}
      </SideBar_Software>

      {<hr />}

      <h3 className='title'>Skills</h3>

      {profileSeller?.skills && (
        <div className='tag__group title__content'>
          {profileSeller?.skills?.map((skill, index) => (
            <span className='tag' key={index}>
              {skill}
            </span>
          ))}
        </div>
      )}
    </SideBar_wrapper>
  );
};

const SideBar_wrapper = styled.div`
  hr {
    margin: 20px 0;
    border-color: var(--color-gray-4);
  }

  h3.title {
    font-size: 16px;
    color: #1f1f1f;
    font-weight: 500;
  }

  .title__content {
    margin-top: 10px;
  }

  .tag {
    display: inline-block;
    padding: 7px;
    color: var(--color-gray-9);
    font-size: 14px;
    background-color: var(--color-gray-5);
    border-radius: 5px;
  }

  .tag__group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 10px;
  }
`;

const Sidebar_User = styled.div`
  padding: 20px 20px 0;
  text-align: center;

  ${maxMedia.medium} {
    padding: 20px;
    background-color: var(--userPage_backgroundColorMain);
  }

  .user_name {
    margin: 14px 0 5px 0;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.88px;
    color: var(--text-title);
  }

  .nickname {
    font-size: 14px;
    color: var(--color-gray-9);
  }

  hr {
    margin: 20px 0;
    border-color: var(--color-line);
  }
`;

const Sidebar_View = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;

    &__icon {
      display: flex;
      gap: 6.7px;
      align-items: center;
      color: var(--color-gray-11);
    }

    .star-rounded {
      svg {
        width: auto;
        height: 17px;

        path {
          fill: var(--color-gray-11);
        }
      }
    }

    .product-like svg {
      width: auto;
      height: 16px;

      path {
        fill: var(--color-gray-11);
      }
    }

    .seller-eye svg {
      width: auto;
      height: 15px;

      path {
        opacity: 1;
        fill: transparent;
        stroke: var(--color-gray-11);
      }
    }

    &__count {
      color: var(--color-gray-9);
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

const SideBar_Link = styled.div`
  a {
    display: block;
    max-width: 100%;
    color: var(--color-gray-9);
    word-break: break-all;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;

    &:hover {
      color: var(--color-primary-700);
    }
  }
`;

const SideBar_Software = styled.div``;

export default SideBar;
