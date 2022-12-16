import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { useElements, useStripe } from '@stripe/react-stripe-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Button, Checkbox, Col, message, notification, Row } from 'antd';

import config from 'config';
import checkoutServices from 'services/checkout-services';
import useWindowSize from 'hooks/useWindowSize';
import { formatNumber } from 'common/functions';
import { RemoveCouponRedux } from 'store/reducer/cart';

import CheckoutHeader from './Fragments/Header';
import CheckoutMethod from './Fragments/Method';
import CheckoutProduct from './Fragments/Product';
import CheckoutSummary from './Fragments/Summary';
import PaypalButton from './Fragments/PaypalButton';
import CheckoutSuccess from './Fragments/Success';

import { CheckoutProps } from 'models/checkout.models';

import { Container } from 'styles/__styles';
import * as SC from './style';

const CheckoutPage = (props: CheckoutProps) => {
  const { auth, dataCart } = props;

  const dispatch = useDispatch();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [screenW] = useWindowSize();
  const [method, setMethod] = useState<'stripe' | 'paypal'>();
  const [isAgree, setAgree] = useState<boolean>(false);
  const [isPaying, setPaying] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const subTotal: number =
    dataCart.products?.reduce((total, product) => (total += product.market_item.price), 0) || 0;
  const isFreeOrder: boolean = subTotal - (dataCart.coupon?.value || 0) === 0;

  const onStripePay = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      setPaying(true);
      const resPaymentIntent = await stripe.confirmPayment({ elements, redirect: 'if_required' });

      const error = resPaymentIntent.error;
      const paymentIntent = resPaymentIntent.paymentIntent;

      if (error) {
        notification.error({ message: error.message, placement: 'top', style: { width: '100%' } });
      } else {
        await checkoutServices
          .confirmOrder({
            payment_intent: paymentIntent?.id || '',
            customer_email: auth?.user?.email || '',
            coupon_id: dataCart.coupon?.id,
          })
          .then(() => {
            setSuccess(true);
            onRemoveCouponRedux();
          })
          .catch((err) => console.error(err));
      }
      setPaying(false);
    } catch (error: any) {
      onConfirmFail(error?.data?.message);
    }
  };

  const onCreateOrderFree = async () => {
    if (dataCart.products && dataCart.products.length) {
      try {
        setPaying(true);
        // eslint-disable-next-line no-unused-vars
        const { paygate, ...body } = props.bodyCreateOrder;
        const { error } = await checkoutServices.createSession(body);
        if (!error) {
          setSuccess(true);
          onRemoveCouponRedux();
        }

        setPaying(false);
      } catch (error: any) {
        onConfirmFail(error?.data?.message);
      }
    }
  };

  const onConfirmFail = (error: string) => {
    props.onShowLoading();
    dispatch(RemoveCouponRedux());
    message.error(error);
    router.replace('/cart');
  };

  const onRemoveCouponRedux = () => dispatch(RemoveCouponRedux());

  if (isSuccess)
    return (
      <SC.Checkout_Wrapper>
        <CheckoutHeader isBackCart={!isSuccess} />
        <CheckoutSuccess />
      </SC.Checkout_Wrapper>
    );

  return (
    <SC.Checkout_Wrapper>
      <CheckoutHeader />

      <SC.Checkout_Content>
        <Container>
          <form>
            <h1 className='checkout-title-page'>Checkout</h1>
            <Row gutter={[100, 20]}>
              <Col span={24} lg={12}>
                {!isFreeOrder && <CheckoutMethod method={method} onChangeMethod={setMethod} />}

                <CheckoutProduct products={dataCart.products || []} />
              </Col>

              <Col span={24} lg={12}>
                <CheckoutSummary
                  subTotal={subTotal}
                  discount={dataCart.coupon?.value || 0}
                  onAgree={setAgree}
                />

                <SC.Checkout_Action>
                  {screenW < 992 && (
                    <>
                      <div className='checkout-action-total'>
                        <span>Total</span>
                        <span>{formatNumber(subTotal - (dataCart.coupon?.value || 0), '$')}</span>
                      </div>
                      <Checkbox
                        className='checkbox-privacy-terms-policy'
                        onChange={(e) => setAgree(e.target.checked)}>
                        Please check to acknowledge our <a>Privacy & Terms Policy</a>
                      </Checkbox>
                    </>
                  )}

                  {method !== 'paypal' && !isFreeOrder && (
                    <Button
                      className='btn-pay'
                      type='primary'
                      disabled={!method || !isAgree}
                      loading={isPaying}
                      onClick={onStripePay}>
                      Complete Checkout
                    </Button>
                  )}

                  <PayPalScriptProvider
                    options={{
                      'client-id': config.paypalClientId,
                      'disable-funding': 'credit,card',
                      locale: 'en_US',
                    }}>
                    {method === 'paypal' && (
                      <PaypalButton
                        disabled={!isAgree}
                        bodyCreateOrder={props.bodyCreateOrder}
                        customer_email={auth?.user?.email || ''}
                        couponId={dataCart.coupon?.id}
                        onSuccess={() => setSuccess(true)}
                        onRemoveCouponRedux={onRemoveCouponRedux}
                        onFail={onConfirmFail}
                      />
                    )}
                  </PayPalScriptProvider>

                  {isFreeOrder && (
                    <Button
                      className='btn-pay'
                      type='primary'
                      disabled={!isAgree}
                      loading={isPaying}
                      onClick={onCreateOrderFree}>
                      Complete Checkout
                    </Button>
                  )}
                </SC.Checkout_Action>
              </Col>
            </Row>
          </form>
        </Container>
      </SC.Checkout_Content>
    </SC.Checkout_Wrapper>
  );
};

export default CheckoutPage;
