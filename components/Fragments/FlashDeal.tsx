import { memo, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import moment from 'moment';
import Countdown from 'react-countdown';
import styled from 'styled-components';
import { Button, Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';

import { changeToSlug } from 'common/functions';
import urlPage from 'constants/url.constant';
import saleServices from 'services/sale-service';

import Icon from './Icons';
import ModelViewer from './ModelViewer';

import { FlashDeal } from 'models/sale.models';

import { Container } from 'styles/__styles';

const FlashDealComponent = memo(function FlashDeal() {
  const refCarousel = useRef<CarouselRef>(null);
  const [data, setData] = useState<FlashDeal>();
  const [index, setIndex] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { error, data } = await saleServices.getFlashDeal();
        if (!error) setData(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  if (!data || moment() < moment(data.start)) return <></>;

  const onChangeModel = (type: 'next' | 'prev') => {
    if (type === 'next') {
      setIndex(index < data.products.length - 1 ? index + 1 : 0);
      refCarousel.current?.next();
    }
    if (type === 'prev') {
      setIndex(index === 0 ? data.products.length - 1 : index - 1);
      refCarousel.current?.prev();
    }
  };

  const carouselProps = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: data.products.length < 3 ? data.products.length : 3,
    swipeToSlide: true,
  };

  return (
    <FlashDeal_Wrapper>
      <Container>
        <div className='flashDeal_box'>
          <FlashDeal_Content>
            <h3 className='flashDeal_title'>FLASH DEAL</h3>
            <p className='flashDeal_caption'>With best flash sale up 50% off</p>
            <CountdownMemo date={data?.end} />
            <Button className='flashDeal_btnOrder' type='primary' shape='round'>
              <Link
                href={urlPage.productDetail.replace(
                  '{slug}',
                  changeToSlug(data.products[index].title) + '--' + data.products[index].id
                )}>
                View Detail
              </Link>
            </Button>
          </FlashDeal_Content>

          <FlashDeal_Model>
            <ModelViewer fileGlb={data.products[index].model} />
          </FlashDeal_Model>

          <FlashDeal_ModelList width={carouselProps.slidesToShow * 70}>
            <Icon iconName='arrow-left-double' onClick={() => onChangeModel('prev')} />
            <Carousel {...carouselProps} ref={refCarousel}>
              {data.products.map((item, ind) => {
                return (
                  <img
                    key={index}
                    className={index === ind ? 'active' : ''}
                    src={item.image}
                    alt=''
                    loading='lazy'
                    onClick={() => setIndex(ind)}
                  />
                );
              })}
            </Carousel>
            <Icon iconName='arrow-right-double' onClick={() => onChangeModel('next')} />
          </FlashDeal_ModelList>
        </div>
      </Container>
    </FlashDeal_Wrapper>
  );
});

export default FlashDealComponent;

const CountdownMemo = memo(function CountdownMemo(props: { date: string }) {
  return <Countdown date={new Date(props.date).getTime()} renderer={renderCountdown} />;
});

type RenderCountdownProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};
const renderCountdown = ({ days, hours, minutes, seconds, completed }: RenderCountdownProps) => {
  if (completed) {
    return <></>;
  } else {
    return (
      <FlashDeal_Countdown>
        <div className='countdown_item'>
          <div className='countdown_value'>
            <p>
              <span>{days < 10 ? '0' : days.toString().slice(0, 1)}</span>
              <span>{days < 10 ? days : days.toString().slice(1, 2)}</span>
            </p>
          </div>
          <p className='countdown_label'>Days</p>
        </div>
        <div className='countdown_item'>
          <div className='countdown_value'>
            <p>
              <span>{hours < 10 ? '0' : hours.toString().slice(0, 1)}</span>
              <span>{hours < 10 ? hours : hours.toString().slice(1, 2)}</span>
            </p>
          </div>
          <p className='countdown_label'>Hours</p>
        </div>
        <div className='countdown_item'>
          <div className='countdown_value'>
            <p>
              <span>{minutes < 10 ? '0' : minutes.toString().slice(0, 1)}</span>
              <span>{minutes < 10 ? minutes : minutes.toString().slice(1, 2)}</span>
            </p>
          </div>
          <p className='countdown_label'>Minutes</p>
        </div>
        <div className='countdown_item'>
          <div className='countdown_value'>
            <p>
              <span>{seconds < 10 ? '0' : seconds.toString().slice(0, 1)}</span>
              <span>{seconds < 10 ? seconds : seconds.toString().slice(1, 2)}</span>
            </p>
          </div>
          <p className='countdown_label'>Seconds</p>
        </div>
      </FlashDeal_Countdown>
    );
  }
};

const FlashDeal_Wrapper = styled.section`
  padding: 2rem 0;

  background-color: var(--color-main-1);

  .flashDeal_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const FlashDeal_Content = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  .flashDeal {
    &_title {
      font-size: 2.4rem;
      font-weight: 600;
      line-height: 0.67;
      letter-spacing: 3px;
      color: var(--text-title);
    }

    &_caption {
      margin: 2.5rem 0 4.8rem;

      font-size: 1.5rem;
      font-weight: 300;
      line-height: 1.07;
      letter-spacing: 1.88px;
      color: var(--text-caption);
    }

    &_btnOrder {
      height: 4.2rem;
      margin-top: 5.5rem;

      font-size: 1.4rem;
      font-weight: 600;
      color: var(--color-white);
      text-transform: uppercase;
    }
  }
`;
const FlashDeal_Countdown = styled.div`
  display: inline-flex;
  gap: 2rem;

  .countdown {
    &_item {
      text-align: center;
    }

    &_value {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 8.5rem;
      height: 8.5rem;

      background-color: var(--color-gray-5);
      border-radius: 3px;

      p {
        display: flex;
        justify-content: space-between;

        width: 58%;

        font-size: 3.8rem;
        color: var(--text-title);
      }
    }

    &_label {
      margin-top: 1rem;

      font-size: 1.5rem;
      font-weight: 300;
      line-height: 1.07;
      letter-spacing: 0.9px;
      color: var(--text-caption);
    }
  }
`;
const FlashDeal_Model = styled.div`
  width: 39.2rem;
  aspect-ratio: 1 / 1;
`;
const FlashDeal_ModelList = styled.div<{ width: number }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  user-select: none;

  .my-icon {
    width: 2rem;
    color: var(--color-primary-700);
    cursor: pointer;
  }

  .ant-carousel {
    width: ${(props) => props.width}px;
    .slick-slide {
      & > div {
        padding: 0 10px;
      }
      img {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;

        border-radius: 0.5rem;
        border: 1px solid transparent;
        background-color: var(--color-gray-5);

        cursor: pointer;

        &.active {
          border-color: var(--color-primary-700);
        }
      }
    }
  }
`;
