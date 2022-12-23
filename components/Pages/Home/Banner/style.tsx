import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

export const Wrapper = styled.div`
  .banner-image {
    max-width: 100%;
    max-height: 100%;
    background-position: center;
    background-repeat: no-repeat;
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
