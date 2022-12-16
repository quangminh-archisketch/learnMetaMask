import styled from 'styled-components';
import { ChangeRemMobileToPC } from 'styles/__media';

export const MenuMobile_Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
`;
export const MenuMobile_Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 60px;
  padding: 0 20px;
  border-bottom: var(--border-1px);

  .my-icon {
    font-size: 20px;
    &.logo-main svg {
      height: 24px;
      width: auto;
      color: var(--color-gray-13);
    }
  }
`;
export const MenuMobile_Content = styled.div`
  padding: 0 20px 4rem;
  .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    font-size: ${ChangeRemMobileToPC('medium', 1.6)};
    right: 0;
  }
  .ant-collapse-content-box {
    ul {
      list-style: none;

      li {
        color: var(--color-gray-8);
        &.active {
          color: var(--color-primary-700);
        }
        & + li {
          margin-top: 2rem;
        }
        a,
        span {
          font-size: ${ChangeRemMobileToPC('medium', 1.6)};
          font-weight: 500;
          color: inherit;
          opacity: 0.9;
          cursor: pointer;
        }
      }
    }
  }
`;

export const UserCollapse = styled.div`
  border-bottom: var(--border-1px);

  .ant-collapse {
    border: 0;
    background-color: var(--color-gray-1);
    .ant-collapse-item {
      border: 0;
    }
    .ant-collapse-header {
      padding: 2rem 0;

      .ant-collapse-header-text {
        display: inline-flex;
      }
      .user-avatar {
        display: inline-flex;
        align-items: center;
        gap: 1rem;

        .ant-avatar {
          width: 6rem;
          height: 6rem;
        }
        h4 {
          font-size: ${ChangeRemMobileToPC('medium', 2)};
          font-weight: 600;
          letter-spacing: 1.1px;
          color: var(--color-gray-9);
        }
      }
    }
    .ant-collapse-content {
      border-color: var(--color-line);
    }
  }
`;

export const MenuBtnAction = styled.div`
  padding: 2rem 0;
  border-bottom: var(--border-1px);
  text-align: center;

  .ant-btn {
    width: 100%;
    height: ${ChangeRemMobileToPC('medium', 4.8)};

    font-size: ${ChangeRemMobileToPC('medium', 1.6)};
    font-weight: 600;
  }
`;

export const MenuList = styled.nav`
  .ant-collapse {
    border: 0;
    background-color: var(--color-gray-1);

    .ant-collapse-item {
      border-bottom: var(--border-1px);
      .ant-collapse-header {
        padding: 2rem 0;

        .ant-collapse-header-text {
          a,
          span {
            font-size: ${ChangeRemMobileToPC('medium', 1.6)};
            font-weight: 500;
            line-height: 1.5;
            color: var(--color-gray-12);
          }
        }
      }
      .ant-collapse-content {
        border-top: 0;

        &-box {
          padding-top: 0;
        }
      }
    }
  }
  .collapse-item-no-content .ant-collapse-content .ant-collapse-content-box {
    padding: 0;
  }
  .collapse-item-no-content.active .ant-collapse-header .ant-collapse-header-text a {
    color: var(--color-primary-700);
  }
`;

export const SocialList = styled.ul`
  margin-top: 4rem;
  text-align: center;

  .banner_social {
    position: unset;
    transform: unset;
    display: inline-flex;
    gap: 20px;

    &::before,
    &:after {
      display: none;
    }
  }

  li + li {
    margin-top: 0;
  }

  li {
    height: 32px;
    width: 32px;
    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      width: inherit;

      border-radius: 50%;
      background-color: var(--color-gray-4);

      .my-icon,
      .anticon {
        height: 1.9rem;
        width: auto;
      }
    }
  }
`;
