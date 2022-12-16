import { useState } from 'react';

import { Button, message } from 'antd';

import userServices from 'services/user-services';

import { Container } from 'styles/__styles';
import * as SC from './style';

const NotVerify = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const handelSendMailVerify = async () => {
    try {
      setLoading(true);
      const { error } = await userServices.sendMailVerify();
      if (!error) onSuccess();
      else message.error('Unable to send verification email. Please try again again.');
    } catch (error) {
      setLoading(false);
      message.error('Unable to send verification email. Please try again latter.');
    }
  };

  return (
    <SC.VerifyAccount__Wrapper>
      <Container className='VerifyAccount__Content'>
        <h1 className='VerifyAccount__Title --error'>Unverified Account</h1>
        <p className='VerifyAccount__Caption'>
          Your account has not been verified. Please click the validate button to authenticate your
          account.
        </p>
        <Button
          className='VerifyAccount__BtnVerify'
          type='primary'
          shape='round'
          loading={isLoading}
          onClick={handelSendMailVerify}>
          Verify
        </Button>
      </Container>
    </SC.VerifyAccount__Wrapper>
  );
};

export default NotVerify;
