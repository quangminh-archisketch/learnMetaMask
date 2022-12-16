import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import axios from 'axios';
import { Button, Checkbox, Form, Input } from 'antd';

import regex from 'common/regex';
import { messageError } from 'common/constant';
import formConstant from 'constants/form.constant';
import showNotification from 'common/functions/showNotification';
import { setToken } from 'lib/utils/auth';
import userServices from 'services/user-services';

import LoginWithSNS from 'components/Fragments/LoginWithSNS';

import { UserModel } from 'models/user.models';

import * as LoginStyle from 'components/Pages/Login/style';
import * as L from './style';
import { Container } from 'styles/__styles';

const md5 = require('md5');

const RegisterPage = () => {
  const router = useRouter();

  const [agree, setAgree] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const handelRegister = async (values: any) => {
    try {
      setLoading(true);
      let param = { ...values };
      param.name = values.name.trim();
      param.password = md5(values.password);
      delete param['confirm_password'];

      const { error } = await userServices.register(param);
      if (!error) setSuccess(true);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      onFailed(error?.data?.message, error?.status);
    }
  };

  const onSuccess = (data: { token: string; refresh_token: string; user: UserModel }) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

    setToken(data.token, data.refresh_token);
    router.push('/');
  };

  const onFailed = (message?: string, status?: number) => {
    showNotification('error', {
      message: 'Register failed',
      description: (status ? status + ' - ' : '') + (message || messageError.an_unknown_error),
    });
  };

  return (
    <Container>
      {!isSuccess && (
        <LoginStyle.Login_Wrapper>
          <LoginStyle.Login_Form>
            <div className='title__wrapper'>
              <h1>Create Account</h1>
            </div>

            <Form layout='vertical' onFinish={handelRegister}>
              <div className='position-relative'>
                <Form.Item
                  name='email'
                  label='Email'
                  rules={[
                    { required: true, message: 'Please enter Email!' },
                    { type: 'email', message: 'Wrong email format' },
                  ]}>
                  <Input placeholder='johndoe@gmail.com' />
                </Form.Item>
              </div>

              <Form.Item
                label='Full Name'
                name='name'
                rules={[
                  { required: true, message: 'Please enter Full Name!' },
                  { whitespace: true, message: 'Full Name cannot be empty' },
                ]}>
                <Input placeholder='Harry Potter' />
              </Form.Item>

              <Form.Item
                label='Username'
                name='username'
                tooltip={
                  <>
                    <span>- 4 to 20 characters including letters and numbers</span>
                    <br />
                    <span>- Characters are allowed [-] [.] [_] interupted</span>
                  </>
                }
                rules={[
                  { required: true, message: 'Please enter Username!' },
                  { pattern: regex.usernameFormat, message: formConstant.username?.format },
                ]}>
                <Input placeholder='johndoe' />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                tooltip={formConstant.password?.tooltip}
                rules={[
                  { required: true, message: 'Please enter Password!' },
                  { pattern: regex.passwordFormat, message: formConstant.password?.format },
                ]}>
                <Input.Password placeholder='Password' bordered={false} />
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
                <Input.Password placeholder='Confirm Password' bordered={false} />
              </Form.Item>

              <div className='remember_forgotPW accept__terms'>
                <Checkbox className='rememberAcount' onChange={(e) => setAgree(e.target.checked)}>
                  I agree to<a href='#'> privacy policy & terms</a>
                </Checkbox>
              </div>

              <Button
                className='w-100 btn_login'
                type='primary'
                htmlType='submit'
                disabled={!agree}
                loading={isLoading}>
                Create Account
              </Button>

              <p className='have-account'>
                Already have an account?
                <Link href='/login'>
                  <span> Login</span>
                </Link>
              </p>

              <LoginWithSNS onSuccess={onSuccess} onFailed={onFailed} />
            </Form>
          </LoginStyle.Login_Form>
        </LoginStyle.Login_Wrapper>
      )}

      {isSuccess && (
        <L.FormSuccess_wrapper>
          <div className='wrapper'>
            <h3>Create Account Success</h3>
            <p>
              Please check the <span>Email</span> you used to register and confirm according to the
              instructions for the best experience.
            </p>

            <img className='img__banner' src='/static/images/register/banner.png' alt='' />

            <Button type='primary' className='w-100'>
              <Link href='/login'>Back to Login</Link>
            </Button>
          </div>
        </L.FormSuccess_wrapper>
      )}
    </Container>
  );
};

export default RegisterPage;
