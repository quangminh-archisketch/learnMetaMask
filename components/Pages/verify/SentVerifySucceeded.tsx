import { useRouter } from 'next/router';

import { Button } from 'antd';

import { Container } from 'styles/__styles';
import * as SC from './style';

type Props = {
  customerEmail: string;
};

const SentVerifySucceeded = (props: Props) => {
  const router = useRouter();
  return (
    <SC.VerifyAccount__Wrapper>
      <Container className='VerifyAccount__Content'>
        <h1 className='VerifyAccount__Title'>Sent Verification Email!</h1>
        <p className='VerifyAccount__Caption'>
          Sent verification email to <span>{props.customerEmail}</span>! Please check your inbox and
          follow the instructions.
        </p>
        <Button
          type='primary'
          shape='round'
          className='VerifyAccount__BtnClose'
          onClick={() => router.replace('/')}>
          Close
        </Button>
      </Container>
    </SC.VerifyAccount__Wrapper>
  );
};

export default SentVerifySucceeded;
