import { Col, Row } from 'antd';
import Picture from 'components/Fragments/Picture';

import { Container } from 'styles/__styles';
import * as L from './style';

const BigBanner3D = () => {
  return (
    <L.BigBanner3D_wrapper>
      <Container>
        <L.Share3D_wrapper className='box__wrapper'>
          <h3 className='title section__title section__title--mobile'>
            Share and embed 3D <span>models anywhere online</span>
          </h3>

          <Row
            gutter={[
              { xl: 157, sm: 20, xs: 20 },
              { xl: 80, sm: 35, xs: 25 },
            ]}>
            <Col md={12} span={24}>
              <L.Card__wrapper>
                <Picture
                  image='static/images/homepage/share3d-1.png'
                  image_x2='static/images/homepage/share3d-1@2x.png'
                  image_x3='static/images/homepage/share3d-1@3x.png'
                />
                <p className='card__text'>
                  Embeddable everywhere, for eCommerce, advertising and social media.
                </p>
              </L.Card__wrapper>
            </Col>

            <Col md={12} span={24}>
              <L.Card__wrapper>
                <Picture
                  image='static/images/homepage/share3d-2.png'
                  image_x2='static/images/homepage/share3d-2@2x.png'
                  image_x3='static/images/homepage/share3d-2@3x.png'
                />
                <p className='card__text'>Market-leading 3D player for the web.</p>
              </L.Card__wrapper>
            </Col>

            <Col md={12} span={24}>
              <L.Card__wrapper>
                <Picture
                  image='static/images/homepage/share3d-3.png'
                  image_x2='static/images/homepage/share3d-3@2x.png'
                  image_x3='static/images/homepage/share3d-3@3x.png'
                />
                <p className='card__text'>Interactive and configurable, VR and AR ready.</p>
              </L.Card__wrapper>
            </Col>

            <Col md={12} span={24}>
              <L.Card__wrapper>
                <Picture
                  image='static/images/homepage/share3d-4.png'
                  image_x2='static/images/homepage/share3d-4@2x.png'
                  image_x3='static/images/homepage/share3d-4@3x.png'
                />
                <p className='card__text'>Works with all operating systems, browsers and devices</p>
              </L.Card__wrapper>
            </Col>
          </Row>
        </L.Share3D_wrapper>

        <L.DoMore__wrapper className='box__wrapper'>
          <h3 className='title section__title section__title--mobile domore__title'>
            Do more with <span> your 3D models</span>
          </h3>

          <Row gutter={[40, 40]}>
            <Col span={24} md={8}>
              <L.Item_wrapper>
                <Picture
                  image='static/images/homepage/domore-1.png'
                  image_x2='static/images/homepage/domore-1@2x.png'
                  image_x3='static/images/homepage/domore-1@3x.png'
                />
                <h3 className='title'>Download 3D Models</h3>
                <p className='description'>
                  Download free models and distribute yours by licensing them with Creative Commons.
                </p>
              </L.Item_wrapper>
            </Col>

            <Col span={24} md={8}>
              <L.Item_wrapper>
                <Picture
                  image='static/images/homepage/domore-2.png'
                  image_x2='static/images/homepage/domore-2@2x.png'
                  image_x3='static/images/homepage/domore-2@3x.png'
                />
                <h3 className='title'>VR/AR</h3>
                <p className='description'>
                  View models in VR using your favorite headset. Use our mobile app to view in AR.
                </p>
              </L.Item_wrapper>
            </Col>

            <Col span={24} md={8}>
              <L.Item_wrapper>
                <Picture
                  image='static/images/homepage/domore-3.png'
                  image_x2='static/images/homepage/domore-3@2x.png'
                  image_x3='static/images/homepage/domore-3@3x.png'
                />
                <h3 className='title'>Build Apps</h3>
                <p className='description'>
                  With our Viewer and Download APIs, build custom 3D apps such as configurators, or
                  in-app 3D model downloads.
                </p>
              </L.Item_wrapper>
            </Col>
          </Row>
        </L.DoMore__wrapper>

        <L.Video__wrapper>
          <img src='static/images/homepage/video.jpg' alt='' loading='lazy' />
        </L.Video__wrapper>
      </Container>
    </L.BigBanner3D_wrapper>
  );
};

export default BigBanner3D;
