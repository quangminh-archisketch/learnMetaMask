import { message } from 'antd';
import { messageError } from 'common/constant';
import showNotification from 'common/functions/showNotification';
import checkoutServices from 'services/checkout-services';

export const AddToCart = async (productId: string) => {
  try {
    const { error, message: msg, data } = await checkoutServices.addToCart(productId);
    if (!error) message.success('Successfully added to cart');
    return { error, message: msg, data };
  } catch (error: any) {
    message.error(error?.data?.message || messageError.an_unknown_error);
    return { error: true };
  }
};

export const RemoveProductCart = async (productCartId: string) => {
  try {
    const { error, message } = await checkoutServices.removeProductCart(productCartId);
    return { error, message };
  } catch (error: any) {
    showNotification('error', {
      message: 'Error',
      description:
        (error?.status ? error?.status + ' - ' : '') +
        (error?.data?.message || messageError.an_unknown_error),
    });
    return { error: true };
  }
};
