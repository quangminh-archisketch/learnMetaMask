import { Button, Col, Row } from 'antd';

import Picture from 'components/Fragments/Picture';

import { Container } from 'styles/__styles';
import * as SC from './style';

const HomeIntroduction = () => {
  return (
    <SC.Wrapper>
      <Container>
        <Row gutter={[20, 100]}>
          <Col span={24} md={8}>
            <SC.IntroItem>
              <Picture
                image='/static/images/homepage/intro_01.png'
                image_x2='/static/images/homepage/intro_01_x2.png'
                image_x3='/static/images/homepage/intro_01_x3.png'
              />
              <h3>
                Join millions of 3D <br />
                creators and showcase <br />
                your work
              </h3>
              <Button type='primary' shape='round'>
                Join Now
              </Button>
            </SC.IntroItem>
          </Col>

          <Col span={24} md={8}>
            <SC.IntroItem>
              <Picture
                image='/static/images/homepage/intro_02.png'
                image_x2='/static/images/homepage/intro_02_x2.png'
                image_x3='/static/images/homepage/intro_02_x3.png'
              />
              <h3>
                Buy & sell 3D models on the <br />
                VRStyler Store
              </h3>
              <Button type='primary' shape='round'>
                Buy 3D Models
              </Button>
            </SC.IntroItem>
          </Col>

          <Col span={24} md={8}>
            <SC.IntroItem>
              <Picture
                image='/static/images/homepage/intro_03.png'
                image_x2='/static/images/homepage/intro_03_x2.png'
                image_x3='/static/images/homepage/intro_03_x3.png'
              />
              <h3>
                Share & embed 3D models <br />
                anywhere online
              </h3>
              <Button type='primary' shape='round'>
                Explore Now
              </Button>
            </SC.IntroItem>
          </Col>
        </Row>
      </Container>
    </SC.Wrapper>
  );
};
export default HomeIntroduction;
