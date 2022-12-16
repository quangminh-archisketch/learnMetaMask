import styled from 'styled-components';

export const ReviewComponent_wrapper = styled.div`
  .buyer__column {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    line-height: 20px;

    .ant-avatar {
      background-color: #ffd8bf;
      color: var(--color-gray-9);

      span {
        font-size: 14px;
      }
    }
  }

  .rate__column {
    .ant-rate {
      gap: 5px;
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
