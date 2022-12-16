import styled from 'styled-components';
import { maxMedia, minMedia } from 'styles/__media';

export const Models_wrapper = styled.div`
  margin-top: 15rem;
  margin-bottom: 15rem;

  ${maxMedia.xsmall} {
    margin-top: 8rem;
    margin-bottom: 10rem;
    position: relative;
    top: -1rem;
  }

  .btn__more {
    margin-top: 5rem;
    min-width: 17rem;

    ${maxMedia.small} {
      margin-top: 3rem;
      margin-bottom: 1.1rem;
    }
  }
`;

export const Title_wrapper = styled.div`
  max-width: 60.8rem;
  margin: 0 auto;
  margin-bottom: 6.5rem;
  text-align: center;

  .sub_title {
    margin-top: 2.4rem;
    font-size: 1.4rem;
    line-height: 2.2rem;
    color: var(--color-gray-9);
    opacity: 0.8;
  }

  ${maxMedia.small} {
    margin-bottom: 3rem;

    .sub_title {
      margin-top: 1.5rem;
      line-height: normal;
    }

    .title {
      font-size: 2.2rem;
      letter-spacing: 0.66px;
    }
  }
`;

export const Grid_wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;

  .item {
    width: 100%;
    aspect-ratio: 295 / 295;

    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-1 {
      max-height: initial;
      grid-area: 1 / 1 / 3 / 3;
      aspect-ratio: 610 / 610;
    }

    img,
    button {
      border-radius: 1rem;
    }

    button {
      position: absolute;
      top: 36.5%;
      left: 50%;
      transform: translateX(-50%);
      background-color: transparent;
      color: var(--color-main-1);
      width: 9.6rem;
      height: 4.2rem;
      border: solid 0.5px var(--color-main-1);
      font-weight: 600;
      font-size: 1.4rem;
      opacity: 0;

      &:hover {
        color: var(--color-main-1);
        background-color: var(--color-main-6);
        border-color: var(--color-main-6);
      }
      transition: 0.3s;
    }

    ${minMedia.medium} {
      &:hover button {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  ${maxMedia.small} {
    grid-template-columns: auto auto;

    .item {
      min-height: 157.5px;

      &-1 {
        grid-area: initial;
      }
    }
  }

  ${maxMedia.medium} {
    a {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    button {
      opacity: 0;
      visibility: hidden;
    }
  }
`;
