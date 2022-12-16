import { useEffect } from 'react';
import Link from 'next/link';

import { Button } from 'antd';

import useWindowSize from 'hooks/useWindowSize';

import Icon from 'components/Fragments/Icons';

import { Container } from 'styles/__styles';
import * as SC from './style';

const HomeBanner = () => {
  return (
    <SC.Wrapper>
      <Container className='container'>
        <ModelViewer />

        <SC.Title>
          The leading platform
          <br />
          for <span>3D & AR</span> on the web
        </SC.Title>
        <div className='banner_caption'>
          Manage your 3D assets. Distribute 3D & AR experiences. Collaborate with others. Showcase
          your work. Buy & sell 3D models.
        </div>

        <SC.GroupBtn>
          <Button shape='round'>
            <Link href={'/'}>Join For Free</Link>
          </Button>
          <Button type='primary' shape='round'>
            <Link href={'/'}>Explore Now</Link>
          </Button>
        </SC.GroupBtn>

        <SC.Banner_Social>
          <li>
            <a>
              <Icon iconName='youtube' />
            </a>
          </li>
          <li>
            <a>
              <Icon iconName='twitter' />
            </a>
          </li>
          <li>
            <a>
              <Icon iconName='facebook' />
            </a>
          </li>
          <li>
            <a>
              <Icon iconName='google' />
            </a>
          </li>
        </SC.Banner_Social>
      </Container>
    </SC.Wrapper>
  );
};

export default HomeBanner;

const ModelViewer = () => {
  const [width] = useWindowSize();

  useEffect(() => {
    var modelIntro = document.querySelector('#model-intro');

    modelIntro?.addEventListener(
      'load',
      () => modelIntro?.setAttribute('scale', width < 992 ? '0.9 0.9 0.9' : '0.7 0.7 0.7'),
      { once: true }
    );
  }, [width]);

  const ModelViewer = `
    <model-viewer
      id="model-intro"
      interaction-prompt="0"
      src='/static/model/homepage_banner.glb'
      ios-src=/static/model/homepage_banner.usdz'
      seamless-poster
      shadow-intensity="1"
      camera-controls
      camera-target="${width < 992 ? '0m 2m -0.5m' : '-0.4m 1.5m 0m'}"
      disable-zoom
      autoplay
      style="background-color: unset;" />
  `;

  return <SC.Banner_ModelViewer dangerouslySetInnerHTML={{ __html: ModelViewer }} />;
};
