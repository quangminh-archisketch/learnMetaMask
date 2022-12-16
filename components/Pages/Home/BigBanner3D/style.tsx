import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

export const BigBanner3D_wrapper = styled.section`
  padding-top: 20rem;
  padding-bottom: 14rem;
  margin-bottom: -4rem;

  background-image: url('/static/images/homepage/BG-Share-3D.png');
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
  background-size: cover;

  .box__wrapper {
    border-radius: 1.5rem;
    background: var(--color-gray-1);
  }

  h3.domore__title {
    margin-bottom: 12rem;
  }

  ${maxMedia.medium} {
    background-image: url('/static/images/homepage/BG-Share-3DMobile.png');

    h3.domore__title {
      margin-bottom: 6rem;
    }
  }

  ${maxMedia.small} {
    h3.domore__title {
      margin-bottom: 3.2rem;
    }
  }

  ${maxMedia.xsmall} {
    padding-top: 14.4rem;
    padding-bottom: 13rem;
  }
`;

export const Share3D_wrapper = styled.section`
  padding: 10rem 18.8rem;

  h3.title {
    margin-bottom: 9rem;
    text-align: center;

    ${maxMedia.small} {
      margin-bottom: 4.2rem;
    }
  }

  ${maxMedia.medium} {
    padding: 4rem;
  }
`;

export const Card__wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  img {
    width: 7rem;
    height: 7rem;
  }

  ${maxMedia.xsmall} {
    img {
      width: 6rem;
      height: 6rem;
    }
  }

  .card {
    max-width: 36.9rem;

    &__text {
      max-width: 26.9rem;
      font-size: 1.6rem;
      line-height: 2.4rem;
      color: var(--color-main-9);

      ${maxMedia.small} {
        font-size: 1.2rem;
        line-height: normal;
      }
    }
  }
`;

export const DoMore__wrapper = styled.section`
  padding: 10rem;
  margin: 40rem 0;

  ${maxMedia.medium} {
    padding: 2rem;
    margin: 200px 0;
  }
`;

export const Video__wrapper = styled.section`
  aspect-ratio: 1240 / 734;
`;

export const Item_wrapper = styled.div`
  text-align: center;

  img {
    width: 9rem;
    height: 9rem;
  }

  ${maxMedia.xsmall} {
    img {
      width: 7rem;
      height: 7rem;
    }
  }

  .title {
    margin: 1.5rem 0;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: var(--color-gray-12);
  }

  .description {
    font-size: 1.4rem;
    line-height: 2.2rem;
    color: var(--color-main-9);
  }

  ${maxMedia.small} {
    .title {
      margin: 10px 0;
    }

    .description {
      font-size: 1.2rem;
    }
  }
`;
