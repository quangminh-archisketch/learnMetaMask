import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import checkoutServices from 'services/checkout-services';

type Props = {
  /* eslint-disable no-unused-vars */
  disabled?: boolean;
  bodyCreateOrder: any;
  customer_email: string;
  couponId?: string;
  onSuccess: () => void;
  onRemoveCouponRedux: () => void;
  onFail: (error: string) => void;
};

const PaypalButton = (props: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <PayPalButtons
      style={{ layout: 'vertical', height: 41, label: 'pay' }}
      disabled={props.disabled || isPending}
      createOrder={() => {
        return checkoutServices
          .createSession({
            ...props.bodyCreateOrder,
            paygate: 'paypal',
          })
          .then((order) => order.payment_intent);
      }}
      onError={(err: any) => props.onFail(err?.data?.message)}
      onApprove={async function (data) {
        await checkoutServices
          .confirmOrder({
            customer_email: props.customer_email,
            payment_intent: data.orderID || '',
            coupon_id: props.couponId || '',
          })
          .then(function () {
            props.onSuccess();
            props.onRemoveCouponRedux();
          })
          .catch((err) => props.onFail(err?.data?.message));
      }}
    />
  );
};

export default PaypalButton;
