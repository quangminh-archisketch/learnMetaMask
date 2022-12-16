import { useRef } from 'react';

import styled from 'styled-components';

import HeaderSection from './Fragments/HeaderSection';

import { Container } from 'styles/__styles';
import { maxMedia } from 'styles/__media';

const VideoModelAR = ({ video }: { video: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Wrapper>
      <Container>
        <HeaderSection
          title='Models built for AR'
          caption='AR technology overlays the actual scene with some computer-generated virtual objects, to enrich the overall view on your <br/>Apple & Android devices.'
        />

        <video ref={videoRef} autoPlay loop muted playsInline>
          <source src={video} type='video/mp4' />
        </video>
      </Container>
    </Wrapper>
  );
};
export default VideoModelAR;

const Wrapper = styled.section`
  padding: 100px 0;
  text-align: center;

  ${maxMedia.small} {
    padding: 50px 0;
  }

  video {
    width: 100%;
    max-width: 820px;
    margin: 40px auto 0;
  }
`;
