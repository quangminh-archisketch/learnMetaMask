import { useRouter } from 'next/router';

import Icon from 'components/Fragments/Icons';

import styled from 'styled-components';
import { Container } from 'styles/__styles';
import { CSSProperties, ReactNode } from 'react';

type Props = {
  style?: CSSProperties;
  button?: ReactNode;
};

const HeaderSample = (props: Props) => {
  const router = useRouter();

  return (
    <Wrapper style={props.style}>
      <Container className='d-flex align-items-center justify-content-between'>
        <Icon iconName='logo-main' onClick={() => router.push('/')} />

        {props.button}
      </Container>
    </Wrapper>
  );
};
export default HeaderSample;

const Wrapper = styled.header`
  padding: 11px 0;
  background-color: #fefefe;
  border-bottom: var(--border-1px);

  .my-icon.logo-main {
    cursor: pointer;
    svg {
      width: auto;
      height: 24px;
    }
  }

  .ant-btn {
    height: 37px;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-gray-7);
  }
`;
