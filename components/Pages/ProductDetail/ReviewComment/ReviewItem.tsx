import React, { ReactNode } from 'react';

import { Avatar, Comment, Tooltip } from 'antd';
import { StarFilled } from '@ant-design/icons';
import moment from 'moment';

import { ReviewModel } from 'models/review.models';

import styled from 'styled-components';
import Link from 'next/link';
import urlPage from 'constants/url.constant';

type Props = {
  data: ReviewModel;
  children?: ReactNode;
};

const ReviewItem = (props: Props) => {
  const content = props.data.content.replaceAll('\n', '<br/>');

  return (
    <Comment
      author={
        <ReviewAuth>
          <Link href={urlPage.profile.replace('{nickname}', props.data.user_id)}>
            {props.data.market_user.name}
          </Link>
        </ReviewAuth>
      }
      avatar={
        <Link href={urlPage.profile.replace('{nickname}', props.data.user_id)}>
          <a>
            <Avatar src={props.data.market_user.image} alt={props.data.market_user.name} />
          </a>
        </Link>
      }
      content={<ReviewContent dangerouslySetInnerHTML={{ __html: content }} />}
      datetime={
        <div className='d-flex align-items-center' style={{ gap: 5 }}>
          <Tooltip title={moment(props.data.createdAt).format('yyyy-mm-DD HH:mm')}>
            <ReviewDate>{moment(props.data.createdAt).fromNow()}</ReviewDate>
          </Tooltip>

          {props.data.rate && (
            <ReviewPoints>
              <StarFilled />
              {props.data.rate}
            </ReviewPoints>
          )}
        </div>
      }>
      {props.children}
    </Comment>
  );
};

export default ReviewItem;

const ReviewAuth = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary-700);

  a {
    color: inherit;
  }
`;
const ReviewDate = styled.div`
  font-size: 12px;
  color: var(--color-gray-7);
`;
const ReviewPoints = styled.div`
  display: flex;
  align-items: center;

  font-size: 12px;
  line-height: 1.33;
  color: var(--text-caption);

  .anticon {
    margin-right: 2px;
    color: #ffc043;
  }
`;
const ReviewContent = styled.div``;
