import styled from 'styled-components';

export const Withdraw_wrapper = styled.main`
  min-height: 100vh;
  padding: 35px 0;

  background-image: url('/static/images/checkout/background-top.png'),
    url('/static/images/checkout/background-bottom.png');
  background-repeat: no-repeat;
  background-position: top left, bottom right;
  background-size: 26.613vw auto, 28.82vw auto;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;

    .ant-input {
      height: 40px;
      margin-top: 8px;
    }

    .ant-input-number-input {
      height: 40px;
      padding-right: 90px;
    }

    label {
      font-size: 14px;
      color: var(--text-title);
      font-weight: 500;
    }
  }

  .note {
    padding: 0 5px;
    font-size: 14px;
    color: #cf293f;
  }

  .btn__submit,
  .btn__cancel {
    height: 41px;
    margin-top: 32px;
    min-width: 147px;
    border-radius: 4px;
    font-weight: 500;
  }

  .btn__cancel {
    background: var(--color-gray-7);
    color: #fff;
  }

  .btn__withdraw--group {
    display: flex;
    justify-content: center;
    gap: 20px;

    .ant-input-number-group-wrapper {
      position: relative;
    }

    .ant-input-number-group-addon {
      background: transparent;

      &:first-child {
        padding: 0 15px;
      }

      &:last-child {
        padding: 0;
        border: none;

        .btn__draw {
          box-shadow: none;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
          height: 40px;
          position: absolute;
          right: 0px;
          top: 0px;
          z-index: 1;
          background: transparent;
          color: var(--color-primary-700);
          border: 0;
          font-weight: 500;

          &.disable {
            cursor: initial;
          }
        }
      }
    }
  }
`;
