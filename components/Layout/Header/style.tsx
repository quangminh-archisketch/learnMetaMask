import styled from 'styled-components';
import { maxMedia, minMedia } from 'styles/__media';

export const Wrapper = styled.header<{ position: 'sticky' | 'fixed'; top: number }>`
  width: 100%;

  position: ${(props) => props.position};
  top: ${(props) => (typeof props.top === 'number' ? props.top : 0)}px;
  left: 0;
  z-index: 100;

  .header_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50px;

    height: 100%;
  }
`;

export const Header__Nav = styled.nav<{ isHome?: boolean }>`
  height: 60px;
  border-bottom: 0.5px solid
    ${(props) => (props.isHome ? 'var(--color-primary-700)' : 'var(--color-gray-4)')};
  background-color: ${(props) =>
    props.isHome ? 'var(--color-primary-700)' : 'var(--color-gray-1)'};
`;

export const Logo = styled.div<{ isHome?: boolean }>`
  line-height: 1;

  .my-icon svg {
    height: 24px;
    width: auto;
    color: ${(props) => (props.isHome ? '#ffffff' : 'var(--color-gray-13)')};
  }
  a {
    display: inline-block;
    line-height: 1;
  }
`;

export const Menu = styled.nav`
  display: flex;
  align-items: center;

  height: 100%;

  & > ul {
    display: flex;
    align-items: center;
    gap: 4.5rem;

    margin-bottom: 0;

    list-style: none;
  }
`;

export const MenuItem = styled.li<{ isHome?: boolean; active?: boolean }>`
  a,
  span {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    width: max-content;
    font-size: 1.4rem;
    line-height: 1.57;
    color: ${(props) =>
      props.isHome ? '#ffffff' : props.active ? 'var(--color-primary-700)' : 'var(--text-title)'};
    transition: color 0.2s linear;

    cursor: pointer;
  }

  &:hover {
    a,
    span {
      color: ${(props) => (props.isHome ? 'var(--color-primary-100)' : 'var(--color-primary-700)')};
    }

    .anticon {
      color: ${(props) => (props.isHome ? 'var(--color-primary-100)' : 'var(--color-primary-700)')};
    }
  }

  .anticon {
    color: ${(props) =>
      props.isHome ? '#ffffff' : props.active ? 'var(--color-primary-700)' : 'var(--text-title)'};
  }
`;

export const MenuDropdown = styled.div`
  width: 600px;
  max-width: 800px;
  margin-top: 1.6rem;

  background-color: var(--color-white);
  border-radius: 1rem;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  overflow: hidden;

  ul {
    height: 100%;
    list-style: none;
  }
  .menu_dropdown__other {
    padding: 3.6rem 1.6rem;
    background-color: var(--color-main-6);

    li + li {
      margin-top: 1.3rem;
    }

    a {
      font-size: 1.4rem;
      line-height: 1.57;
      color: var(--color-main-2);
      transition: color 0.2s linear;

      &:hover {
        color: var(--color-gray-1);
      }
    }
  }
  .menu_dropdown__main {
    padding: 20px;
    border-left: var(--border-1px);

    li {
      display: flex;

      & + li {
        margin-top: 15px;
      }
      a {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--secondary);

        &:hover span {
          color: var(--color-primary-700);
        }

        img {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }
        span {
          font-size: 1.4rem;
          line-height: 1;
          color: var(--gray-2);
          transition: color 0.2s linear;
        }
      }
    }
  }
`;

export const SearchBox = styled.div<{ isHome?: boolean }>`
  width: 100%;
  max-width: 320px;
  .ant-input-affix-wrapper {
    width: 100%;
    padding: 6px 10px;
    border-radius: 4px;
    border-color: var(--color-primary-${(props) => (props.isHome ? '25' : '700')});
    background-color: var(--color-primary-25);

    .ant-input {
      background-color: var(--color-primary-25);
    }
    .ant-input-suffix {
      .my-icon {
        font-size: 18px;
        color: var(--color-primary-700);
      }
    }
  }
`;

export const IconActionGroup = styled.div<{ isHome?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${maxMedia.medium} {
    gap: 20px;
  }

  ${(props) => (props.isHome ? 'span.my-icon, span.anticon { color:#ffffff; }' : '')}
`;

export const IconAction = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${minMedia.medium} {
    padding: 1rem;
    border-radius: 50%;
    transition: background-color 0.16s ease 0s;
    cursor: pointer;

    &:hover {
      background-color: rgba(var(--color-gray-rgb-13), 5%);
    }
  }

  .my-icon {
    font-size: 20px;
    color: var(--color-gray-6);
  }

  &.cart,
  &.noti {
    .ant-badge-count {
      top: -0.2rem;
      right: -0.3rem;
    }
  }

  &.btn-open-menu {
    ${minMedia.medium} {
      display: none;
    }
  }
`;

export const Left = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  gap: 5.6rem;
`;

export const Right = styled.div<{ isHome?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  flex: auto;

  .ant-btn:not(.ant-btn-link) {
    height: 36px;
    padding: 0 20px;

    font-weight: 500;
    color: ${(props) => (props.isHome ? 'var(--color-primary-700)' : '#ffffff')};
    border: 1px solid var(--color-primary-700);
    background-color: ${(props) => (props.isHome ? '#fefefe' : 'var(--color-primary-700)')};

    transition: all 50ms ease-in-out;
  }

  .btn_login {
    padding: 0;
    height: 36px;
    color: ${(props) => (props.isHome ? '#ffffff' : 'var(--color-primary-700)')};
    transition: all 50ms ease-in-out;
  }

  .ant-btn.btn_seller {
    border: none;
    color: #fff;
    background-color: #ffa351;
  }
`;

export const NotificationWrapper = styled.div`
  width: 400px;
  background-color: #fff;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08),
    0px 9px 28px 8px rgba(0, 0, 0, 0.05);

  main {
    padding: 0;
    & > div {
      padding: 0;
    }
  }

  .Notification_Page .Notification__Info {
    padding: 10px;
  }
  .ant-tabs {
    .ant-tabs-nav {
      padding: 0 10px;
    }
    .ant-tabs-tab {
      padding: 10px 0;
    }
    .ant-tabs-ink-bar {
      display: none;
    }
  }
  .btn-see-more {
    width: 100%;
    height: 40px;
    color: var(--color-gray-7);
  }
  .ant-spin {
    height: 307px;
  }
`;
