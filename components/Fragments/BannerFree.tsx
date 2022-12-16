import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppState } from 'store/type';
import { SaveBanner } from 'store/reducer/web';
import { CloseBanner } from 'store/reducer/modal';

import bannerServices from 'services/banner-services';

import Icon from './Icons';

import { minMedia } from 'styles/__media';
import styled from 'styled-components';

const BannerFreeFragment = () => {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const dispatch = useDispatch();
  const banner = useSelector((state: AppState) => state.web.banner);
  const isCloseBanner = useSelector((state: AppState) => state.modal.isCloseBanner);

  useEffect(() => {
    if (banner || path) return;
    const onFetchBanner = async () => {
      try {
        const resp = await bannerServices.getBanner();

        if (!resp.error) {
          dispatch(SaveBanner(resp.data[0]));
        }
      } catch (error) {}
    };

    onFetchBanner();
  }, []);

  if (!banner || isCloseBanner || path) return null;

  return (
    <BannerFreeFragment_wrapper>
      <Link href={banner?.link || '/'}>
        <a>
          <img src={banner?.image} alt='' />
        </a>
      </Link>
      <div className='icon__close'>
        <Icon iconName='close' onClick={() => dispatch(CloseBanner())} />
      </div>
    </BannerFreeFragment_wrapper>
  );
};

const BannerFreeFragment_wrapper = styled.div`
  position: fixed;
  width: 500px;
  max-height: 261px;
  max-width: calc(100% - 42px);
  bottom: 46px;
  right: 21px;
  z-index: 999;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;

  img {
    object-fit: cover;
    display: block;
    width: 500px;
    max-height: 261px;
  }

  .icon__close {
    width: auto;
    height: 25px;
    position: absolute;
    right: 5px;
    top: 5px;
    background-color: rgba(var(--color-gray-rgb-13), 50%);
    border-radius: 50%;
    padding: 5px;
    z-index: 99999999;
    cursor: pointer;
    transition: 0.3s;
    .my-icon {
      color: #fff;
    }
  }
  ${minMedia.medium} {
    .icon__close {
      opacity: 0;
      visibility: hidden;
    }
    &:hover {
      .icon__close {
        opacity: 1;
        visibility: visible;
      }
      span.close.my-icon {
        opacity: 1;
      }
    }
  }
`;

export default BannerFreeFragment;
