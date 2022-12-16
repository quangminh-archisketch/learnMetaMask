import styled from 'styled-components';

import HeaderSection from './Fragments/HeaderSection';

import { Container } from 'styles/__styles';
import { maxMedia } from 'styles/__media';

const ExperiencePlaces = () => {
  return (
    <Wrapper>
      <Container>
        <HeaderSection
          title='3D models anywhere'
          caption='You can experience the web anywhere as long as it has <br/>an internet connection.'
        />

        <List>
          <Item>
            <img src='/static/images/market/experience-places-01.svg' alt='' />
            <h5>Works with all operating systems, browsers and devices.</h5>
          </Item>
          <Item>
            <img src='/static/images/market/experience-places-02.svg' alt='' />
            <h5>Market-leading 3D player for the web.</h5>
          </Item>
          <Item>
            <img src='/static/images/market/experience-places-03.svg' alt='' />
            <h5>Interactive and configurable, AR ready.</h5>
          </Item>
        </List>
      </Container>
    </Wrapper>
  );
};
export default ExperiencePlaces;

const Wrapper = styled.section`
  padding: 100px 0;
  background-color: var(--color-primary-25);

  ${maxMedia.small} {
    padding: 50px 0;
  }
`;
const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 40px;
  padding: 0 40px;
  gap: 40px;

  ${maxMedia.small} {
    grid-template-columns: 100%;
    padding: 0;
  }
`;
const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;

  img {
    width: 84px;

    ${maxMedia.small} {
      width: 80px;
    }
  }

  h5 {
    width: calc(100% - 99px);
    font-size: 16px;
    font-weight: 400;
    color: var(--text-caption);

    ${maxMedia.small} {
      width: calc(100% - 95px);
    }
  }
`;
