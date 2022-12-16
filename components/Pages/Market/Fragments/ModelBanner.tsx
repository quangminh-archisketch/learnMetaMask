import { useEffect } from 'react';
import Script from 'next/script';

import styled from 'styled-components';

import useWindowSize from 'hooks/useWindowSize';

import { maxMedia } from 'styles/__media';

const ModelInBanner = () => {
  const [width] = useWindowSize();

  useEffect(() => {
    var modelIntro = document.querySelector('#model-intro');

    modelIntro?.addEventListener(
      'load',
      () => {
        modelIntro?.setAttribute('scale', width < 992 ? '0.9 0.9 0.9' : '0.8 0.8 0.8');
      },
      { once: true }
    );
  }, [width]);

  const ModelViewer = `
    <model-viewer
      id="model-intro"
      src='/static/model/model-homepage.glb'
      camera-controls
      disable-zoom
			environment-image="legacy"
      autoplay
			shadow-softness="0.7"
			exposure="3"
			shadow-intensity="1"
			ar-modes="webxr scene-viewer quick-look"
			interaction-prompt="none"
			bounds="tight"
			loading="lazy"
			modelCacheSize="0"
			camera-orbit="${width < 992 ? '40deg 50deg 85%' : '40deg 45deg 80%'}"
      camera-target="${width < 992 ? 'auto auto auto' : '0cm 80cm 0cm'}"
			xr-environment
			rotation-per-second="20deg"
      style="background-color: unset;" />
  `;

  return (
    <>
      <Script type='module' src='https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js' />
      <Script noModule src='https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js' />
      <Script src='https://unpkg.com/focus-visible@5.0.2/dist/focus-visible.js' defer />

      <Wrapper
        dangerouslySetInnerHTML={{ __html: ModelViewer }}
        onTouchStart={() => (document.body.style.cssText = 'overflow: hidden; touch-action: none;')}
        onTouchEnd={() => (document.body.style.cssText = '')}
      />
    </>
  );
};

export default ModelInBanner;

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  width: 60%;
  height: 100%;

  model-viewer {
    width: 100%;
    height: 100%;

    --progress-bar-color: transparent;
    --poster-color: transparent;
  }

  ${maxMedia.medium} {
    top: 20px;
    right: 0;
    width: 100%;
    height: 50vw;
    transform: unset;
  }

  ${maxMedia.small} {
    height: 80vw;
  }
`;
