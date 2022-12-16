import { useRouter } from 'next/router';

import { Button } from 'antd';

import Icon from 'components/Fragments/Icons';

import styled from 'styled-components';

const SalesRegistrationSuccess = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <Icon iconName='checkout-success' />
      <h2>Successful registration</h2>
      <p>
        Congratulations, you have become a seller in Vrstyler. Now, you can upload your product in
        the Vrtyler Store.
      </p>
      <Button type='primary' onClick={() => router.push('/upload-model')}>
        d Upload model
      </Button>
    </Wrapper>
  );
};
export default SalesRegistrationSuccess;

const Wrapper = styled.div`
  padding: 80px 0;
  text-align: center;

  .my-icon {
    font-size: 120px;
  }
  h2 {
    margin-top: 30px;
    font-size: 24px;
    font-weight: 500;
    color: var(--text-title);
  }
  p {
    margin: 11px auto 0;
    max-width: 500px;
    font-size: 14px;
    color: var(--text-caption);
  }
  .ant-btn {
    margin-top: 30px;
    padding: 10px 48px;
    height: auto;
  }
`;
