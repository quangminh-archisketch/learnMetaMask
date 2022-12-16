import ProductCard from 'components/Fragments/ProductCard';

import { ProductModel } from 'models/product.model';

import * as SC from './style';

type Props = {
  isReverse?: boolean;
  isLoading?: boolean;
  products?: ProductModel[];
};

const ExploreResult = (props: Props) => {
  return (
    <SC.Wrapper className='ProductList__Grid'>
      {props.products?.map((product, index) => {
        return (
          <ProductCard
            className={props.isLoading ? 'skeleton-animation-1' : ''}
            key={index}
            data={product}
            // isBig={width > 991 && index === 12}
          />
        );
      })}
    </SC.Wrapper>
  );
};

export default ExploreResult;
