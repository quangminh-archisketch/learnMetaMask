import styled from 'styled-components';

export const Container = styled.div``;
export const PageContent = styled.div<{ noCustom?: boolean }>`
  margin: 20px auto;
  padding: ${(props) => (!props.noCustom ? '15px 20px' : '')};
  width: calc(100% - 40px);
  position: relative;

  border-radius: 4px;

  background-color: ${(props) => (!props.noCustom ? '#ffffff' : '')};
`;
