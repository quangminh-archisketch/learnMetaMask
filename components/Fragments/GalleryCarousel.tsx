import { useRef, useState } from 'react';

import styled from 'styled-components';
import { Button, Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';

import Icon from './Icons';
import useWindowSize from 'hooks/useWindowSize';
import { maxMedia } from 'styles/__media';

type Props = {
  className?: string;
  galleries: string[];
  mode: ('desktop' | 'mobile')[];
};

const GalleryCarousel = (props: Props) => {
  const { className, galleries, mode } = props;
  const refCarousel = useRef<CarouselRef>(null);
  const [width] = useWindowSize();
  const [imageIndex, setImageIndex] = useState<number>(0);

  if (!galleries || galleries.length === 0)
    return (
      <GalleryCarousel__Wrapper className={'gallery__carousel' + className}>
        <GalleryCarousel__NotAvailable>
          <img src='/static/images/not-available.gif' alt='' />
          <p>View 2D is not available</p>
        </GalleryCarousel__NotAvailable>
      </GalleryCarousel__Wrapper>
    );

  const ThumbItem = (props: { imgUrl: string; active: boolean; onClick: () => void }) => {
    const { imgUrl, active, onClick } = props;
    return (
      <div className={'Thumbnail__Wrapper' + (active ? ' --active' : '')} onClick={onClick}>
        <img src={imgUrl} alt='' />
      </div>
    );
  };

  const carouselProps = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: galleries.length < 6 ? galleries.length : 6,
    swipeToSlide: true,
  };

  return (
    <GalleryCarousel__Wrapper className='gallery__carousel'>
      <div className='gallery__carousel__main'>
        <img src={galleries[imageIndex]} alt='' />
      </div>

      {width >= 992 && mode.includes('desktop') && (
        <GalleryCarousel__Carousel slidesToShow={galleries.length < 6 ? galleries.length : 6}>
          <Button
            className='Btn__ChangeSlide'
            shape='round'
            onClick={() => {
              imageIndex > 0 && setImageIndex(imageIndex - 1);
              refCarousel.current?.prev();
            }}>
            <Icon iconName='arrow-left-double' />
          </Button>
          <Carousel ref={refCarousel} {...carouselProps}>
            {galleries.map((image, index) => {
              return (
                <ThumbItem
                  key={index}
                  imgUrl={image}
                  active={imageIndex === index}
                  onClick={() => setImageIndex(index)}
                />
              );
            })}
          </Carousel>
          <Button
            className='Btn__ChangeSlide'
            shape='round'
            onClick={() => {
              imageIndex < galleries.length - 1 && setImageIndex(imageIndex + 1);
              imageIndex > 1 && refCarousel.current?.next();
            }}>
            <Icon iconName='arrow-right-double' />
          </Button>
        </GalleryCarousel__Carousel>
      )}

      {width < 992 && mode.includes('mobile') && (
        <GalleryCarousel_CarouselMobile className='hide-scrollbar'>
          {galleries.map((image, index) => {
            return (
              <ThumbItem
                key={index}
                imgUrl={image}
                active={imageIndex === index}
                onClick={() => setImageIndex(index)}
              />
            );
          })}
        </GalleryCarousel_CarouselMobile>
      )}
    </GalleryCarousel__Wrapper>
  );
};

export default GalleryCarousel;

const GalleryCarousel__Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  .gallery__carousel__main {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  ${maxMedia.medium} {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border-color: transparent;

    .gallery__carousel__main {
      flex: auto;
      height: 0;
      border-radius: 10px;
      border: var(--border-1px);
    }
  }

  .Thumbnail__Wrapper {
    min-width: 70px;
    max-width: 83px;
    aspect-ratio: 100 / 91;
    border: 1px solid rgba(var(--primary-rgb-700), 20%);
    border-radius: 5px;
    background-color: var(--color-white);
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    cursor: pointer;

    &:not(.--active) {
      border-color: transparent;
      filter: brightness(0.9) blur(0.6px);

      &:hover {
        filter: brightness(0.95);
      }

      ${maxMedia.medium} {
        filter: brightness(0.95);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

const GalleryCarousel__NotAvailable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  height: 100%;
  padding: 40px 20px;
  background: rgb(238, 238, 238);

  img {
    width: 240px;
    object-fit: contain;
    border-radius: 50%;
    border: 12px solid rgb(255, 255, 255);
  }
  p {
    font-size: 14px;
    color: rgb(139, 139, 139);
  }
`;

const GalleryCarousel__Carousel = styled.div<{ slidesToShow: number }>`
  position: absolute;
  left: 50%;
  bottom: 20px;
  width: 100%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  .Btn__ChangeSlide {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    background-color: #fff;

    .my-icon {
      display: flex;
      justify-content: center;
      width: 12px;
      color: #000;
    }
  }

  .ant-carousel {
    width: ${(props) => props.slidesToShow * 92 + 'px'};
    max-width: calc(100% - 250px);

    .slick-track {
      margin: 0 auto;
    }

    .slick-slide {
      padding: 0 6px;
    }
  }
`;

const GalleryCarousel_CarouselMobile = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px -20px 0;
  padding: 0 20px;
  overflow-y: auto;
`;
