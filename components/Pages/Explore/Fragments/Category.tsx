import { CategoryModel } from 'models/category.models';

import styled from 'styled-components';
import { ContainerFreeSize } from 'styles/__styles';

const Wrapper = styled.section`
  padding: 40px 0;
  .explore-category-title {
    font-size: 24px;
    font-weight: 300;
    color: var(--text-title);
  }
  .explore-category-description {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    color: var(--text-title);
  }
`;

const CategoryExplore = ({ category }: { category?: CategoryModel }) => {
  return (
    <Wrapper id='explore-category-banner'>
      <ContainerFreeSize>
        <h1 className='explore-category-title'>{category?.title || 'Professional 3D Model'}</h1>
        <div
          className='explore-category-description'
          dangerouslySetInnerHTML={{
            __html:
              category?.description ||
              'Professional 3D models ready to be used for VFX, game development, VR/AR, architecture, animation, and much more. File formats include FBX, OBJ, MAX, C4D, BLEND and GLTF. 3D Preview & model inspector available for all 3D models.',
          }}
        />
      </ContainerFreeSize>
    </Wrapper>
  );
};
export default CategoryExplore;
