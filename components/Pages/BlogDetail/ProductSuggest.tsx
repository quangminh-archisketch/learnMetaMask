import { useRef } from 'react';

import styled from 'styled-components';
import { Button, Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';

import useWindowSize from 'hooks/useWindowSize';

import Icon from 'components/Fragments/Icons';
import ProductCard from 'components/Fragments/ProductCard';

import { BlogProductAttach } from 'models/blog.models';

import { maxMedia } from 'styles/__media';

const BlogDetailProductSuggest = ({ products }: { products: BlogProductAttach[] }) => {
  const refCarousel = useRef<CarouselRef>(null);
  const [screenW] = useWindowSize();

  const carouselProps = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    swipeToSlide: true,
  };

  const ProductList = () => {
    return products.map((item) => {
      return (
        <ProductCard
          key={item.id}
          data={item}
          link_product={item.link}
          className='BlogDetail__ProductItem'
        />
      );
    });
  };

  return (
    <Wrapper>
      <h3>Suggested 3D Models</h3>

      <Carousel__Wrapper className='hide-scrollbar'>
        {screenW > 640 ? (
          <Carousel ref={refCarousel} {...carouselProps}>
            {ProductList()}
          </Carousel>
        ) : (
          ProductList()
        )}
      </Carousel__Wrapper>

      {products.length > 4 && screenW > 640 && (
        <div className='BlogDetail__BtnCarousel'>
          <Button shape='round' onClick={() => refCarousel.current?.prev()}>
            <Icon iconName='arrow-left-line-2' />
          </Button>
          <Button shape='round' onClick={() => refCarousel.current?.next()}>
            <Icon iconName='arrow-left-line-2' />
          </Button>
        </div>
      )}
    </Wrapper>
  );
};
export default BlogDetailProductSuggest;

const Wrapper = styled.section`
  margin-top: 60px;

  h3 {
    margin-bottom: 40px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.1px;
    color: #0a0a0a;
    text-align: center;
  }

  .BlogDetail__BtnCarousel {
    margin-top: 20px;
    text-align: right;

    .ant-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      width: 40px;
      height: 40px;
      padding: 0;

      border-color: var(--color-primary-700);

      &:last-child {
        margin-left: 15px;
        transform: rotate(180deg);
      }
      &:hover {
        background-color: var(--color-primary-700);
        .my-icon {
          color: #fff;
        }
      }

      .my-icon {
        width: 20px;
        height: 16px;
        color: var(--color-primary-700);
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }

  ${maxMedia.small} {
    margin-top: 30px;

    h3 {
      margin-bottom: 20px;
      text-align: left;
    }
  }
`;
const Carousel__Wrapper = styled.div`
  .ant-carousel {
    overflow: hidden;

    .slick-list {
      margin: 0 -10px;
    }
    .slick-slide {
      padding: 0 10px;
    }
  }

  ${maxMedia.small} {
    display: -webkit-box;
    overflow: auto;
    margin: 0 -20px;
    padding: 0 20px;

    .BlogDetail__ProductItem {
      width: 295px;

      & + .BlogDetail__ProductItem {
        margin-left: 20px;
      }
    }
  }
`;
