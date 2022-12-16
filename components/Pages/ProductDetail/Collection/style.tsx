import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

export const Title_wrapper = styled.h3`
  margin: 20px 0 30px 0;
  font-size: 20px;
  letter-spacing: 1.1px;
  color: #0a0a0a;
  font-weight: 600;
  text-align: center;

  ${maxMedia.medium} {
    margin: 0;
    margin-bottom: 10px;
    text-align: left;
  }
`;

export const Card_wrapper = styled.div`
  position: relative;

  .slick-list {
    margin: 0 -10px;
  }

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 45%;
    transform: translateY(-55%);
    z-index: 1;
    cursor: pointer;

    /* svg {
      fill: none;
    } */

    &--next {
      right: 5px;
    }

    &--prev {
      left: 5px;
    }

    ${maxMedia.medium} {
      display: none;
    }
  }

  .ant-carousel.slider__mobile {
    display: none;
  }

  ${maxMedia.medium} {
    .ant-carousel .slider__desktop {
      display: none;
    }

    .ant-carousel.slider__mobile {
      display: block;
    }

    .ant-carousel .slider {
      display: flex;
      gap: 10px;
      margin: 0 -20px;
      padding-right: 20px;
      padding-left: 20px;
      overflow-x: scroll;

      ${maxMedia.xsmall} {
        gap: 10px;
      }

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }

    .slick-list {
      margin: 0;
    }

    .arrow {
      display: none;
    }
  }

  .slick-track {
    display: flex !important;
  }

  .slick-slide {
    height: inherit !important;
  }

  .slick-slide > div {
    height: 100%;
  }
`;

export const Card_item = styled.div`
  display: flex !important;
  flex-direction: column;
  width: 295px;
  height: 100%;
  padding: 0 10px;
  border-radius: 10px;
  position: relative;
  z-index: 1;

  .card__line {
    width: 100%;
    height: 7px;
    border: 1px solid var(--color-main-6);
    border-top: 0;
    border-radius: 0 0 10px 10px;
  }

  .card__header {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    border: 1px solid var(--color-main-6);

    border-radius: 10px 10px 0 0;
    overflow: hidden;

    &::after,
    &::before {
      content: '';
      position: absolute;
      background-color: #c2c2c2;
      z-index: 1;
    }

    &::after {
      width: 100%;
      height: 1px;
      top: 50%;
      transform: translateY(-50%);
    }

    &::before {
      width: 1px;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .header__item {
    flex: 50%;
    aspect-ratio: 147 / 86;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .card__footer {
    flex-grow: 1;
    border: 1px solid var(--color-main-6);
    border-top: 0;
    border-radius: 0 0 10px 10px;

    .footer__content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 12px 17px;
      padding-top: 5px;
      gap: 5px;

      .logo {
        display: flex;
        align-items: center;
        gap: 5px;

        span {
          font-size: 13px;
          color: #333333;
          line-height: 16px;
          font-weight: 500;
        }

        .my-icon {
          display: flex;
          align-items: center;
        }
      }

      .review {
        display: flex;
        align-items: center;
        gap: 10px;

        &__item {
          display: flex;
          align-items: center;
          gap: 8px;

          svg {
            fill: #a3a3a3;
          }

          &--text {
            margin-top: 3px;
            font-size: 12px;
            color: #a3a3a3;
          }
        }

        &__line {
          width: 1px;
          height: 16px;
          background-color: rgba(0, 0, 0, 0.06);
        }
      }
    }
  }

  ${maxMedia.medium} {
    flex-shrink: 0;
    padding: 0;
  }
`;
