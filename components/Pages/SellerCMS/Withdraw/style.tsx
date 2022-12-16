import styled from 'styled-components';

export const WithdrawMoney = styled.div`
  .status {
    padding: 5px 8px;
    font-size: 14px;

    &-2 {
      color: #f5222d;
      border-color: #ffa39e;
    }

    &-3 {
      color: #fa8c16;
      border-color: #ffd591;
    }
  }

  .action-column {
    .my-icon svg {
      width: 20px;
      height: 21px;
      color: transparent;
      cursor: pointer;

      path:last-child {
        stroke: var(--color-gray-7);
      }
    }
  }
`;
