import { useState } from 'react';

import styled from 'styled-components';
import { Button, Form, Input, message } from 'antd';

import userServices from 'services/user-services';
import showNotification from 'common/functions/showNotification';
import { messageError } from 'common/constant';

import HeaderPage from '../Fragments/HeaderPage';
import formConstant from 'constants/form.constant';
import regex from 'common/regex';

const md5 = require('md5');

const SettingPassword = () => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);

  const onchangePassword = async (values: { password: string; new_password: string }) => {
    try {
      setLoading(true);
      const { error } = await userServices.changePassword({
        password: md5(values.password),
        new_password: md5(values.new_password),
      });
      if (!error) {
        message.success('Your password has been changed successfully');
        form.resetFields();
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      showNotification('error', {
        message: "Can't change password",
        description:
          (error?.status ? error?.status + ' - ' : '') +
          (error?.data?.message || messageError.an_unknown_error),
      });
    }
  };

  return (
    <>
      <HeaderPage
        title='Change your VRStyler account password'
        // subtitle='Password'
        // caption='Please enter your new password'
      />

      <SettingPassword__Content className='Setting__Content'>
        <Form layout='vertical' form={form} onFinish={onchangePassword}>
          <Form.Item
            label='Current Password'
            name='password'
            rules={[{ required: true, message: 'Please enter your current password' }]}>
            <Input.Password disabled={isLoading} />
          </Form.Item>

          <Form.Item
            label='New Password'
            name='new_password'
            tooltip={formConstant.password?.tooltip}
            rules={[
              { required: true, message: 'Please enter a new password' },
              { pattern: regex.passwordFormat, message: formConstant.password?.format },
            ]}>
            <Input.Password disabled={isLoading} />
          </Form.Item>

          <Form.Item
            label='Confirm New Password'
            name='confirm_password'
            rules={[
              { required: true, message: 'Please confirm new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) return Promise.resolve();

                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!')
                  );
                },
              }),
            ]}>
            <Input.Password disabled={isLoading} />
          </Form.Item>

          <div className='text-center'>
            <Button type='primary' htmlType='submit' className='Btn__Submit' loading={isLoading}>
              Change Password
            </Button>
          </div>
        </Form>
      </SettingPassword__Content>
    </>
  );
};

export default SettingPassword;

const SettingPassword__Content = styled.div``;
