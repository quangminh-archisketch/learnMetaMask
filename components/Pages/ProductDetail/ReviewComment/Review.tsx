import { useEffect, useState } from 'react';

import { Button, Progress, Rate } from 'antd';

import { decimalPrecision } from 'common/functions';

import reviewServices from 'services/review-services';

import ReviewItem from './ReviewItem';

import { ReviewModel } from 'models/review.models';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

type Props = {
  averageReview?: number;
  productId: string;
};

type PointCount = {
  [key: string]: number;
};

const ProductReview = (props: Props) => {
  const [pointCount, setPointCount] = useState<PointCount>();
  const [reviews, setReview] = useState<ReviewModel[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchReviews(true);
  }, [props.productId]);

  const fetchReviews = async (isFirst?: boolean) => {
    try {
      if (isFirst) setReview([]);
      setLoading(true);
      const response = await reviewServices.getReviews(
        props.productId,
        10,
        isFirst ? 0 : reviews.length
      );
      if (!response.error) {
        response.data && setReview((reviews ? reviews : []).concat(response.data));

        let _pointCount = { ...response };
        delete _pointCount.error;
        delete _pointCount.data;
        setPointCount(_pointCount);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Review__Average>
        <Review__Point>
          <p>
            {Number.isInteger(props.averageReview)
              ? props.averageReview + ',0'
              : props.averageReview}
          </p>
          <Rate value={props.averageReview} disabled />
        </Review__Point>

        <Review__Count>
          {pointCount &&
            Object.keys(pointCount).map((item, index) => {
              const percent = ((pointCount[item.toString()] || 0) / (pointCount?.total || 0)) * 100;

              return item.toString() !== 'total' ? (
                <li key={index}>
                  <span>
                    {index} star{index > 1 ? 's' : ''}
                  </span>
                  <Progress
                    percent={percent}
                    size='small'
                    strokeColor='var(--color-primary-700)'
                    showInfo={false}
                  />
                  <span>{decimalPrecision(percent, 2)}%</span>
                </li>
              ) : null;
            })}
        </Review__Count>
      </Review__Average>

      <Review__List>
        {reviews?.map((review) => {
          return (
            <ReviewItem key={review.id} data={review}>
              {review.market_reviews && review.market_reviews.length && (
                <ReviewItem data={review.market_reviews[0]} />
              )}
            </ReviewItem>
          );
        })}
      </Review__List>

      {reviews && pointCount && reviews.length < pointCount.total && (
        <div className='ProductReview__LoadMore' onClick={() => fetchReviews()}>
          <Button type='primary' loading={isLoading}>
            Load more
          </Button>
        </div>
      )}
    </Wrapper>
  );
};

export default ProductReview;

const Wrapper = styled.div`
  .ProductReview__LoadMore {
    margin-top: 10px;
    text-align: center;

    .ant-btn {
      font-size: 12px;
      line-height: 1;
      text-transform: uppercase;
    }
  }
`;
const Review__Average = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 20px;

  ${maxMedia.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Review__Point = styled.div`
  text-align: center;

  & > p {
    font-size: 32px;
    font-weight: 600;
    color: var(--text-caption);
  }
`;
const Review__Count = styled.ul`
  width: 100%;
  max-width: 450px;

  ${maxMedia.small} {
    margin-top: 20px;
  }

  li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;

    & > span {
      width: 49px;
      font-size: 14px;
      color: var(--text-caption);
    }

    .ant-progress {
      width: calc(100% - 114px);
    }
  }
`;
const Review__List = styled.div`
  margin-top: 20px;
`;
