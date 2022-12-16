import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

const CartSuggest_Wrapper = styled.div`
  .cartSuggest_title {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.1px;
    color: var(--text-title);
    text-align: center;
  }

  .cartSuggest_productList {
    margin-top: 4rem;

    ${maxMedia.small} {
      margin: 30px -20px 0;
      padding: 0 20px;
      display: flex;
      overflow-y: auto;

      & > div {
        min-width: 300px;
        aspect-ratio: 354 / 310;
      }
    }
  }

  .cartSuggest_btnLoad {
    margin-top: 4rem;

    height: 4.2rem;

    ${maxMedia.medium} {
      display: none;
    }
  }
`;
export default CartSuggest_Wrapper;
