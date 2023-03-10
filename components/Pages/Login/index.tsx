import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import axios from 'axios';
import { Button, Form, Input } from 'antd';

import { setToken } from 'lib/utils/auth';
import { messageError } from 'common/constant';
import showNotification from 'common/functions/showNotification';
import authServices from 'services/auth-services';

import LoginWithSNS from 'components/Fragments/LoginWithSNS';

import { UserModel } from 'models/user.models';

import { Container } from 'styles/__styles';
import * as SC from './style';
import { handlerMessage } from 'common/functions';

const md5 = require('md5');

const LoginPage = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const onLogin = async (values: { taiKhoan: string; matKhau: string }) => {
    try {
      setLoading(true);

      let param = { ...values };
      // param.matKhau = md5(values.matKhau);
      param.matKhau = values.matKhau.trim();
      param.taiKhoan = values.taiKhoan.trim();
      console.log(param);

      const { error } = await authServices.login(param);

      if (!error) handlerMessage('Login Success', 'success');
      else setLoading(false);
      router.push(`/`);
    } catch (error: any) {
      setLoading(false);
      handlerMessage('Login Errors', 'error');
    }
  };

  // const onSuccess = (data: { token: string; refresh_token: string; user: UserModel }) => {
  //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

  //   setToken(data.token, data.refresh_token);

  //   if (router.query.redirect && typeof router.query.redirect === 'string')
  //     router.push(router.query.redirect.replaceAll('__and__', '&'));
  //   else if (!data.user.status) router.push(`/verify`);
  //   else router.push(`/user/my-orders`);
  // };

  // const onFailed = (message?: string, status?: number) => {
  //   showNotification('error', {
  //     message: 'Login failed',
  //     description: (status ? status + ' - ' : '') + (message || messageError.an_unknown_error),
  //   });
  // };

  return (
    <SC.Login_Wrapper>
      <Container>
        <SC.Login_Form>
          <div className='title__wrapper'>
            <h1>Login</h1>
          </div>

          <Form layout='vertical' onFinish={onLogin}>
            <Form.Item
              name='taiKhoan'
              label='Username'
              rules={[{ required: true, message: 'Please enter Username!' }]}>
              <Input placeholder='Username' disabled={isLoading} />
            </Form.Item>

            <Form.Item
              name='matKhau'
              label='Password'
              rules={[{ required: true, message: 'Please enter Password!' }]}>
              <Input.Password placeholder='Password' bordered={false} disabled={isLoading} />
            </Form.Item>

            <div className='remember_forgotPW'>
              <Link href='/forgot-password'>
                <a className='forgotPW'>Forgot Password?</a>
              </Link>
            </div>

            <Button
              loading={isLoading}
              className='w-100 btn_login'
              type='primary'
              htmlType='submit'>
              Login
            </Button>

            <p className='no-account'>
              Not Registered Yet?{' '}
              <Link href='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            {/* 
            <LoginWithSNS onSuccess={onSuccess} onFailed={onFailed} /> */}
          </Form>
        </SC.Login_Form>
      </Container>
    </SC.Login_Wrapper>
  );
};

export default LoginPage;
