import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/type';
import { ApplyCouponRedux, RemoveCouponRedux } from 'store/reducer/cart';

import { Button, Checkbox, Input, message, Typography } from 'antd';

import checkoutServices from 'services/checkout-services';
import { decimalPrecision, formatNumber } from 'common/functions';
import { useCoupon } from 'constants/checkout.constant';

import { CouponModel } from 'models/checkout.models';

import * as SC from './style';

const CartTotal = ({ subTotal }: { subTotal: number }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const couponApply = useSelector((state: AppState) => state.cart.coupon);
  const [agree, setAgree] = useState<boolean>(false);
  const [isUseCoupon, setUseCoupon] = useState<boolean>(
    (couponApply?.code && couponApply?.code.length > 0) || false
  );
  const [couponCode, setCouponCode] = useState<string>(couponApply?.code || '');
  const [isApplyingCoupon, setApplyingCoupon] = useState<boolean>(false);
  const [messageErrorCoupon, setCouponError] = useState<ReactNode>();

  useEffect(() => {
    const handleRouteChange = (url: string) =>
      !url.startsWith('/checkout') && dispatch(RemoveCouponRedux());
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, []);

  const onCheckCoupon = async () => {
    try {
      setApplyingCoupon(true);
      const { error, data } = await checkoutServices.getCoupon(couponCode);
      if (!error) onApplyCoupon(data);
    } catch (error: any) {
      setApplyingCoupon(false);
      dispatch(RemoveCouponRedux());

      let messageError: string = '';
      if (error.status === 409) messageError = useCoupon.out_of_move;
      else if (error.status === 404) messageError = useCoupon.not_exist;
      else messageError = useCoupon.error;
      setCouponError(messageError);
    }
  };

  const onApplyCoupon = (coupon: CouponModel) => {
    try {
      setApplyingCoupon(false);
      if (coupon.min_order && subTotal < coupon.min_order) {
        setCouponError(`Coupon code only applies to orders from $${coupon.min_order}`);
        return;
      }

      let discount: number = 0;

      if (coupon.type === 'percent')
        discount = decimalPrecision((subTotal / 100) * coupon.value, 2);
      if (coupon.type === 'price')
        discount = decimalPrecision(coupon.value > subTotal ? subTotal : coupon.value, 2);
      if (coupon.max_discount && discount > coupon.max_discount) discount = coupon.max_discount;
      if (messageErrorCoupon) setCouponError('');

      dispatch(ApplyCouponRedux({ id: coupon.id, code: couponCode, value: discount }));
      message.success(useCoupon.succeeded);
    } catch (error) {
      setApplyingCoupon(false);
    }
  };

  return (
    <SC.CartTotal_Wrapper>
      <div className='cart_header'>Total</div>

      <SC.CartTotal_Content>
        <SC.CartTotal_PriceItem className='cartTotal_priceItem'>
          <p>Subtotal</p>
          <p>{formatNumber(subTotal, '$')}</p>
        </SC.CartTotal_PriceItem>

        <SC.CartTotal_PriceItem className='cartTotal_priceItem'>
          <p>Promotion/Discount</p>
          <p>- {formatNumber(couponApply?.value || 0, '$')}</p>
        </SC.CartTotal_PriceItem>

        <SC.CartTotal_Coupon>
          <Checkbox
            checked={isUseCoupon}
            onChange={(e) => {
              if (!e.target.checked) {
                setCouponCode('');
                dispatch(RemoveCouponRedux());
              }
              setUseCoupon(e.target.checked);
            }}>
            I have a discount code
          </Checkbox>

          {isUseCoupon && (
            <div className='cartTotal_coupon_content'>
              <div className='cartTotal_coupon_input'>
                <Input
                  disabled={isApplyingCoupon}
                  value={couponCode}
                  onChange={(e) => {
                    messageErrorCoupon && setCouponError('');
                    couponApply?.value && dispatch(RemoveCouponRedux());
                    setCouponCode(e.target.value.toUpperCase());
                  }}
                  onPressEnter={onCheckCoupon}
                />
                <Button
                  type='primary'
                  disabled={!couponCode.trim()}
                  loading={isApplyingCoupon}
                  onClick={onCheckCoupon}>
                  Apply
                </Button>
              </div>
              {messageErrorCoupon && (
                <Typography.Text type='danger'>{messageErrorCoupon} </Typography.Text>
              )}
            </div>
          )}
        </SC.CartTotal_Coupon>

        <SC.CartTotal_PriceItem className='cartTotal_priceItem --total'>
          <p>Total</p>
          <p>{formatNumber(subTotal - (couponApply?.value || 0), '$')}</p>
        </SC.CartTotal_PriceItem>

        <SC.CartTotal_Agree>
          <Checkbox onChange={(e) => setAgree(e.target.checked)}>
            I agree to the <a target='__blank'>Terms of Use</a>,{' '}
            <a target='__blank'>Privacy Policy</a> and <a target='__blank'>Store licensing</a>.
          </Checkbox>
        </SC.CartTotal_Agree>

        <Button className='cartTotal_btnPay' type='primary' disabled={!agree}>
          <Link href='/checkout'>Checkout</Link>
        </Button>
      </SC.CartTotal_Content>
    </SC.CartTotal_Wrapper>
  );
};

export default CartTotal;
