import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

export const Models_wrapper = styled.section`
  padding: 15rem 0;
  background-image: url('/static/images/homepage/BG-product-category.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;

  .btn__more {
    margin-top: 4rem;
    width: 111px;
  }

  ${maxMedia.medium} {
    padding-top: 10rem;
    padding-bottom: 10.3rem;
    background-image: url('/static/images/homepage/BG-product-category@3x.png');
  }

  ${maxMedia.xsmall} {
    margin-top: 1rem;
    padding-top: 8rem;
  }
`;

export const Box_wrapper = styled.div`
  max-width: 1060px;
  margin: 0 auto;
  padding: 2.4rem 8.8rem;
  margin-top: 7.1rem;
  background-color: var(--color-gray-1);
  border-radius: 1.5rem;
  border: 1px solid var(--color-gray-5);

  ul {
    display: grid;
    grid-template-columns: 30% 35% 30%;
    justify-content: space-between;
    position: relative;
    gap: 1.8rem 0;

    &::after,
    &::before {
      content: '';
      width: 1px;
      height: 100%;
      position: absolute;
      top: 0;
      background-color: var(--color-line);
    }

    &::after {
      left: 30%;
    }

    &::before {
      right: 30%;
    }

    li {
      width: 100%;
      list-style-type: none;

      &:nth-child(3n -1) {
        padding-left: 30px;
      }

      &:nth-child(3n) {
        padding-left: 50px;
      }

      &:nth-child(3n-2) {
        padding-right: 30px;
      }
    }

    ${maxMedia.medium} {
      grid-template-columns: 50% 50%;

      .column {
        &__center {
          border-left: initial;
          border-right: initial;
        }
      }

      &::after,
      &::before {
        display: none;
      }

      li {
        &:nth-child(3n -1) {
          padding: 0;
        }

        &:nth-child(3n) {
          padding-left: 0;
        }

        &:nth-child(3n-2) {
          padding-right: 0;
        }

        padding: 0 20px !important;
      }
    }

    ${maxMedia.xsmall} {
      grid-gap: 1.3rem 0;
    }
  }

  ${maxMedia.medium} {
    padding: 24px 44px;
  }

  ${maxMedia.xsmall} {
    padding: 0;
    margin-top: 4rem;
    background-color: transparent;
    border: none;
  }

  ${maxMedia.xsmall} {
    ul {
      grid-template-columns: 100%;

      li {
        padding: 0 10px !important;
      }
    }
  }

  .item {
    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    img {
      width: 1.5rem;
      height: 1.5rem;
    }

    p {
      font-size: 1.6rem;
      line-height: 1;
      color: var(--color-gray-8);
    }
  }
`;
