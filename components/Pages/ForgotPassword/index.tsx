import { useState } from 'react';
import Link from 'next/link';

import { Button, Form, Input, message } from 'antd';

import userServices from 'services/user-services';

import * as LoginStyle from 'components/Pages/Login/style';
import { Container } from 'styles/__styles';
import * as SC from './style';

const ForgotPwPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [succeeded, setSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const onSubmit = async (values: { email: string }) => {
    try {
      setIsLoading(true);
      setEmail(values.email);
      const { error } = await userServices.forgotPassword(values);
      if (!error) setSuccess(true);
      else message.error({ content: 'There are no accounts registered by this email' });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      message.error({ content: 'There are no accounts registered by this email' });
    }
  };

  return (
    <LoginStyle.Login_Wrapper>
      <Container>
        <LoginStyle.Login_Form>
          {!succeeded ? (
            <SC.Forgot_wrapper>
              <div className='title__wrapper'>
                <h1>Forgot Password</h1>
              </div>

              <Form layout='vertical' onFinish={onSubmit}>
                <Form.Item
                  name='email'
                  label='Email'
                  className='input__forgot'
                  rules={[
                    { required: true, message: 'Please enter Email!' },
                    { type: 'email', message: 'Wrong email format' },
                  ]}>
                  <Input placeholder='johndoe@gmail.com' disabled={isLoading} />
                </Form.Item>

                <Button
                  className='w-100 btn_login'
                  type='primary'
                  htmlType='submit'
                  loading={isLoading}>
                  Reset Password
                </Button>

                <div className='group__btn'>
                  <Link href='/register'>Create an account</Link>

                  <Link href='/login'>Back to Login</Link>
                </div>
              </Form>
            </SC.Forgot_wrapper>
          ) : (
            <SC.SendToMail_Wrapper>
              <div className='title__wrapper'>
                <h1>Password Reset</h1>
              </div>

              <p>
                Instructions to reset your password have been sent to <span>{email}</span>. Please
                check your inbox (and spam folder).
              </p>

              <Button className='w-100 btn_login' type='primary'>
                <Link href='/login'>Back to Login</Link>
              </Button>
            </SC.SendToMail_Wrapper>
          )}
        </LoginStyle.Login_Form>
      </Container>
    </LoginStyle.Login_Wrapper>
  );
};

export default ForgotPwPage;
