import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import { Slider } from 'antd';

import { ExploreType } from 'models/explore.model';

type Props = {
  className?: string;
  exploreType: ExploreType;
  /* eslint-disable no-unused-vars */
  onChange?: (value: [number, number]) => void;
  onChangePrice: (value: string) => void;
};

const ExplorePriceSlider = (props: Props) => {
  const router: any = useRouter();

  const priceRange: [number, number] = [1, 500];

  const [price, setPrice] = useState<[number, number]>(priceRange);

  useEffect(() => {
    props.onChange && props.onChange(price);
  }, [price]);

  useEffect(() => {
    setPrice([Number(router.query.min || 0), Number(router.query.max || priceRange[1])]);
  }, [router]);

  return (
    <Wrapper className={props.className}>
      <span className='min'>${price[0]}</span>
      <Slider
        range
        tipFormatter={null}
        min={priceRange[0]}
        max={priceRange[1]}
        value={router.query.free ? undefined : price}
        onChange={(value) => setPrice(value)}
        onAfterChange={(value) => props.onChangePrice(value[0] + '-' + value[1])}
      />
      <span className='max'>${price[1]}</span>
    </Wrapper>
  );
};
export default ExplorePriceSlider;

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  padding: 20px 8px 0;
  margin-top: 8px;

  .ant-slider {
    width: 100%;
    margin: 0;

    .ant-slider-track {
      background-color: var(--color-primary-700);
    }
  }

  .min,
  .max {
    position: absolute;
    top: 0;
    /* transform: translateY(-100%); */

    font-size: 13px;
    line-height: 1.45;
    color: var(--text-caption);
  }
  .min {
    left: 0;
  }
  .max {
    right: 0;
  }
`;
