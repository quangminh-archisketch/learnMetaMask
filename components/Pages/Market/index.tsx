import styled from 'styled-components';

import { getNewObjByFields } from 'common/functions';

import Banner from './Banner';
import Category from './Category';
import ExperiencePlaces from './ExperiencePlaces';
import VideoModelAR from './VideoModelAR';
import FeaturedProducts from './FeaturedProducts';
import ProductByTabs from './ProductByTabs';

type Props = {
  data: any;
};

const Market = (props: Props) => {
  const { data } = props;

  return (
    <Wrapper>
      <Banner {...getNewObjByFields(data, ['title', 'caption'])} />
      <Category />
      <ExperiencePlaces />
      <VideoModelAR video={data.arvr_video} />
      <FeaturedProducts />
      <ProductByTabs />
    </Wrapper>
  );
};
export default Market;

const Wrapper = styled.main`
  margin-top: -60px;
`;
