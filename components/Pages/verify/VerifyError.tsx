import { Button } from 'antd';

import Icon from 'components/Fragments/Icons';

import { Container } from 'styles/__styles';
import * as SC from './style';

const VerifyError = ({ onReVerify }: { onReVerify: () => void }) => {
  return (
    <SC.VerifyAccount__Wrapper>
      <Container className='VerifyAccount__Content'>
        <h1 className='VerifyAccount__Title --error'>Verification Failed</h1>
        <Icon iconName='checkout-faild' className='VerifyAccount__IconFaild' />
        <p className='VerifyAccount__Caption'>
          The link is incorrect or has expired. Please try again!
        </p>
        <div className='VerifyAccount__BtnGroup'>
          <Button shape='round' className='VerifyAccount__BtnClose'>
            Close
          </Button>
          <Button
            className='VerifyAccount__BtnVerify'
            type='primary'
            shape='round'
            onClick={onReVerify}>
            Re-Verify
          </Button>
        </div>
      </Container>
    </SC.VerifyAccount__Wrapper>
  );
};

export default VerifyError;
