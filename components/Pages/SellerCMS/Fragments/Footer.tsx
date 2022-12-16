import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

const FooterFragments = () => {
  return (
    <FooterFragments_wrapper>
      <div>
        <a href='/help-center' target='_blank'>
          Help Center
        </a>
      </div>
      <div className='line' />
      <div>
        <a href='#' target='_blank'>
          Terms of Service
        </a>
      </div>
      <div className='line' />
      <div>
        <a href='#' target='_blank'>
          Privacy Policy
        </a>
      </div>
    </FooterFragments_wrapper>
  );
};

const FooterFragments_wrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 28px 0;
  border-top: 1px solid var(--color-gray-5);
  background-color: #fefefe;
  text-align: center;

  a {
    display: inline-block;
    font-size: 16px;
    color: var(--color-gray-8);
    margin: 0 15px;
  }

  .line {
    width: 1.5px;
    margin: 5px 0;
    background-color: var(--color-gray-8);
  }

  ${maxMedia.small} {
    position: initial;
    padding: 35px 0;
    a {
      font-size: 14px;
    }
  }
`;

export default FooterFragments;
