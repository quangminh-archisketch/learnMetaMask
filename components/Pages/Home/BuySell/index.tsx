import Link from 'next/link';

import Picture from 'components/Fragments/Picture';

import { Container } from 'styles/__styles';
import * as L from './style';

const BuySell = () => {
  return (
    <L.BuySell_wrapper>
      <Container>
        <L.Header_wrapper>
          <h3 className='title section__title section__title--mobile'>
            Buy & sell 3D models on <span>the VRStyler Store</span>
          </h3>
          <p className='sub_title'>
            Find everything from low poly assets to animated rigs & digital scans for your 3D,
            Virtual Reality, and Augmented Reality projects.
          </p>
        </L.Header_wrapper>

        <div className='list'>
          <L.Card_wrapper>
            <Picture
              image='static/images/homepage/buy-sell-1.png'
              image_x2='static/images/homepage/buy-sell-1@2x.png'
              image_x3='static/images/homepage/buy-sell-1@3x.png'
            />

            <div className='card__content'>
              <h3 className='card__title'>Versatile 3D/AR/VR Viewer</h3>
              <p className='card__subtitle'>
                Preview 3D models with 360 HD viewer and check model information before purchasing
              </p>
              <Link href=''>
                <a className='card__link'>See An Example</a>
              </Link>
            </div>
          </L.Card_wrapper>

          <L.Card_wrapper>
            <Picture
              image='static/images/homepage/buy-sell-2.png'
              image_x2='static/images/homepage/buy-sell-2@2x.png'
              image_x3='static/images/homepage/buy-sell-2@3x.png'
            />
            <div className='card__content'>
              <h3 className='card__title'>Millions of 3D Models</h3>
              <p className='card__subtitle'>
                VRStyler provides a wide variety of 3D models that you need. Resolution from low
                to high, Models in each category can be visualized
              </p>
              <Link href=''>
                <a className='card__link'>Category Now</a>
              </Link>
            </div>
          </L.Card_wrapper>

          <L.Card_wrapper>
            <Picture
              image='static/images/homepage/buy-sell-3.png'
              image_x2='static/images/homepage/buy-sell-3@2x.png'
              image_x3='static/images/homepage/buy-sell-3@3x.png'
            />
            <div className='card__content'>
              <h3 className='card__title'>Versatile 3D/AR/VR Viewer</h3>
              <p className='card__subtitle'>
                PBR materials, animated rigs, and more in a universal format.
              </p>
              <Link href=''>
                <a className='card__link'>Read Now</a>
              </Link>
            </div>
          </L.Card_wrapper>
        </div>
      </Container>
    </L.BuySell_wrapper>
  );
};

export default BuySell;
