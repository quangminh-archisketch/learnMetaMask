import styled from 'styled-components';

export const Header_Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;

  height: 50px;
  padding: 0 20px;

  background-color: #ffffff;
  border-bottom: 2px solid #f0f2f5;

  .notification {
    .anticon {
      font-size: 22px;
    }
  }
  .user-dropdown {
    display: flex;
    align-items: center;
    gap: 5px;

    cursor: pointer;
  }
  .ant-dropdown-arrow {
    top: -1px;
  }
`;
