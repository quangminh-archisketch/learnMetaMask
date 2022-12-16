import styled from 'styled-components';
import { maxMedia } from './__media';

export const Container = styled.div`
  max-width: 1340px;
  padding: 0 50px;
  margin: 0 auto;

  ${maxMedia.medium} {
    padding: 0 20px;
  }
`;
export const ContainerLarge = styled.div`
  max-width: 2100px;
  padding: 0 50px;
  margin: 0 auto;

  ${maxMedia.medium} {
    padding: 0 20px;
  }
`;
export const ContainerFreeSize = styled.div`
  padding: 0 50px;

  ${maxMedia.medium} {
    padding: 0 20px;
  }
`;

export const PageContent = styled.div<{ noCustom?: boolean }>``;
