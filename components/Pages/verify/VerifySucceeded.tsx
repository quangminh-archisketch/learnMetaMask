import Link from 'next/link';

import { Button } from 'antd';

import Icon from 'components/Fragments/Icons';

import { Container } from 'styles/__styles';
import * as SC from './style';

const VerifySucceeded = () => {
  return (
    <SC.VerifyAccount__Wrapper>
      <Container className='VerifyAccount__Content'>
        <h1 className='VerifyAccount__Title'>Verified Account</h1>
        <Icon iconName='checkout-success' className='VerifyAccount__IconSucceeded' />
        <p className='VerifyAccount__Caption'>
          Your account has been verified. Now you can experience all of our services.
        </p>
        <Button type='primary' shape='round' className='VerifyAccount__BtnVerify'>
          <Link href='/'>Continue</Link>
        </Button>
      </Container>
    </SC.VerifyAccount__Wrapper>
  );
};

export default VerifySucceeded;
