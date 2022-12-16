import Link from 'next/link';

import { Button } from 'antd';

import styled from 'styled-components';
import { Container } from 'styles/__styles';
import { maxMedia } from 'styles/__media';

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  background-image: url('/static/images/404.svg');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: left bottom;

  ${maxMedia.small} {
    background-image: url('/static/images/404--mobile.svg');
    background-position: left top 81px;
  }

  .page-404-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${maxMedia.small} {
      padding-bottom: 114px;
      align-items: center;
      justify-content: flex-end;
    }
  }

  h2 {
    font-size: 56px;
    font-weight: 400;
    color: var(--text-title);

    ${maxMedia.small} {
      font-size: 40px;
    }
  }
  p {
    margin-top: 4px;
    font-size: 24px;
    color: var(--text-caption);

    ${maxMedia.small} {
      font-size: 16px;
    }
  }
  .ant-btn {
    margin-top: 48px;
    width: 194px;
    height: 41px;
    color: #ffffff;
    background-color: var(--text-title);
    border-color: var(--text-title);

    ${maxMedia.small} {
      margin-top: 24px;
      width: 100%;
    }
  }
`;

const Page404 = () => {
  return (
    <Wrapper>
      <Container className='page-404-content'>
        <h2>Page Not Found</h2>
        <p>Sorry we couldn’t find your page</p>
        <Button>
          <Link href='/'>Back to home</Link>
        </Button>
      </Container>
    </Wrapper>
  );
};

export default Page404;
