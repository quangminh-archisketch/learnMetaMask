import Icon from 'components/Fragments/Icons';
import Link from 'next/link';
import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

const Header = () => {
  return (
    <Header_wrapper>
      <Box_wrapper>
        <Logo_wrapper>
          <Link href={'/'}>
            <a>
              <Icon iconName='logo-white' />
            </a>
          </Link>
        </Logo_wrapper>

        <Title_wrapper>License Certificate</Title_wrapper>
      </Box_wrapper>
    </Header_wrapper>
  );
};

const Header_wrapper = styled.div`
  padding: 32px 50px 124px 50px;
  padding-top: 32px;
  padding-bottom: 124px;
  background-color: var(--color-main-6);
  background-image: url('/static/images/license/header.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom;

  ${maxMedia.medium} {
    padding-top: 16px;
    padding-bottom: 62px;
  }
`;

const Logo_wrapper = styled.div`
  .my-icon svg {
    width: auto;
    height: 40px;
    color: var(--color-gray-1);
  }

  ${maxMedia.medium} {
    margin-bottom: 10px;
  }
`;

const Title_wrapper = styled.h1`
  font-size: 30px;
  color: #fff;
  font-weight: 600;
`;

const Box_wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${maxMedia.medium} {
    flex-direction: column;
    text-align: center;
  }
`;

export default Header;
