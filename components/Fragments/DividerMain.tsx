import styled from 'styled-components';

const DividerMain = () => {
  return (
    <Wrapper className='d-flex align-items-center justify-content-center'>
      <img src='/static/images/product/sketch.webp' alt='' />
    </Wrapper>
  );
};

export default DividerMain;

const Wrapper = styled.div`
  height: 148px;
  position: relative;
  z-index: 1;

  &:after {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: -1;
    content: '';
    width: 100%;
    height: 1px;
    background-color: var(--color-gray-5);
  }

  img {
    padding: 0 30px;
    height: 50px;
    width: auto;
    max-width: 100%;
    object-fit: cover;
    object-position: center;
    background-color: #ffffff;
  }
`;
