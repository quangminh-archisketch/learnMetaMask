import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

export const Wrapper = styled.section`
  padding: 15rem 0;

  .ant-row {
    align-content: stretch;
  }

  ${maxMedia.xsmall} {
    padding: 5rem 0;
  }
`;
export const IntroItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100%;

  img {
    width: 100%;
    height: auto;
    max-width: 22.8rem;
  }
  h3 {
    flex: auto 0;
    padding: 1.6rem 0;

    text-align: center;

    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.5;
    color: var(--color-main-8);
  }
  .ant-btn {
    height: 4.2rem;
    padding: 0 2rem;

    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.57;
    color: var(--color-main-1);
  }

  ${maxMedia.xsmall} {
    h3 {
      padding: 0;
      margin: 1.5rem 0;
      font-size: 2rem;
      line-height: normal;
    }

    img {
      max-width: 20rem;
      max-height: 20rem;
    }
  }
`;
