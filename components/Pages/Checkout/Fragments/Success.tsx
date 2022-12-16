import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { Button } from 'antd';
// import { InfoCircleOutlined } from '@ant-design/icons';

import { ResetCartRedux } from 'store/reducer/cart';

import Icon from 'components/Fragments/Icons';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  return (
    <CheckoutResult_Wrapper>
      <h3 className='checkoutResult_title'>Yes, you’ve successfully ordered!</h3>

      <Icon iconName='checkout-success' />

      <p className='checkoutResult_subTitle'>Thanks a lot for putting up this order</p>

      <div className='checkoutResult_caption'>
        The product has been moved to the “Purchase model’’ folder <br />
        in your Profile. Please check Profile to Download the product.
      </div>

      <div className='checkoutResult_btnGroup'>
        <Button
          className='checkoutResult_btnGroup_checkOrder'
          type='primary'
          onClick={() => dispatch(ResetCartRedux())}>
          <Link href='/user/my-orders'>Check your order</Link>
        </Button>
        <Button
          className='checkoutResult_btnGroup_backHome'
          onClick={() => dispatch(ResetCartRedux())}>
          <Link href='/'>Back to shop</Link>
        </Button>
      </div>

      {/* <div className='checkoutResult_note'>
        <InfoCircleOutlined />
        <p>
          You can cancel your order within <strong>48 hours</strong> if you haven&apos;t done a
          model download.
        </p>
      </div> */}
    </CheckoutResult_Wrapper>
  );
};

export default CheckoutSuccess;

const CheckoutResult_Wrapper = styled.div`
  flex: auto;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-title);

  & > .my-icon {
    font-size: 120px;
    margin: 3.7rem 0 3.1rem;
  }

  .checkoutResult {
    &_title {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 1.1px;
    }
    &_subTitle {
      font-size: 16px;
      font-weight: 600;
    }
    &_caption {
      margin-top: 1.5rem;

      font-size: 14px;

      ${maxMedia.small} {
        br {
          display: none;
        }
      }
    }
    &_btnGroup {
      display: flex;
      justify-content: center;
      gap: 1rem;

      margin-top: 3rem;

      .ant-btn {
        height: 42px;
        width: 160px;

        font-size: 14px;
        font-weight: 600;
      }

      &_backHome {
        color: var(--color-primary-700);
        border-color: var(--color-primary-700);
      }
    }
    &_note {
      display: flex;
      gap: 5px;

      margin-top: 5rem;

      font-size: 11px;
      color: var(--text-caption);
      text-align: left;

      .anticon {
        font-size: 16px;
        color: var(--color-primary-700);
      }
    }
  }
`;
