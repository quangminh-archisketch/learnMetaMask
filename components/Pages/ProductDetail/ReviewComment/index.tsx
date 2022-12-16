import { useEffect, useRef, useState } from 'react';

import ProductReview from './Review';
import ProductComment from './Comment';

import styled from 'styled-components';

type Props = {
  isReview?: boolean;
  averageReview?: number;
  totalReview?: number;
  totalComment?: number;
  productId: string;
};

const ReviewComment = (props: Props) => {
  const { isReview = true } = props;

  const wrapperRef = useRef<HTMLElement>(null);

  const [tab, setTab] = useState<'review' | 'comment'>(isReview ? 'review' : 'comment');
  const [totalComments, setTotalComments] = useState<number>(0);

  useEffect(() => {
    setTotalComments(props.totalComment || 0);
  }, [props.totalComment]);

  useEffect(() => {
    const tabHref = location.hash.split('#')[1];
    if (tabHref === 'review' || tabHref === 'comment') {
      setTab(tabHref);
      wrapperRef.current?.scrollIntoView();
    }
  }, [props.productId]);

  return (
    <Wrapper ref={wrapperRef}>
      <div className='ReviewComment__Tab'>
        {isReview && (
          <div
            className={'ReviewComment__TabItem' + (tab === 'review' ? ' --active' : '')}
            onClick={() => setTab('review')}>
            <span>{props.totalReview}</span> Review
          </div>
        )}

        <div
          className={'ReviewComment__TabItem' + (tab === 'comment' ? ' --active' : '')}
          onClick={() => setTab('comment')}>
          <span>{totalComments}</span> Comment
        </div>
      </div>

      <div style={tab === 'review' ? undefined : { display: 'none' }}>
        <ProductReview averageReview={props.averageReview} productId={props.productId} />
      </div>

      <div style={tab === 'comment' ? undefined : { display: 'none' }}>
        <ProductComment productId={props.productId} onChangeTotalComment={setTotalComments} />
      </div>
    </Wrapper>
  );
};
export default ReviewComment;

const Wrapper = styled.section`
  margin-top: 50px;
  padding-top: 50px;
  border-top: var(--border-1px);

  .ReviewComment__Tab {
    display: flex;
    align-items: center;
    gap: 24px;

    &Item {
      font-size: 18px;
      font-weight: 500;
      color: var(--color-gray-6);
      cursor: pointer;

      &.--active {
        color: var(--color-primary-700);
      }
    }
  }
`;
