import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { message, Spin } from 'antd';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import config from 'config';
import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';
import { AppState } from 'store/type';
import { RemoveCouponRedux } from 'store/reducer/cart';
import checkoutServices, { CreateSessionBody } from 'services/checkout-services';

import CheckoutPage from 'components/Pages/Checkout';

import { PageProps } from 'models/page.models';

const stripePromise = loadStripe(config.stripePublicKey);

const Index = (props: PageProps) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const dataCart = useSelector((state: AppState) => state.cart);

  const [checking, setChecking] = useState<boolean>(true);
  const [bodyCreateOrder, setBodyCreateOrder] = useState<CreateSessionBody>();
  const [checkoutToken, setCheckoutToken] = useState<string>();

  useEffect(() => {
    if (!props.auth?.token) router.replace('/');
    else if (dataCart.products) {
      const bodyOrder: CreateSessionBody = {
        customer_email: props.auth?.user?.email || '',
        items: dataCart.products?.map((i) => {
          return {
            id: i.market_item.id,
            title: i.market_item.title,
            image: i.market_item.image,
            price: i.market_item.price,
            old_price: i.market_item.old_price || undefined,
          };
        }),
        coupon_id: dataCart.coupon?.id || '',
        use_credit: false,
        paygate: 'stripe',
      };
      setBodyCreateOrder(bodyOrder);

      const amount: number =
        dataCart.products.reduce((total, product) => (total += product.market_item.price), 0) -
        (dataCart.coupon?.value || 0);

      if (dataCart.products.length < 1) router.replace('/');
      else if (amount === 0) setChecking(false);
      else onCreateOrder(bodyOrder);
    }
  }, []);

  const onCreateOrder = async (body: CreateSessionBody) => {
    try {
      const res = await checkoutServices.createSession(body);
      if (res.order_id) setCheckoutToken(res.client_secret);
      setChecking(false);
    } catch (error: any) {
      dispatch(RemoveCouponRedux());
      message.error(error?.data?.message);
      router.replace('/cart');
    }
  };

  if (checking)
    return (
      <Spin
        className='d-flex align-items-center justify-content-center'
        style={{ height: '100vh', width: '100vw' }}
      />
    );

  return (
    <>
      <Head>
        <title>Checkout | {config.websiteName}</title>
      </Head>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: checkoutToken,
          appearance: { theme: 'stripe', variables: { colorPrimary: '#369ca5' } },
        }}>
        <CheckoutPage
          auth={props.auth}
          dataCart={dataCart}
          bodyCreateOrder={bodyCreateOrder}
          onShowLoading={() => setChecking(true)}
        />
      </Elements>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const auth = await checkAuth(
    (content.req ? content.req.headers.cookie : window.document.cookie) || ''
  );

  return { props: { auth } };
};

export default withLayout(Index, {
  header: { show: false },
  footer: { show: false },
});
