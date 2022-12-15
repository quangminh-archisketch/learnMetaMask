import { Row } from 'antd';
import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

export const Table_Wrapper = styled.div`
  .tag__permis {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    max-width: 220px;
    span {
      display: inline-block;
      min-width: 62.5px;
      margin-right: 0;
      text-align: center;
    }
  }
`;
export const Search = styled(Row)`
  margin: 0 -30px;
  margin-bottom: 20px;

  .gutter-row {
    padding: 0 30px;
    margin-bottom: 20px;
  }

  ${maxMedia.medium} {
    margin: 0 -10px;

    .gutter-row {
      padding: 0 10px;
    }
  }
`;
export const SearchItem = styled.div`
  .title {
    display: block;
    margin-bottom: 5px;

    font-size: 14px;
  }
  & > .ant-input-group {
    display: flex;
  }
  .ant-input-group-addon {
    min-width: 50px;
  }
  .ant-checkbox-group {
    min-height: 32px;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
`;
