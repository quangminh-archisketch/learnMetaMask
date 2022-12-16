import styled from 'styled-components';

export const CartProduct_Wrapper = styled.div`
  flex: auto;
  border: var(--border-1px);
`;
export const CartProduct_Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px;

  &:not(:last-child) {
    border-bottom: var(--border-1px);
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 2rem;

    &:last-child {
      gap: 20px;
    }
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    object-fit: cover;
  }
  h5 a {
    font-size: 15px;
    font-weight: 500;
    color: var(--text-caption);

    &:hover {
      color: var(--color-primary-700);
    }
  }
  p {
    margin-top: 1px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1;
    color: var(--color-gray-8);
  }
  .my-icon {
    width: 20px;
    cursor: pointer;

    &:hover {
      color: var(--color-red-6);
    }
  }
`;
