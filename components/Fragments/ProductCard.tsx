import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import Link from 'next/link';

import { Tooltip } from 'antd';

import { AppState } from 'store/type';
import { AddProductCartRedux } from 'store/reducer/cart';

import { AddToCart } from 'lib/utils/checkout';

import { changeToSlug, decimalPrecision, formatNumber } from 'common/functions';
import showNotification from 'common/functions/showNotification';
import percentDiscount from 'common/functions/percDiscount';

import urlPage from 'constants/url.constant';

import Icon from './Icons';
import Viewer360 from './View360';

import { ProductModel } from 'models/product.model';

import styled from 'styled-components';
import { maxMedia, minMedia } from 'styles/__media';

type Props = { data: ProductModel; className?: string; link_product?: string; pageName?: string };

const ProductCard = (props: Props) => {
  const { data, link_product, className = '', pageName } = props;

  const isFree = data.price === 0;

  const dispatch = useDispatch();
  const auth = useSelector((state: AppState) => state.auth);
  const pathToDetail = urlPage.productDetail.replace(
    '{slug}',
    changeToSlug(data.title) + '--' + data.id
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
      const res = await AddToCart(data.id);
      if (!res.error) dispatch(AddProductCartRedux(res.data));
    }
  };

  return (
    <Wrapper
      className={className}
      title={data?.title}
      notHover={isFree || pageName === 'profile-seller'}>
      <Link href={link_product || pathToDetail}>
        <a>
          <div className='product_image'>
            <Viewer360 id={data.id} imageDefault={data.image || ''} imageAlt={data?.title} />
          </div>
        </a>
      </Link>

      <div className='product_content'>
        <div className='product_name'>
          <Link href={link_product || pathToDetail}>{data?.title}</Link>
        </div>
        {pageName === 'profile-seller' && (
          <div className='product_price_group'>
            <Icon iconName='cart-add' className='product_btn-cart' onClick={onAddToCart} />
          </div>
        )}

        {pageName !== 'profile-seller' && (
          <div className='product_price_group'>
            {!isFree && data.old_price && (
              <p className='product_price-old'>{formatNumber(data.old_price, '$')}</p>
            )}
            <p className='product_price'>
              {!isFree && data?.old_price && (
                <span>-{decimalPrecision(percentDiscount(data.price, data.old_price), 2)}%</span>
              )}
              {isFree ? 'Free' : formatNumber(data.price || 0, '$')}
            </p>
            <Icon iconName='cart-add' className='product_btn-cart' onClick={onAddToCart} />
          </div>
        )}

        {pageName === 'profile-seller' && (
          <div className='product_preview_group'>
            <Tooltip title={data.like_count > 1 ? 'Likes' : 'Like'}>
              <div className='like_wrapper'>
                <Icon iconName='product-like' className='icon' />
                {data.like_count}
              </div>
            </Tooltip>

            <Tooltip title={data.viewed_count > 1 ? 'Views' : 'View'}>
              <div className='watch_wrapper'>
                <Icon iconName='seller-eye' className='icon' />
                {data.viewed_count}
              </div>
            </Tooltip>

            {!isFree && (
              <Tooltip
                title={data.market_reviews_aggregate?.aggregate?.count > 1 ? 'Reviews' : 'Review'}>
                <div className='star_wrapper'>
                  <Icon iconName='star-rounded' />
                  {data.market_reviews_aggregate?.aggregate?.count || 0}
                </div>
              </Tooltip>
            )}
          </div>
        )}
      </div>

      {pageName !== 'profile-seller' && moment().diff(data.createdAt, 'days') <= 7 && (
        <div className='product_badge --new'>New</div>
      )}
    </Wrapper>
  );
};

export default ProductCard;

const Wrapper = styled.div<{ notHover: boolean }>`
  position: relative;

  background-color: #edeef0;
  border-radius: 5px;

  overflow: hidden;

  cursor: pointer;

  ${(props) => {
    if (!props.notHover)
      return `
        ${minMedia.medium} {
          &:hover {
            .product {
              &_price, &_price-old, &_preview_group {display: none;}
              &_btn-cart {display: inline-block;}
            }
          }
        }
    `;
  }}

  .product {
    &_image {
      width: 100%;
      aspect-ratio: 317 / 238;
    }

    &_content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      min-height: 4.8rem;
      padding: 1.5rem 0.6rem;

      font-size: 12px;
    }

    &_name {
      padding-right: 10px;
      font-size: inherit;
      font-weight: 600;
      line-height: 1.33;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      a {
        color: var(--text-title);
      }
    }

    &_price_group {
      display: inline-flex;
      align-items: center;
      gap: 2rem;
    }

    &_price-old {
      line-height: 1.33;
      color: var(--color-gray-6);
      text-decoration: line-through;

      ${maxMedia.small} {
        display: none;
      }
    }

    &_price {
      font-weight: 600;
      line-height: 1.33;
      color: var(--color-primary-700);

      ${maxMedia.small} {
        margin-left: 0.7rem;
      }

      span {
        margin-right: 0.5rem;
        line-height: 1.33;
        color: var(--color-red-6);

        ${maxMedia.small} {
          display: none;
        }
      }
    }

    &_btn-cart {
      display: none;

      width: 1.5rem;
      color: var(--color-red-6);
      cursor: pointer;
    }

    &_badge {
      position: absolute;
      top: 0;
      right: 0;

      padding: 4px 8px;

      font-size: 12px;
      font-weight: 600;
      line-height: 1.33;
      color: var(--color-white);
      background-color: var(--color-red-6);

      &.--new {
        background-color: orange;
      }
    }

    &_preview_group {
      display: flex;
      align-items: center;
      gap: 15px;

      .like_wrapper,
      .watch_wrapper,
      .star_wrapper {
        display: flex;
        align-items: center;
        color: var(--color-gray-7);
        font-size: 12px;
        transition: 0.3s;

        .my-icon {
          svg {
            margin-right: 3px;
            width: auto;
            height: 15px;

            path,
            g {
              transition: 0.3s;
            }
          }
        }

        .seller-eye {
          svg {
            color: transparent;
          }
          path:last-child {
            stroke: var(--color-gray-7);
          }
        }

        .seller-star {
          svg {
            color: transparent;
          }

          path {
            stroke: var(--color-gray-7);
          }
        }

        &:hover {
          color: var(--color-primary-700);

          .star-rounded,
          .product-like {
            path,
            g {
              fill: var(--color-primary-700);
            }
          }

          .seller-eye path {
            stroke: var(--color-primary-700);
          }
        }
      }
    }
  }
`;
