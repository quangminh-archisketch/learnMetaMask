import Link from 'next/link';

import { Breadcrumb } from 'antd';

import { changeToSlug } from 'common/functions';

import ProductDetailTitle from './Fragments/Title';
import ProductDetailInspect from './Fragments/Inspect';
import ProductDetailContent from './Fragments/Content';
import ProductDetailHeader from './Fragments/Header';
import ProductViewer from './Viewer';
import ReviewComment from './ReviewComment';
import Suggested from './Suggested';
// import Collection from './Collection';

import { ProductModel } from 'models/product.model';
import { CategoryModel } from 'models/category.models';

import { ContainerLarge } from 'styles/__styles';
import * as L from './style';

const ProductDetail = ({ data }: { data: ProductModel }) => {
  const isFree = data.price === 0 && data.status === 1;
  const isPreview = data.status === 5;
  const categoryOne: CategoryModel | undefined = data.market_item_categories?.length
    ? data.market_item_categories[0].market_category
    : undefined;

  return (
    <L.ProductDetail_wrapper>
      <ContainerLarge>
        <Breadcrumb className='my-breadcrumb' separator='>'>
          <Breadcrumb.Item>
            <Link href={`/${isFree ? 'free-models' : 'explore'}/all`}>Explore</Link>
          </Breadcrumb.Item>
          {categoryOne && (
            <Breadcrumb.Item>
              <Link
                href={`/${isFree ? 'free-models' : 'explore'}/${changeToSlug(categoryOne.title)}--${
                  categoryOne.id
                }`}>
                {categoryOne.title}
              </Link>
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item>{data.title}</Breadcrumb.Item>
        </Breadcrumb>

        <L.Grid_wrapper>
          <ProductViewer data={data} />
          <ProductDetailHeader data={data} isFree={isFree} />
          <ProductDetailTitle data={data} isPreview={isPreview} />
          <ProductDetailContent data={data} isPreview={isPreview} />
          <ProductDetailInspect data={data} />
        </L.Grid_wrapper>

        {data.status === 1 && (
          <ReviewComment
            averageReview={data.avgReview}
            totalReview={data.totalReview}
            totalComment={data.totalComment}
            productId={data.id}
          />
        )}

        {/* Tạm ẩn */}
        {/* <Collection /> */}

        {data.status === 1 && categoryOne && (
          <Suggested
            productId={data.id}
            categories_id={data.market_item_categories?.map((i) => i.market_category.id) || []}
            categoryName={categoryOne?.title}
          />
        )}
      </ContainerLarge>
    </L.ProductDetail_wrapper>
  );
};

export default ProductDetail;
