import Link from 'next/link';

import styled from 'styled-components';
import { Button } from 'antd';

import ModelInBanner from 'components/Pages/Market/Fragments/ModelBanner';
import SocialInBanner from 'components/Fragments/SocicalBanner';

import { Container } from 'styles/__styles';
import { maxMedia } from 'styles/__media';

type Props = {
  title: string;
  caption: string;
};

const Banner = (props: Props) => {
  return (
    <Wrapper>
      <Container>
        <div className='banner_box'>
          <Content>
            <h1 className='banner_title' dangerouslySetInnerHTML={{ __html: props.title }} />
            <p className='banner_caption' dangerouslySetInnerHTML={{ __html: props.caption }} />

            <Button className='banner_btn-explore' shape='round'>
              <Link href='/explore/all'>Explore Now</Link>
            </Button>
          </Content>

          <ModelInBanner />

          <SocialInBanner
            size='small'
            color='var(--color-gray-1)'
            bgColor='rgb(255 255 255 / 0.2)'
          />
        </div>
      </Container>
    </Wrapper>
  );
};
export default Banner;

// CSS
const Wrapper = styled.section`
  background-image: url('/static/images/market/banner-bg.svg');
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;

  ${maxMedia.medium} {
    position: relative;
    background-image: url('/static/images/market/banner-bg--mobile.svg');
    background-size: 100% auto;

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;

      content: '';
      width: 100%;
      height: 50%;
      background-color: var(--color-primary-700);
    }
  }

  .banner_box {
    display: flex;
    align-items: center;

    position: relative;

    height: 100vh;
    max-height: 70rem;

    ${maxMedia.medium} {
      height: auto;
      max-height: unset;
      padding: 50vw 0 16vw;
    }

    ${maxMedia.small} {
      padding: 85vw 0 18vw;
    }
  }

  .banner_social {
    top: 21.5rem;
    transform: translate(-50%, 0);
  }
`;
const Content = styled.div`
  .banner_title {
    font-size: 4.8rem;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 1.44px;
    color: var(--color-gray-1);

    span {
      font-weight: 600;
      letter-spacing: 1.6px;
    }

    ${maxMedia.medium} {
      width: 100%;
      text-align: center;
    }

    ${maxMedia.small} {
      font-size: 32px;
    }
  }

  .banner_caption {
    margin-top: 2rem;

    font-size: 18px;
    font-weight: 300;
    line-height: 1.6;
    color: var(--color-gray-1);

    ${maxMedia.medium} {
      width: 100%;
      text-align: center;

      br {
        display: none;
      }
    }

    ${maxMedia.small} {
      margin-top: 1rem;
      font-size: 16px;
    }
  }

  .banner_btn-explore {
    width: 18rem;
    height: 5.6rem;
    margin-top: 2rem;

    font-size: 14px;
    font-weight: 600;
    line-height: 1.57;
    border: none;
    color: #ffffff;
    background-color: var(--color-primary-600);

    ${maxMedia.medium} {
      margin-top: 20px;
      width: 100%;
      height: 48px;
    }
  }
`;
