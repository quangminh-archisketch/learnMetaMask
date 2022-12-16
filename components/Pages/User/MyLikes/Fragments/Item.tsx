import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { AddProductCartRedux } from 'store/reducer/cart';

import styled from 'styled-components';

import { changeToSlug } from 'common/functions';
import showNotification from 'common/functions/showNotification';
import urlPage from 'constants/url.constant';
import { AddToCart } from 'lib/utils/checkout';

import Icon from 'components/Fragments/Icons';

import { LikeProductModel } from 'models/like.models';
import { AuthModel } from 'models/page.models';

const MyLikeItem = ({ data, auth }: { data: LikeProductModel; auth: AuthModel }) => {
  const dispatch = useDispatch();
  const pathToProduct = urlPage.productDetail.replace(
    '{slug}',
    changeToSlug(data.market_item.title) + '--' + data.market_item.id
  );

  const onAddToCart = async () => {
    if (!auth?.token)
      showNotification('warning', {
        message: "Can't add to cart",
        description: 'Please login to add to cart',
      });
    else if (typeof auth.token === 'string' && !auth.user?.status)
      showNotification('warning', {
        message: "Can't add to cart",
        description: 'Please verify your account to add to cart',
      });
    else {
      const res = await AddToCart(data.market_item.id);
      if (!res.error) dispatch(AddProductCartRedux(res.data));
    }
  };

  return (
    <Card_wrapper className='card__item'>
      <Link href={pathToProduct}>
        <a>
          <img src={data.market_item.image} alt='' className='card__img' loading='lazy' />
        </a>
      </Link>
      <div className='card__content'>
        <h3>
          <Link href={pathToProduct}>{data.market_item.title}</Link>
        </h3>
        {data.market_item.price === 0 ? (
          <span className='free'>Free</span>
        ) : (
          <Icon iconName='cart-add' onClick={onAddToCart} />
        )}
      </div>
    </Card_wrapper>
  );
};

const Card_wrapper = styled.div`
  position: relative;
  background-color: #edeef0;
  border: 1px solid #edeef0;
  border-radius: 5px;
  overflow: hidden;

  &:hover .card__content h3 a {
    color: var(--color-primary-700);
  }

  .card__img {
    aspect-ratio: 303 / 215;
  }

  .card__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 1.5rem;
    border-top: 1px solid var(--color-gray-5);

    h3 {
      max-width: calc(100% - 30px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1;
      a {
        font-size: 12px;
        line-height: 1;
        font-weight: 600;
        color: var(--color-gray-11);
      }
    }

    .my-icon.cart-add {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--color-red-6);
      cursor: pointer;
    }

    .free {
      font-size: 12px;
      font-weight: 500;
      line-height: 1;
      color: var(--color-primary-700);
    }
  }
`;
export default MyLikeItem;
