import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

export const Checkout_Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .checkout-title-page {
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 500;
    color: var(--text-title);

    ${maxMedia.small} {
      margin-bottom: 24px;
      font-size: 20px;
    }
  }
`;
export const Checkout_Content = styled.div`
  flex: auto;

  padding: 80px 0 30px;
  background: linear-gradient(90deg, #fff 50%, var(--color-gray-2) 50%);

  & > div {
    max-width: 1200px;
    margin: 0 auto;
  }

  ${maxMedia.medium} {
    padding: 20px 0 170px;
    background: unset;
  }

  .checkout-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;

    ${maxMedia.small} {
      padding: 4px 0;
    }

    h4 {
      font-size: 18px;
      font-weight: 500;
      color: var(--text-title);

      ${maxMedia.small} {
        font-size: 16px;
      }
    }
    .checkout-method-commit {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      line-height: 1;
      color: var(--text-caption);
      .my-icon {
        font-size: 20px;
      }

      ${maxMedia.small} {
        font-size: 12px;
        .my-icon {
          width: 16px;
        }
      }
    }
  }
  .checkbox-privacy-terms-policy {
    margin-top: 15px;
    font-size: 14px;
    color: var(--color-icon);
    a,
    a:hover {
      color: #1890ff;
    }
    a:hover {
      text-decoration: underline;
    }
  }
  .btn-pay {
    width: 100%;
    height: 41px;
  }
`;
export const Checkout_Action = styled.div`
  max-width: 420px;

  ${maxMedia.medium} {
    max-width: unset;
  }

  .checkout-action-total {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 10px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-title);
    border-bottom: var(--border-1px);
    span:last-child {
      color: var(--color-red-6);
    }
  }
  .checkbox-privacy-terms-policy {
    margin: 10px 0;
  }
  ${maxMedia.medium} {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 20px 20px;
    background-color: #fff;
    box-shadow: 0 -2px 16px 0 rgba(0, 0, 0, 0.1);
  }
`;
