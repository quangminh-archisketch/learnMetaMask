import styled from 'styled-components';

export const Sales_wrapper = styled.div`
  .ant-table-thead {
    .ant-table-cell {
      color: var(--color-gray-11);
      font-size: 14px;
    }
  }

  .ant-table-tbody {
    .status {
      font-size: 12px;
      color: #fefefe;
      padding: 4px 10px;
      border-radius: 4px;
      border: 0;

      &-1 {
        background: var(--color-primary-800);
      }
      &-2 {
        background: var(--color-gray-8);
      }
      &-3 {
        background: var(--color-primary-500);
      }
    }
  }
`;
