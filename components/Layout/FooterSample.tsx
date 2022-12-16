import Link from 'next/link';

import urlPage from 'constants/url.constant';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';
import { Container } from 'styles/__styles';

const Wrapper = styled.footer`
  padding: 28px 0;
  background-color: #fefefe;
  border-top: var(--border-1px);

  .footer-sample-content {
    font-size: 16px;
    color: var(--color-gray-8);

    ul {
      display: flex;
      align-items: center;
      justify-content: center;

      ${maxMedia.small} {
        flex-direction: column;
      }

      a {
        color: var(--color-gray-8);
      }

      li:not(:first-child) {
        margin-left: 26px;
        padding-left: 27px;
        position: relative;

        &:before {
          position: absolute;
          left: 0;
          content: '|';
        }

        ${maxMedia.small} {
          padding-left: 0;
          margin-left: 0;
          margin-top: 16px;
          &::before {
            display: none;
          }
        }
      }
    }
  }
`;

const FooterSample = () => {
  return (
    <Wrapper>
      <Container>
        <div className='footer-sample-content'>
          <ul>
            <li>© 2022 VRStyler</li>
            <li>
              <Link href={urlPage.blog}>Blog</Link>
            </li>
            <li>
              <Link href={urlPage.contactUs}>Contact Us</Link>
            </li>
          </ul>
        </div>
      </Container>
    </Wrapper>
  );
};
export default FooterSample;
