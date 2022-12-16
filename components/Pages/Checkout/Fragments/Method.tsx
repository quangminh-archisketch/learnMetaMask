import { PaymentElement } from '@stripe/react-stripe-js';
import { Radio } from 'antd';

import Icon from 'components/Fragments/Icons';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

type Props = {
  /* eslint-disable no-unused-vars */
  method?: 'stripe' | 'paypal';
  onChangeMethod: (method: 'stripe' | 'paypal') => void;
};

export const CheckoutMethod = (props: Props) => {
  const { method, onChangeMethod } = props;

  return (
    <Wrapper>
      <div className='checkout-section-header'>
        <h4>Payment Method</h4>
        <div className='checkout-method-commit'>
          Secured connection <Icon iconName='lock-fill' />
        </div>
      </div>

      <div className='checkout-method-option'>
        <Radio
          value='stripe'
          checked={method === 'stripe'}
          onChange={() => onChangeMethod('stripe')}>
          <span className='d-flex align-items-center'>
            Credit/Debit Card by <Icon iconName='stripe-text' />
          </span>
        </Radio>
        {method === 'stripe' && <PaymentElement />}
        <Radio
          value='paypal'
          checked={method === 'paypal'}
          onChange={() => onChangeMethod('paypal')}>
          <Icon iconName='paypal-text' />
        </Radio>
        {method === 'paypal' && (
          <div className='checkout-method-option-content'>
            In order to complete your transaction, we will transfer you over to PayPal&apos;s secure
            servers.
          </div>
        )}
      </div>
    </Wrapper>
  );
};
export default CheckoutMethod;

const Wrapper = styled.div`
  margin-bottom: 20px;

  .checkout-method-option {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    border: solid 1px var(--color-gray-5);

    ${maxMedia.small} {
      margin-top: 10px;
    }

    .ant-radio-wrapper {
      margin-right: 0;
      padding: 15px 10px;

      font-size: 14px;
      font-weight: 500;
      color: var(--text-caption);
      background-color: var(--color-gray-3);
      &:first-child {
        border-bottom: solid 1px var(--color-gray-5);
      }
      & > span:not([class]) {
        display: flex;
        span {
          gap: 4px;
        }
      }
      .my-icon.stripe-text svg {
        height: 18px;
        width: auto;
      }
      .my-icon.paypal-text svg {
        height: 16px;
        width: auto;
      }
    }
  }
  .checkout-method-option-content {
    padding: 20px;
    font-size: 14px;
    border-top: solid 1px var(--color-gray-5);
  }
  .StripeElement {
    padding: 30px 20px;
    border-bottom: solid 1px var(--color-gray-5);
  }
`;
