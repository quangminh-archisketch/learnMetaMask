import { useState } from 'react';
import Link from 'next/link';

import { Button, Form, Input } from 'antd';

import { messageError } from 'common/constant';
import showNotification from 'common/functions/showNotification';
import userServices from 'services/user-services';

import Icon from 'components/Fragments/Icons';

import * as LoginStyle from 'components/Pages/Login/style';
import * as SC from './style';
import { Container } from 'styles/__styles';

const md5 = require('md5');

const ResetPwPage = (props: { email: string; token: string }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSucceeded, setSuccess] = useState<boolean>(false);

  const onResetPassword = async (values: { password: string }) => {
    try {
      setLoading(true);
      const { error } = await userServices.resetPassword({
        email: props.email,
        password: md5(values.password),
        token: props.token,
      });
      if (!error) setSuccess(true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      showNotification('error', {
        message: error?.status || 'Error',
        description:
          (error?.status ? error?.status + ' - ' : '') +
          (error?.data?.message || messageError.an_unknown_error),
      });
    }
  };

  return (
    <Container>
      {!isSucceeded ? (
        <LoginStyle.Login_Wrapper>
          <LoginStyle.Login_Form>
            <SC.ResetPass_wrapper>
              <div className='title__wrapper'>
                <h1>Reset Password</h1>
              </div>

              <Form layout='vertical' onFinish={onResetPassword}>
                <Form.Item
                  label='Password'
                  name='password'
                  rules={[
                    { required: true, message: 'Please enter Password!' },
                    { whitespace: true, message: 'Cannot be empty' },
                  ]}>
                  <Input.Password bordered={false} disabled={isLoading} />
                </Form.Item>

                <Form.Item
                  name='confirm_password'
                  label='Confirm Password'
                  rules={[
                    { required: true, message: 'Please confirm Password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('The two passwords that you entered do not match!')
                        );
                      },
                    }),
                  ]}>
                  <Input.Password bordered={false} disabled={isLoading} />
                </Form.Item>

                <Button
                  className='w-100 btn_login'
                  type='primary'
                  htmlType='submit'
                  disabled={isLoading}
                  loading={isLoading}>
                  Change Password
                </Button>
              </Form>
            </SC.ResetPass_wrapper>
          </LoginStyle.Login_Form>
        </LoginStyle.Login_Wrapper>
      ) : (
        <LoginStyle.Login_Wrapper>
          <SC.ResetPasswordResult__Wrapper>
            <h3 className='checkoutResult_title'>Reset password successfully</h3>

            <Icon iconName='checkout-success' />

            <div className='wrapper'>
              <p className='checkoutResult_subTitle'>Your password has been reset</p>
              <div className='checkoutResult_caption'>
                Explore VRStyler to collect your favorite 3D models.
              </div>
              <div className='checkoutResult_btnGroup'>
                <Button type='primary' className='w-100'>
                  <Link href='/login'>Back to Login</Link>
                </Button>
              </div>
            </div>
          </SC.ResetPasswordResult__Wrapper>
        </LoginStyle.Login_Wrapper>
      )}
    </Container>
  );
};

export default ResetPwPage;
