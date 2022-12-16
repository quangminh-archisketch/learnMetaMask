import styled from 'styled-components';

type Props = {
  fixed?: boolean;
  blur?: boolean;
};

const LoadingPage = (props: Props) => {
  const { fixed = true, blur = false } = props;

  return (
    <LoadingPage__Wrapper fixed={fixed} blur={blur}>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoadingPage__Wrapper>
  );
};

export default LoadingPage;

const LoadingPage__Wrapper = styled.div<{ fixed: boolean; blur: boolean }>`
  ${(props) => {
    if (props.fixed)
      return `position: fixed;
              top: 0;
              left: 0;
              z-index: 9999999;`;
    else return `max-height: 300px;`;
  }}

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  background-color: ${(props) =>
    props.blur ? 'rgba(var(--color-white-rgb), 80%)' : 'var(--color-gray-1)'};
  backdrop-filter: ${(props) => (props.blur ? 'blur(4px)' : 'unset')};

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--color-primary-700);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;
