import { useState } from 'react';

import { Button, Input, message, Modal, ModalProps, Rate } from 'antd';

import reviewServices from 'services/review-services';

import { AssetModel } from 'models/asset.models';
import { ReviewModel } from 'models/review.models';

import styled from 'styled-components';

const recommends = [
  'Nice and quality product',
  'Website easy to buy and easy to use',
  'Very worth the money',
  'Detailed and easy-to-use models',
  'Excellent product quality',
  'New and modern model',
];

type Props = {
  review: ReviewModel;
  product: AssetModel;
  visible: boolean;
  /* eslint-disable no-unused-vars */
  onClose: () => void;
  onUpdateReview: (review: any) => void;
};

const ModalReviewProduct = (props: Props) => {
  const { visible, review, product, onClose, onUpdateReview } = props;

  const [point, setPoint] = useState<number>(review?.rate || 5);
  const [content, setContent] = useState<string>(review?.content || '');

  const onRate = async () => {
    if (!content.trim()) return message.error('Please add a review for this product');

    try {
      const response = await reviewServices.addReview(
        product.item_id,
        content.trim().replaceAll(' ', '&nbsp;'),
        point
      );
      if (!response.error) {
        message.success('Successful review. Thank you for your review!');
        setContent(response.data.content);
        onUpdateReview(response.data);
        onClose();
      }
    } catch (error) {}
  };

  const modalProps: ModalProps = {
    bodyStyle: { padding: 20 },
    visible,
    footer: null,
    closable: false,
    centered: true,
    width: 726,
    destroyOnClose: true,
    onCancel: onClose,
  };

  return (
    <Modal {...modalProps}>
      <Review__Wrapper>
        <h3 className='ModalReview__Title'>Product Reviews</h3>

        <Review__Body className='my-scrollbar'>
          <Review__Product>
            <img
              src={product.market_item.image}
              alt={product.market_item.title}
              width='60'
              height='60'
            />
            <p>{product.market_item.title}</p>
          </Review__Product>

          <Review__Point>
            <p>Product quality:</p>
            <Rate
              value={point}
              disabled={typeof review !== 'undefined'}
              onChange={(point) => setPoint(point)}
            />
          </Review__Point>

          {!review && (
            <Review__Recommend>
              {recommends.map((tag, index) => {
                return (
                  <Button
                    key={index}
                    onClick={() =>
                      setContent(content.trim() + (content.trim() ? '\n- ' : '- ') + tag)
                    }>
                    {tag}
                  </Button>
                );
              })}
            </Review__Recommend>
          )}

          <Review__Textarea>
            {review ? (
              <div className='Review__Content'>
                <p>Content:</p>
                <div dangerouslySetInnerHTML={{ __html: content.replaceAll('\n', '<br/>') }} />
              </div>
            ) : (
              <Input.TextArea
                placeholder='Write Review'
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            )}
          </Review__Textarea>
        </Review__Body>

        <Review__Footer>
          <Button onClick={onClose}>{review ? 'Close' : 'Cancel'}</Button>
          {!review && (
            <Button type='primary' onClick={onRate}>
              Review
            </Button>
          )}
        </Review__Footer>
      </Review__Wrapper>
    </Modal>
  );
};
export default ModalReviewProduct;

const Review__Wrapper = styled.div`
  .ModalReview__Title {
    padding: 10px 0;
    border-bottom: var(--border-1px);
  }
  .ant-btn {
    padding: 10px;
    height: auto;
    border-radius: 4px;
  }
`;
const Review__Body = styled.div`
  margin: 20px 0;

  max-height: calc(100vh - 400px);
  overflow: auto;
`;
const Review__Product = styled.div`
  display: flex;
  gap: 10px;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }

  p {
    font-size: 16px;
    font-weight: 500;
    color: var(--color-caption);
  }
`;
const Review__Point = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  margin-top: 20px;

  .ant-rate {
    font-size: 24px;
  }
`;
const Review__Recommend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;

  margin-top: 20px;

  .ant-btn {
    border-radius: 4px;
    border-color: var(--color-gray-5);
    background-color: var(--color-gray-3);
  }
`;
const Review__Textarea = styled.div`
  margin-top: 20px;

  .Review__Content {
    & > p {
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: 500;
    }
  }
`;
const Review__Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;

  .ant-btn {
    padding: 10px;
    width: 147px;
  }
`;
