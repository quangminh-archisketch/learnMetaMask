import styled from 'styled-components';
import { maxMedia, minMedia } from 'styles/__media';

export const Models_wrapper = styled.div`
  .status {
    margin: 0;
    min-width: 65px;
    border-radius: var(--border-radius-base);
    font-size: 12px;
    padding: 2px 10px;
    border: 0;
    text-align: center;

    &-1 {
      background-color: var(--color-gray-7);
      color: var(--color-gray-1);
    }

    &-2 {
      background-color: var(--color-primary-700);
      color: #fefefe;
    }

    &-3 {
      background-color: #ff4d4f;
      color: #fff;
    }
  }

  .information {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    .anticon {
      position: relative;
      top: -1px;
    }
  }

  .sold__column {
    white-space: nowrap;
  }

  .my-icon {
    path,
    g {
      fill: transparent;
    }
  }
`;

export const Header_wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 40px;

  .header__title {
    font-size: 24px;
    color: var(--color-gray-11);

    span {
      color: var(--color-primary-700);
      font-weight: 600;
    }
  }

  .header__box--btn {
    display: flex;
    gap: 20px;

    button {
      border-radius: 4px;
      height: 37px;
      font-size: 14px;
      font-weight: 500;
    }
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: -20px;
    bottom: -20px;
    width: calc(100% + 40px);
    border-radius: 20px;
    border-bottom: 1px solid var(--color-gray-4);
  }

  ${maxMedia.medium} {
    margin-right: 20px;
  }

  ${maxMedia.small} {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const Reaction_wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .item {
    cursor: pointer;
  }

  .my-icon svg {
    color: transparent;
    width: auto;
    height: 20px;
  }
`;

export const MenuAction_wrapper = styled.div`
  display: flex;
  gap: 28px;
  margin: 0 auto;
  width: fit-content;

  .anticon {
    padding: 5px;
    color: var(--color-gray-7);

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .icon {
    background-color: transparent;
    transition: 0.3s;
    cursor: pointer;
    border-radius: 0;

    ${minMedia.medium} {
      &--dropdown:hover,
      &--dropdown:focus,
      &--dropdown:has(.ant-dropdown:not(.ant-dropdown-hidden)) {
        background-color: var(--color-gray-6);
        color: var(--color-gray-1);
        border-radius: 5px;
      }
    }
  }
`;
