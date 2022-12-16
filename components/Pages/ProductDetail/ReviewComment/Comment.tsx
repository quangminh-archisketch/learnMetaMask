import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { Avatar, Button, Comment } from 'antd';

import { AppState } from 'store/type';
import commentServices from 'services/comment-services';

import CommentItem from './CommentItem';
import CommentWrite from './CommentWrite';

import { CommentModel } from 'models/comment.model';

import styled from 'styled-components';

type Props = {
  productId: string;
  onChangeTotalComment: Dispatch<SetStateAction<number>>;
};

const ProductComment = (props: Props) => {
  const router = useRouter();
  const auth = useSelector((state: AppState) => state.auth);

  const [loadingComment, setLoadingComment] = useState<boolean>(false);
  const [comments, setComment] = useState<CommentModel[]>([]);
  const [totalComments, setTotalComment] = useState<number>(0);
  const [commentContent, setCommentContent] = useState<string>('');
  const [isAddingComment, setAddingComment] = useState<boolean>(false);

  useEffect(() => {
    fetchComment(true);
  }, [props.productId]);

  const fetchComment = async (isFirst?: boolean) => {
    try {
      if (isFirst) {
        setTotalComment(0);
        setComment([]);
      }
      setLoadingComment(true);
      const { data, total, error } = await commentServices.getComments(
        props.productId,
        10,
        isFirst ? 0 : comments.length
      );
      if (!error && data) {
        setComment((comments ? comments : []).concat(data));
        setTotalComment(total);
      }
      setLoadingComment(false);
    } catch (error) {
      setLoadingComment(false);
    }
  };

  const onAddComment = async () => {
    try {
      setAddingComment(true);
      const { data, error } = await commentServices.addComments(
        props.productId,
        commentContent.trim().replaceAll('\n', '<br/>').replace(/\s/g, '&nbsp;')
      );
      if (!error) {
        setComment(comments ? [data].concat(comments) : [data]);
        props.onChangeTotalComment((total) => total + 1);
      }
      setCommentContent('');
      setAddingComment(false);
    } catch (error) {
      setAddingComment(false);
    }
  };

  const handelReply = (nickname: string, userId: string) => {
    setCommentContent(
      commentContent +
        (commentContent ? ' ' : '') +
        `@[${nickname}](user:${userId})` +
        (commentContent ? '' : ' ')
    );
  };

  return (
    <Wrapper>
      {auth?.token ? (
        <div id='ProductComment__Write' className='ProductComment__Write'>
          <Comment
            avatar={<Avatar src={auth.user?.image} alt='Han Solo' />}
            content={
              <CommentWrite
                value={commentContent}
                submitting={isAddingComment}
                onChange={(value) => setCommentContent(value)}
                onSubmit={onAddComment}
              />
            }
          />
        </div>
      ) : (
        <div id='ProductComment__Login' className='ProductComment__Login'>
          <Button type='primary'>
            <Link href={'/login?redirect=' + router.asPath}>Login to comment</Link>
          </Button>
        </div>
      )}

      <div className='ProductComment__List'>
        {comments?.map((comment) => {
          return <CommentItem key={comment.id} data={comment} handelReply={handelReply} />;
        })}
      </div>

      {totalComments > (comments?.length || 0) && (
        <div className='ProductComment__LoadMore' onClick={() => fetchComment()}>
          <Button type='primary' loading={loadingComment}>
            Load more
          </Button>
        </div>
      )}
    </Wrapper>
  );
};

export default ProductComment;

const Wrapper = styled.div`
  margin-top: 20px;

  .ProductComment__Login {
    padding: 30px 0;
    border-radius: 2px;
    border: solid 1px var(--color-gray-5);
    background-color: var(--color-gray-4);
    text-align: center;

    .ant-btn {
      padding: 10px 48px;
      height: 41px;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .ProductComment__LoadMore {
    margin-top: 10px;
    text-align: center;

    .ant-btn {
      font-size: 12px;
      line-height: 1;
      text-transform: uppercase;
    }
  }

  .ant-comment-actions li + li {
    margin-left: 10px;
  }
`;
