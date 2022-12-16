import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

export const BuySell_wrapper = styled.section`
  position: relative;
  z-index: 1;
  margin-bottom: -10.4rem;
  padding-top: 19.6rem;
  padding-bottom: 15rem;

  background-image: url('/static/images/homepage/BG-buy-sell.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;

  ${maxMedia.medium} {
    background-image: url('/static/images/homepage/BG-buy-sell-mobile@3x.png');
    padding-top: 10.5rem;
    padding-bottom: 8.5rem;
    margin-bottom: -2.4rem;
  }

  ${maxMedia.xsmall} {
    padding-top: 7rem;
    padding-bottom: 8rem;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 6.5rem 0;

    ${maxMedia.medium} {
      flex-direction: column;
      align-items: center;
    }

    ${maxMedia.xsmall} {
      gap: 3rem 0;
    }
  }
`;

export const Header_wrapper = styled.div`
  margin-bottom: 12rem;
  text-align: center;

  .sub_title {
    max-width: 46.8rem;
    margin: 0 auto;
    margin-top: 4rem;
    font-size: 1.4rem;
    line-height: 2.2rem;
    color: var(--color-gray-9);
    opacity: 0.8;

    ${maxMedia.small} {
      margin-top: 1.5rem;
      line-height: normal;
      max-width: 29.5rem;
    }
  }

  ${maxMedia.medium} {
    margin-bottom: 8.4rem;
  }

  ${maxMedia.xsmall} {
    margin-bottom: 3rem;
  }
`;

export const Card_wrapper = styled.section`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: calc(511 / 1440 * 100vw);
  max-width: 51.1rem;

  &:last-child:nth-child(odd) {
    margin: 0 auto;
  }

  img {
    height: auto;
    /* max-height: 38.9rem; */
  }

  ${maxMedia.medium} {
    width: calc(511 / 991 * 100vw);
    text-align: center;
  }

  ${maxMedia.xsmall} {
    width: calc(250 / 375 * 100vw);
  }

  .card {
    &__content {
      display: flex;
      flex-direction: column;
      flex: auto;

      max-width: 51.1rem;

      margin: 0 auto;
      text-align: center;
    }

    &__title {
      font-size: 1.6rem;
      color: var(--color-main-11);
      line-height: 2.4rem;
      font-weight: 600;
    }

    &__subtitle {
      flex: auto;
      margin-top: 1rem;
      margin-bottom: 2rem;
      font-size: 1.4rem;
      line-height: 2.2rem;
      color: var(--color-gray-9);
    }

    &__link {
      color: var(--color-main-6);
      line-height: 1.6rem;
      font-size: 1.2rem;
    }
  }
`;
