import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

import showNotification from 'common/functions/showNotification';
import { messageError } from 'common/constant';
import userServices from 'services/user-services';

import HeaderPage from '../Fragments/HeaderPage';

import { UserModel } from 'models/user.models';
import { useState } from 'react';

type Props = {
  user?: UserModel;
};

const SettingEmail = (props: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOTP, setOTP] = useState<boolean>(false);
  const [isSucceeded, setChangeSuccess] = useState<boolean>(false);

  const onGetOtp = async () => {
    try {
      setLoading(true);
      const { error } = await userServices.getOTPChangeEmail();
      if (!error) {
        showNotification('success', {
          message: 'OTP code has been sent to your email',
          description: (
            <>
              OTP has been sent to{' '}
              <b>
                <i>{props.user?.email}</i>
              </b>
              , please check your email
            </>
          ),
        });
        setOTP(true);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      showNotification('error', {
        message: 'Error',
        description:
          (error?.status ? error?.status + ' - ' : '') +
          (error?.data?.message || messageError.an_unknown_error),
      });
    }
  };

  const onChangeEmail = async (values: { new_email: string; otp: string }) => {
    try {
      setLoading(true);
      const { error } = await userServices.changeEmail(values);
      if (!error) {
        setChangeSuccess(true);
        onSuccess(values.new_email);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      showNotification('error', {
        message: 'Error',
        description:
          (error?.status ? error?.status + ' - ' : '') +
          (error?.data?.message || messageError.an_unknown_error),
      });
    }
  };

  const onSuccess = (email: string) => {
    showNotification('success', {
      message: 'Email change request has been sent',
      description: (
        <>
          Please check your email{' '}
          <b>
            <i>{email}</i>
          </b>{' '}
          to confirm your email change request
        </>
      ),
    });
  };

  const onAddEmail = async (values: { email: string }) => {
    try {
      setLoading(true);
      const { otp } = await userServices.getOTPChangeEmail();
      const { error } = await userServices.changeEmail({ otp, new_email: values.email });
      if (!error) onSuccess(values.email);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      showNotification('error', {
        message: 'Error',
        description:
          (error?.status ? error?.status + ' - ' : '') +
          (error?.data?.message || messageError.an_unknown_error),
      });
    }
  };

  return (
    <>
      <HeaderPage
        title='Change Email address'
        // subtitle='Email'
        // caption='Please enter your new Email'
      />

      <SettingEmail__Content className='Setting__Content'>
        <Form
          layout='vertical'
          onFinish={(values) =>
            typeof props.user?.email === 'string' && props.user?.email.length > 0
              ? onChangeEmail(values)
              : onAddEmail(values)
          }>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: !props.user?.email, message: 'Please enter a new email address' },
              { type: 'email', message: 'The email you entered is not in the correct format' },
            ]}
            initialValue={props.user?.email}>
            <Input
              disabled={typeof props.user?.email === 'string' && props.user?.email.length > 0}
            />
          </Form.Item>

          {typeof props.user?.email === 'string' && props.user?.email.length > 0 && !isSucceeded && (
            <>
              <Form.Item
                label='New Email'
                name='new_email'
                rules={[
                  { required: true, message: 'Please enter a new email address' },
                  { type: 'email', message: 'The email you entered is not in the correct format' },
                ]}>
                <Input />
              </Form.Item>

              <Form.Item label='OTP' name='otp' rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <div className='settingEmail__Btn'>
                {!isOTP && (
                  <Button
                    type='primary'
                    className='Btn__Submit'
                    loading={isLoading}
                    onClick={onGetOtp}>
                    Send OTP
                  </Button>
                )}

                {isOTP && (
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='Btn__Submit'
                    loading={isLoading}>
                    Change Email
                  </Button>
                )}
              </div>
            </>
          )}

          {!props.user?.email && (
            <div className='settingEmail__Btn'>
              <Button type='primary' htmlType='submit' className='Btn__Submit' loading={isLoading}>
                Update Email
              </Button>
            </div>
          )}
        </Form>
      </SettingEmail__Content>
    </>
  );
};

export default SettingEmail;

const SettingEmail__Content = styled.div`
  .settingEmail__Btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
`;
