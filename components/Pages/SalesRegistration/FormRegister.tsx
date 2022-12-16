import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Checkbox } from 'antd';

import { AppState } from 'store/type';
import { UpdateUser } from 'store/reducer/auth';
import userServices from 'services/user-services';

import styled from 'styled-components';

const SalesRegistrationForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth?.user);

  const [agree, setAgree] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = async () => {
    if (!agree) {
      setError('You must accept our conditions and terms in order to become a seller');
      return;
    }
    try {
      const { error } = await userServices.sellerRegister();
      if (!error && user) dispatch(UpdateUser({ ...user, is_seller: true }));
    } catch (error) {}
  };

  return (
    <Wrapper>
      <h2 className='sales-registration-title'>Become a seller on Vrstyler</h2>
      <div className='sales-registration-content'>
        <p>
          Quality work and fair pricing are critical to the success of our sellers and the VRStyler
          Store as a whole.
        </p>
        <p>
          In order to become a seller, we will review your portfolio to see if it meets the
          following criteria:
        </p>
        <ul>
          <li>Make sure your Vrstyler portfolio is representative of your work.</li>
          <li>All models, textures, and/or animations must be your original property.</li>
          <li>
            Work is modeled to an acceptable industry standard in keeping with other sellers in the
            store.
          </li>
          <li>Thumbnails, titles, and descriptions accurately reflect the items for sale.</li>
          <li>Models are accurately UV mapped when UVs are used.</li>
          <li>Clean topology is employed.</li>
          <li>Textures (when used) and materials are optimized and efficient.</li>
        </ul>
        <p>For more information, please read &apos;Becoming a Seller&apos; on our Help Center:</p>
        https://vrstyler.com/help-center/become-a-seller
      </div>
      <div className='sales-registration-agree'>
        <Checkbox
          onChange={(e) => {
            setError('');
            setAgree(e.target.checked);
          }}>
          Please checking <a>conditions and terms to become a seller</a> on VRStyler store
        </Checkbox>
        {error && <p className='msg-err'>{error}</p>}
      </div>
      <div className='sales-registration-submit'>
        <Button type='primary' onClick={onSubmit}>
          Register
        </Button>
      </div>
    </Wrapper>
  );
};
export default SalesRegistrationForm;

const Wrapper = styled.div`
  .sales-registration-title {
    font-size: 24px;
    font-weight: 500;
    color: var(--text-title);
  }
  .sales-registration-content {
    margin-top: 20px;
    font-size: 14px;
    color: var(--text-caption);

    p {
      margin-bottom: 20px;
    }
    ul {
      margin-bottom: 20px;
      padding-left: 22px;
      list-style: disc;
    }
  }
  .sales-registration-agree {
    margin-top: 20px;

    a {
      color: #1890ff;
      text-decoration: underline;
    }
    .msg-err {
      margin-left: 24px;
      font-size: 12px;
      color: var(--color-red-5);
      font-style: italic;
    }
  }
  .sales-registration-submit {
    margin-top: 20px;
    text-align: center;
    .ant-btn {
      width: 154px;
      height: 41px;
    }
  }
`;
