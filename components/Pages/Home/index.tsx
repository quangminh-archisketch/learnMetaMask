import styled from 'styled-components';

import HomeBanner from './Banner';
import BuySell from './BuySell';
import HomeIntroduction from './Introduction';
import Models3D from './Models3D';
import ModelsProduct from './ModelsProduct';
import BigBanner3D from './BigBanner3D';
import { maxMedia, maxMediaQuery } from 'styles/__media';
import ListFilm from './ListFilm';

const Wrapper = styled.main`
  .section__title {
    width: fit-content;
    margin: 0 auto;
    position: relative;
    font-size: 3.2rem;
    line-height: 4rem;
    font-weight: 600;
    color: var(--color-gray-11);
    text-align: center;

    letter-spacing: 0.14rem;
    z-index: 1;

    &::after,
    span::after {
      content: '';
      width: calc(100% + 1rem);
      height: 2.8rem;
      position: absolute;
      bottom: -7%;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--color-main-1);
      box-sizing: initial;
      z-index: -1;
    }

    ${maxMediaQuery(1024)} {
      letter-spacing: 0.06rem;

      &--mobile {
        &::after {
          width: 0;
          height: 0;
        }

        span {
          display: block;
          width: fit-content;
          margin: 0 auto;
          position: relative;
        }
      }
    }

    ${maxMedia.small} {
      font-size: 2rem;
      line-height: normal;
    }
  }

  .btn__more {
    min-height: 4.2rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-main-1);
  }
`;

const HomePage = () => {
  return (
    <Wrapper>
      <HomeBanner />
      <ListFilm />
      <HomeIntroduction />
      <BuySell />
      <BigBanner3D />
      <ModelsProduct />
      <Models3D />
    </Wrapper>
  );
};
export default HomePage;
