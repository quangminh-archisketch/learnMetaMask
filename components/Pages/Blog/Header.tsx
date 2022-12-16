import styled from 'styled-components';
import { Input } from 'antd';

import Icon from 'components/Fragments/Icons';

import { maxMedia } from 'styles/__media';

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSearch: (value: string) => void;
};
const HelpCenterHeader = (props: Props) => {
  return (
    <Wrapper>
      <div className='blog__text'>
        <p>THINGS TO READ</p>
        <h1>We wrote you a worthy blogs</h1>
      </div>
      <Input
        placeholder='Search blog...'
        prefix={<Icon iconName='search' style={{ width: 20 }} />}
        onChange={(e) => props.onSearch(e.target.value)}
      />
    </Wrapper>
  );
};
export default HelpCenterHeader;

const Wrapper = styled.section`
  text-align: center;
  .blog__text {
    position: relative;
    margin-top: 50px;
    background-image: url('/static/images/blog/background-top.png');
    width: 100%;
    height: 241px;
    border-radius: 16px;
    background-size: cover;
    background-repeat: no-repeat;
    ${maxMedia.medium} {
      margin-top: 20px;
      padding-top: 47px 0;
      background-image: url('/static/images/blog/background-top-mobile.png');
      width: 100%;
      height: 161px;
      flex-grow: 0;
    }
    ${maxMedia.small} {
      margin-top: 20px;
      padding-top: 47px 0;
      background-image: url('/static/images/blog/background-top-mobile.png');
      width: 100%;
      height: 161px;
      flex-grow: 0;
    }
    ${maxMedia.xsmall} {
      width: 100%;
      height: 161px;
      flex-grow: 0;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 14px;
      font-weight: 400;
      color: var(--color-gray-1);
      line-height: normal;
      ${maxMedia.medium} {
        font-size: 14px;
        font-weight: 400px;
        letter-spacing: 1.21px;
      }
      ${maxMedia.small} {
        font-size: 11px;
        font-weight: 300px;
        letter-spacing: 1.21px;
      }
      ${maxMedia.xsmall} {
        font-size: 11px;
        font-weight: 300px;
        letter-spacing: 1.21px;
      }
    }
    h1 {
      font-size: 48px;
      font-weight: 400;
      color: var(--color-gray-1);
      line-height: normal;
      ${maxMedia.medium} {
        font-size: 32px;
        font-weight: 400;
      }
      ${maxMedia.small} {
        font-size: 16px;
        font-weight: 400;
      }
      ${maxMedia.small} {
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
  .ant-input-affix-wrapper {
    width: 610px;
    height: 51px;
    padding: 4px 15px;
    margin-top: 50px;
    border-radius: 6px;
    border: none;
    box-shadow: 0 4px 30px 0 rgba(0, 0, 0, 0.1);
    font-size: 14px !important;
    position: absolute;
    top: 270px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    ${maxMedia.medium} {
      min-width: 300px;
      max-width: 60%;
      height: 51px;
      top: 165px;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
    ${maxMedia.small} {
      min-width: 300px;
      max-width: 60%;
      height: 51px;
      top: 213px;
      left: 0;
      right: 0;
      margin-top: -10px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
    ${maxMedia.xsmall} {
      min-width: 300px;
      max-width: 60%;
      height: 51px;
      top: 213px;
      left: 0;
      right: 0;
      margin-top: -10px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
    .ant-input-prefix {
      margin-right: 8px;
    }
    .ant-input {
      font-size: 18px;
      color: var(--color-gray-7);
    }
  }
`;
