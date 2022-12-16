import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';

import { SaveAuthRedux } from 'store/reducer/auth';
import userServices from 'services/user-services';
import showNotification from 'common/functions/showNotification';
import getBase64 from 'common/functions/getBase64';
import { messageError } from 'common/constant';

import AvatarUser from 'components/Pages/User/Fragments/AvatarUser';
import HeaderPage from '../Fragments/HeaderPage';

import { AuthModel } from 'models/page.models';
import { User3DSoftware, UserSkill } from 'constants/user.constant';

type Props = {
  auth?: AuthModel;
};

const SettingProfile = (props: Props) => {
  const dispatch = useDispatch();

  const { user } = props.auth || {};

  const [isLoading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<{ image: string; filename: string; filetype: string }>({
    image: user?.image || '',
    filename: '',
    filetype: '',
  });

  useEffect(() => {
    setAvatar((s) => ({ ...s, image: user?.image || '' }));
  }, [user]);

  const onSelectImage: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'done') {
      const image: any = await getBase64(info.file.originFileObj);
      setAvatar({ image, filename: info.file.name, filetype: info.file.type || '' });
    }
  };

  const onUpdateProfile = async (values: any) => {
    try {
      setLoading(true);

      let body = { ...values };
      if (avatar.image !== user?.image) {
        body = { ...body, ...avatar };
        body['oldImage'] = user?.image;
      }
      if (avatar.image.startsWith('https://avatars.dicebear.com') && user?.name !== values.name) {
        const avatarDefault = 'https://avatars.dicebear.com/api/initials/nickname.svg?r=50';
        body['image'] = avatarDefault.replace('nickname', values.name.trim().slice(0, 1));
      }

      const { error, data } = await userServices.updateProfile(body);
      if (!error) {
        dispatch(SaveAuthRedux({ ...props.auth, user: { ...props.auth?.user, ...data.user } }));
        message.success('Update profile successfully');
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      showNotification('error', {
        message: "Can't change avatar",
        description:
          (error?.status ? error?.status + ' - ' : '') +
          (error?.data?.message || messageError.an_unknown_error),
      });
    }
  };

  return (
    <>
      <HeaderPage
        title='Edit your personal profile'
        // subtitle='Profile'
        // caption='Edit information on your profile'
      />

      <SettingProfile__Content>
        <Form layout='vertical' onFinish={onUpdateProfile}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label='Avatar photo editing'>
                <AvatarUser avatar={avatar.image} onSelect={onSelectImage} />
              </Form.Item>
            </Col>

            <Col span={24} xl={12}>
              <Form.Item label='Username'>
                <Input value={user?.nickname} disabled />
              </Form.Item>

              <Form.Item
                label='Full Name'
                name='name'
                initialValue={user?.name}
                rules={[
                  { required: true, message: 'Please enter Full Name!' },
                  { whitespace: true, message: 'Full Name cannot be empty' },
                ]}>
                <Input disabled={isLoading} />
              </Form.Item>

              <Form.Item label='Position' name='work' initialValue={user?.work}>
                <Input disabled={isLoading} />
              </Form.Item>

              <Form.Item
                label='Website'
                name='website'
                initialValue={user?.website}
                rules={[
                  { type: 'url', message: 'The link you entered is not in the correct format' },
                ]}>
                <Input disabled={isLoading} />
              </Form.Item>
            </Col>

            <Col span={24} xl={12}>
              <Form.Item label='Your location' name='location' initialValue={user?.location}>
                <Input disabled={isLoading} />
              </Form.Item>

              <Form.Item
                label='A few sentences about yourself'
                name='introduce'
                initialValue={user?.introduce}>
                <Input.TextArea style={{ height: 222 }} disabled={isLoading} />
              </Form.Item>
            </Col>

            <Col span={24} xl={12}>
              <SettingProfile__FormItem>
                <Form.Item label='3D Software' name='softwares' initialValue={user?.softwares}>
                  <Checkbox.Group className='SettingProfile__ListTags'>
                    {User3DSoftware.map((tag) => {
                      return (
                        <Checkbox key={tag.id} value={tag.id} className='SettingProfile__TagItem'>
                          {tag.title}
                        </Checkbox>
                      );
                    })}
                  </Checkbox.Group>
                </Form.Item>
              </SettingProfile__FormItem>
            </Col>

            <Col span={24} xl={12}>
              <SettingProfile__FormItem>
                <Form.Item label='Skills' name='skills' initialValue={user?.skills}>
                  <Checkbox.Group className='SettingProfile__ListTags'>
                    {UserSkill.map((tag) => {
                      return (
                        <Checkbox key={tag.id} value={tag.id} className='SettingProfile__TagItem'>
                          {tag.title}
                        </Checkbox>
                      );
                    })}
                  </Checkbox.Group>
                </Form.Item>
              </SettingProfile__FormItem>
            </Col>
          </Row>

          <div className='text-center'>
            <Button type='primary' htmlType='submit' className='Btn__Submit' loading={isLoading}>
              Save
            </Button>
          </div>
        </Form>
      </SettingProfile__Content>
    </>
  );
};

export default SettingProfile;

const SettingProfile__Content = styled.div`
  margin-top: 27px;
`;
const SettingProfile__FormItem = styled.div`
  label {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-title);
  }
  .SettingProfile__ListTags {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    margin-top: 15px;

    .SettingProfile__TagItem {
      padding: 10px;
      font-size: 13px;
      font-weight: 400;
      line-height: 1.358;
      color: var(--text-caption);
      border: solid 1px var(--color-gray-5);
      border-radius: var(--border-radius-base);
      background-color: var(--color-gray-3);
      user-select: none;

      &.ant-checkbox-wrapper-checked {
        background-color: var(--color-gray-5);
      }
      & + .SettingProfile__TagItem {
        margin-left: 0;
      }
      .ant-checkbox {
        display: none;
      }
      span {
        padding: 0;
      }
    }
  }
`;
