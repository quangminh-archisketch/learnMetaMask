import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

export const Wrapper = styled.section`
  position: relative;

  height: 100vh;
  max-height: 100rem;

  background-image: url('/static/images/homepage/bg-banner.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom;

  overflow: hidden;

  .container {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 100%;
  }

  .banner_caption {
    max-width: 42.5rem;
    margin-top: 4.8rem;

    font-size: 1.6rem;
    line-height: 1.5;
    color: var(--color-gray-9);
  }

  ${maxMedia.medium} {
    max-height: 100rem;

    padding-bottom: 5rem;

    .banner_caption {
      max-width: 70rem;
      margin-top: 2rem;
    }
  }

  ${maxMedia.xsmall} {
    background-image: url('/static/images/homepage/bg-banner-mobile.png');
    text-align: center;

    .banner_caption {
      margin-top: 1.5rem;
      font-size: 1.4rem;
      line-height: normal;
    }
  }
`;

export const Title = styled.h1`
  font-size: 4.3rem;
  font-weight: 600;
  letter-spacing: 1.72px;
  color: var(--color-gray-11);

  span {
    display: inline-block;
    padding-bottom: 2px;
    background: url('/static/images/homepage/underline-text.png') no-repeat;
    background-size: 100% auto;
    background-position: bottom;
  }

  ${maxMedia.medium} {
    max-width: 70rem;
    font-size: 3.44rem;

    br {
      display: none;
    }
  }

  ${maxMedia.xsmall} {
    font-size: 2.5rem;
    letter-spacing: 1px;
  }
`;

export const GroupBtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin-top: 4.8rem;

  .ant-btn {
    width: 29rem;
    height: 5.6rem;

    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.57;

    &:first-child {
      color: var(--color-main-6);
      border-color: var(--color-main-6);
    }
  }

  ${maxMedia.medium} {
    margin-top: 2.8rem;
  }

  ${maxMedia.xsmall} {
    align-items: center;

    margin-top: 2.5rem;
    gap: 1.5rem;
  }
`;

export const Banner_Social = styled.ul`
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 2;

  list-style: none;
  color: var(--color-gray-11);

  &::before,
  &:after {
    content: '';
    width: 2px;
    height: 5.5rem;
    background-color: currentColor;
  }
  &:before {
    position: absolute;
    top: -1.8rem;
    left: 50%;
    transform: translate(-50%, -100%);
  }
  &:after {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 1.8rem);
  }

  li {
    width: 2.65rem;
    height: 2.65rem;

    border-radius: 50%;
    background-color: rgb(10 10 10 / 0.1);

    & + li {
      margin-top: 1.8rem;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 100%;
    }

    .my-icon {
      width: 1.4rem;
      color: var(--color-gray-11);
    }
  }

  ${maxMedia.medium} {
    display: none;
  }
`;

export const Banner_ModelViewer = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  width: 70%;
  height: 100%;

  model-viewer {
    width: 100%;
    height: 100%;

    --progress-bar-color: transparent;
    --poster-color: transparent;
  }

  ${maxMedia.medium} {
    width: calc(100% + 40px);
    height: 50vw;
    margin: 6rem -20px 10px -20px;
    position: unset;
    right: initial;
    transform: unset;
  }

  ${maxMedia.small} {
    height: 100vw;
  }
`;
