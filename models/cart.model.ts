import { ProductModel } from './product.model';

export type ProductCartPreviewProps = {
  data: ProductModel;
  onRemove?: () => void;
};
