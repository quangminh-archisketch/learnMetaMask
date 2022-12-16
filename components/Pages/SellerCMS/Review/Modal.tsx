import React, { useState } from 'react';

import { Button, Form, Input, Modal, Rate } from 'antd';

import { handlerMessage } from 'common/functions';

import reviewServices from 'services/review-services';

import { ReviewModel } from 'models/seller.model';

import styled from 'styled-components';

type Props = {
  modalLists: {
    isShow: boolean;
    data: ReviewModel | null;
  };
  setModalLists: React.Dispatch<
    React.SetStateAction<{ isShow: boolean; data: ReviewModel | null }>
  >;
  setReviewLists: React.Dispatch<
    React.SetStateAction<{ total: number; data: ReviewModel[] | null }>
  >;
};

const ModalComponent = (props: Props) => {
  const { setModalLists, modalLists, setReviewLists } = props;

  const [loading, setLoading] = useState(false);

  const onFetchReplyReview = async (id: string, body: { content: string }) => {
    setLoading(true);
    try {
      const resp: any = await reviewServices.replyReview(id, body);

      if (!resp.error) {
        setReviewLists((prevState) => ({
          ...prevState,
          data:
            prevState.data &&
            prevState.data.map((item) =>
              item.id === id
                ? {
                    ...item,
                    is_replied: true,
                    market_reviews: [{ content: resp?.data?.content }],
                  }
                : item
            ),
        }));
        setModalLists((prevState) => ({
          ...prevState,
          data: prevState.data && {
            ...prevState.data,
            is_replied: true,
            market_reviews: [{ content: resp?.data?.content as string }],
          },
        }));
        setLoading(false);
        handlerMessage('Reply success', 'success');
      }
    } catch (error) {
      setLoading(false);
      handlerMessage('Reply failed', 'error');
    }
  };

  const onFinish = (value: { content: string }) => {
    value.content = value.content.trim();
    onFetchReplyReview(modalLists.data?.id as string, value);
  };

  return (
    <Modal
      title='Reply Reviews'
      footer=''
      centered
      destroyOnClose={true}
      onCancel={() => {
        return setModalLists({ isShow: false, data: null });
      }}
      visible={modalLists.isShow}>
      <ModalComponent_wrapper id='myModal'>
        <div className='product'>
          <div className='product__img'>
            <img src={modalLists.data?.market_item.image} width={60} height={60} alt='' />
          </div>

          <div className='product__title'>
            <h3>{modalLists.data?.market_item.title}</h3>
            <Rate value={modalLists.data?.rate} disabled={true} />
          </div>
        </div>

        <div className='content__review w-100'>
          <div className='left w-100'>
            <h3 className='title__view'>Content review: </h3>
            <div
              className='view__reviews'
              dangerouslySetInnerHTML={{
                __html: modalLists.data?.content
                  ?.trim()
                  .replace(/&nbsp;/g, ' ')
                  .replace(/\n/g, '<br />') as string,
              }}
            />
          </div>
        </div>
        <Form onFinish={onFinish}>
          <h3 className='title__view'>Content reply: </h3>
          <Form.Item
            name='content'
            rules={[
              { required: true, message: 'Content is required' },
              { whitespace: true, message: 'Content cannot be empty' },
            ]}
            initialValue={modalLists?.data?.market_reviews[0]?.content?.trim()}>
            {modalLists.data?.is_replied ? (
              <>
                <div
                  className='view__reviews'
                  dangerouslySetInnerHTML={{
                    __html: modalLists?.data?.market_reviews[0]?.content
                      .replace(/&nbsp;/g, ' ')
                      .replace(/\n/g, '<br />'),
                  }}
                />
              </>
            ) : (
              <Input.TextArea
                rows={6}
                placeholder='Write reply'
                readOnly={modalLists.data?.is_replied}
              />
            )}
          </Form.Item>

          <div className='btn__group text-right'>
            <Button type='ghost' onClick={() => setModalLists({ isShow: false, data: null })}>
              {modalLists.data?.is_replied ? 'Close' : 'Cancel'}
            </Button>
            {!modalLists.data?.is_replied && (
              <Button type='primary' htmlType='submit' loading={loading}>
                Submit
              </Button>
            )}
          </div>
        </Form>
      </ModalComponent_wrapper>
    </Modal>
  );
};

const ModalComponent_wrapper = styled.div`
  .ant-modal-content {
    border-radius: 4px;
  }

  .product__title {
    h3 {
      margin-bottom: 10px;
      font-size: 14px;
      color: var(--text-title)
      font-weight: 500;
    }
  }

  h3.title__view {
    font-size: 14px;
    color: var(--text-title);
    font-weight: 500;
    margin-bottom: 10px;
  }

  .view__reviews {
    height: 146px;
    overflow-y: auto;
  }

  textarea {
    resize: none !important;

    

    &:read-only {
      padding: 0;
      border: 0;
    }

    /* &:active {
      border: 0;
    } */

   
  }

  textarea, .view__reviews {
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-gray-5);
    }

    &::-webkit-scrollbar {
      width: 4px;
    }
  }

  form h3.title__view {
    margin-top: 16px;
  }

  .ant-input[disabled] {
    color: rgba(0, 0, 0, 1);
  }

  .product {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;

    img {
      width: 60px;
      height: 60px;
      border-radius: 4px;
    }

    .ant-rate {
      gap: 8px;
    }
  }

  .btn__group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;

    button {
      min-height: 41px;
      min-width: 145px;
      border-radius: 4px;
    }
  }

  .content__review {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    max-height: 300px;
    overflow-y: auto;

    .left {
      h3 {
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-title);
      }

      .text--truncate {
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        white-space: normal;
        overflow: hidden;
        font-size: 14px;
        color: var(--color-gray-9);
        white-space: pre-wrap;
        word-break: break-all;
        text-align: justify;

        &.show {
          -webkit-line-clamp: unset;
          -webkit-box-orient: initial;
          display: initial;
          white-space: inherit;
          overflow: initial;
        }
      }

      .btn__seemore {
        cursor: pointer;
        transform: rotate(90deg);
      }
    }

    button {
      font-weight: 500;
      font-size: 14px;

      &:hover {
        background-color: transparent;
      }
    }
  }
`;

export default ModalComponent;
