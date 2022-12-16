import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/type';
import { AddProductCartRedux } from 'store/reducer/cart';

import { Button, message, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { decimalPrecision, formatNumber } from 'common/functions';
import percentDiscount from 'common/functions/percDiscount';
import { AddToCart } from 'lib/utils/checkout';

import Icon from 'components/Fragments/Icons';
import ModalDownloadModel from 'components/Fragments/ModalDownloadModel';

import { ProductModel } from 'models/product.model';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

type Props = {
  data: ProductModel;
  isFree?: boolean;
};

const ProductDetailHeader = (props: Props) => {
  const { data, isFree } = props;

  const router = useRouter();

  const dispatch = useDispatch();
  const auth = useSelector((state: AppState) => state.auth);

  const [openDownload, setOpenDownload] = useState<boolean>(false);

  const onAddToCart = async () => {
    if (!auth?.token) router.push(`/login?redirect=${router.asPath}`);
    else if (typeof auth.token === 'string' && !auth.user?.status)
      message.warning('Please verify your account to add to cart');
    else {
      const res = await AddToCart(data.id);
      if (!res.error) dispatch(AddProductCartRedux(res.data));
    }
  };

  const onDownload = () => {
    if (!auth?.token) router.push(`/login?redirect=${router.asPath}`);
    else setOpenDownload(true);
  };

  return (
    <ProductHeader__Wrapper>
      <p className='price'>{formatNumber(data?.price, '$')}</p>
      {!isFree && (
        <div className='wrapper__discount'>
          {data?.old_price && (
            <span className='discount__price'>
              {decimalPrecision(percentDiscount(data?.price, data?.old_price), 2)}%
            </span>
          )}
          {data?.old_price && (
            <span className='old__price'>{formatNumber(data?.old_price, '$')}</span>
          )}
        </div>
      )}

      {/* <L.Wrapper_review>
            <Rate defaultValue={5} disabled />
            <span className='ant-rate-text count__review'>10 reviews</span>
          </L.Wrapper_review> */}
      {data.market_license && (
        <div className='Product__License d-flex align-items-center'>
          {data.market_license?.title}
          <Tooltip color='var(--color-primary-700)' title={data.market_license?.description}>
            <InfoCircleOutlined />
          </Tooltip>
          <a
            href={data.market_license?.link}
            target='_blank'
            rel='noreferrer'
            className='Product_License_Link'>
            Learn more
          </a>
        </div>
      )}

      {!isFree && (
        <ul className='Product__InterestCustomer'>
          <li>
            <Icon iconName='lock' />
            <span>Secure payment</span>
          </li>
          <li>
            <Icon iconName='mail' />
            <span>Support from sellers</span>
          </li>
          {/* <li>
            <Icon iconName='clock' />
            <span>Access to future versions</span>
          </li> */}
        </ul>
      )}

      {data.status === 1 && (
        <Button className='Btn_AddToCart w-100' onClick={isFree ? onDownload : onAddToCart}>
          {isFree ? 'Download Free' : 'Add To Cart'}
        </Button>
      )}

      {data.file_details && (
        <ModalDownloadModel
          isOpen={openDownload}
          isFree
          product={data}
          files={data.file_details}
          onClose={() => setOpenDownload(false)}
        />
      )}
    </ProductHeader__Wrapper>
  );
};

export default ProductDetailHeader;

const ProductHeader__Wrapper = styled.div`
  ${maxMedia.medium} {
    margin-top: 15px;
  }

  .price {
    font-size: 40px;
    font-weight: 600;
    line-height: 1;
    color: var(--text-caption);
  }

  .wrapper__discount {
    margin-top: 10px;

    .discount__price {
      font-size: 16px;
      font-weight: 500;
      color: var(--color-primary-500);
    }

    .old__price {
      margin-left: 10px;
      font-size: 16px;
      color: var(--color-gray-7);
      text-decoration: line-through;
    }
  }

  .Product__License {
    display: flex;
    align-items: center;
    gap: 6.5px;
    margin-top: 10px;
    font-size: 16px;
    color: var(--text-caption);

    & > span {
      color: var(--color-icon);
      cursor: pointer;
    }

    ${maxMedia.medium} {
      margin-top: 6px;
    }
  }

  .Product__InterestCustomer {
    margin-top: 20px;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 14px;
      color: var(--color-icon);

      & + li {
        margin-top: 6px;
      }

      .my-icon {
        font-size: 20px;
      }

      span + span {
        margin-left: 5px;
      }
    }

    ${maxMedia.medium} {
      margin-top: 15px;
    }
  }

  .Btn_AddToCart {
    margin-top: 20px;
    height: 42px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    color: #fff;
    background-color: var(--color-red-6);

    ${maxMedia.medium} {
      margin-top: 15px;
    }
  }
  .Product_License_Link {
    font-size: 14px;
    color: #1890ff;
    &:hover {
      color: #1890ff;
      text-decoration: underline;
    }
  }
`;
