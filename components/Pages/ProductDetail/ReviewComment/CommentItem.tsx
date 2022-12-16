import React, { createElement, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import { Avatar, Comment, Tooltip } from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import moment from 'moment';

import { AppState } from 'store/type';

import commentServices from 'services/comment-services';
import urlPage from 'constants/url.constant';

import { CommentModel } from 'models/comment.model';

import styled from 'styled-components';

function linkify(content: string) {
  const replacePattern1 =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  return content
    .replaceAll('<br/>', ' <br/>')
    .replace(replacePattern1, '<a href="//$1" target="_blank">$1</a>');
}

const convertToHtml = (comment: string) => {
  let regex = /@\[.+?\]\(.+?\)/gm;
  let displayRegex = /@\[.+?\]/g;
  let idRegex = /\(.+?\)/g;
  let matches = comment.match(regex);
  let arr: any = [];
  matches &&
    matches.forEach((m: any) => {
      let id = m.match(idRegex)[0].replace('(', '').replace(')', '');
      let display = m.match(displayRegex)[0].replace('@[', '').replace(']', '');

      arr.push({ id: id, display: display });
    });
  let newComment = comment.split(regex);
  let replacedText = '';
  for (let i = 0; i < newComment.length; i++) {
    const c = newComment[i];
    if (i === newComment.length - 1) replacedText += c;
    else
      replacedText +=
        c +
        `<a class="mention" href="${
          arr[i].id.startsWith('user:')
            ? urlPage.profile.replace('{nickname}', arr[i].id.slice(5))
            : `mailto:${arr[i].display}`
        }">${arr[i].display}</a>`;
  }

  return linkify(replacedText);
};

type Props = {
  data: CommentModel;
  children?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  handelReply: (nickname: string, userId: string) => void;
};

const CommentItem = (props: Props) => {
  const auth = useSelector((state: AppState) => state.auth);
  const [action, setAction] = useState<'like' | 'dislike' | undefined>(
    props.data.market_likes_comments ? props.data.market_likes_comments[0]?.type : undefined
  );
  const [likes, setLikes] = useState<number>(props.data.like_count);
  const [dislikes, setDislikes] = useState<number>(props.data.dislike_count);
  const [isActionRunning, setActionRunning] = useState<boolean>(false);

  const handelLike = async (type: 'like' | 'dislike' | 'cancel-like' | 'cancel-dislike') => {
    try {
      setActionRunning(true);
      const { error } = await commentServices[
        type === 'like' || type === 'cancel-like' ? 'likeComment' : 'dislikeComment'
      ](props.data.id);

      if (!error) {
        if (type === 'cancel-like' || type === 'cancel-dislike') setAction(undefined);
        else setAction(type);

        if (type === 'like') {
          setLikes(likes + 1);
          if (action === 'dislike') setDislikes(dislikes - 1);
        } else if (type === 'dislike') {
          setDislikes(dislikes + 1);
          if (action === 'like') setLikes(likes - 1);
        } else if (type === 'cancel-like') setLikes(likes - 1);
        else if (type === 'cancel-dislike') setDislikes(dislikes - 1);
      }
      setActionRunning(false);
    } catch (error) {
      setActionRunning(false);
    }
  };

  const onScrollToWrite = () => {
    const commentLogin = document.getElementById('ProductComment__Login');
    const commentWrite = document.getElementById('ProductComment__Write');

    if (!auth?.token) window.scrollTo({ top: (commentLogin?.offsetTop || 70) - 70 });
    else window.scrollTo({ top: (commentWrite?.offsetTop || 70) - 70 });
  };

  const actions = [
    <CommentAction
      key='like-commnet'
      disabled={isActionRunning}
      onClick={() => handelLike(action === 'like' ? 'cancel-like' : 'like')}>
      {createElement(action === 'like' ? LikeFilled : LikeOutlined)}
      <span className='comment-action'>{likes}</span>
    </CommentAction>,

    <CommentAction
      key='dislike-commnet'
      disabled={isActionRunning}
      onClick={() => handelLike(action === 'dislike' ? 'cancel-dislike' : 'dislike')}>
      {React.createElement(action === 'dislike' ? DislikeFilled : DislikeOutlined)}
      <span className='comment-action'>{dislikes}</span>
    </CommentAction>,

    <span
      key='comment-basic-reply-to'
      onClick={() => {
        props.handelReply(props.data.market_user.nickname, props.data.market_user.id);
        onScrollToWrite();
      }}>
      Reply to
    </span>,
  ];

  return (
    <Comment
      actions={actions}
      author={
        <CommentAuth>
          <Link href={urlPage.profile.replace('{nickname}', props.data.market_user.id)}>
            <a>
              {props.data.market_user.name}
              <span> (@{props.data.market_user.nickname})</span>
            </a>
          </Link>
        </CommentAuth>
      }
      avatar={
        <Link href={urlPage.profile.replace('{nickname}', props.data.market_user.id)}>
          <a>
            <Avatar src={props.data.market_user.image} alt={props.data.market_user.name} />
          </a>
        </Link>
      }
      content={
        <CommentContent>
          <div dangerouslySetInnerHTML={{ __html: convertToHtml(props.data.content) }} />
        </CommentContent>
      }
      datetime={
        <Tooltip title={moment(props.data.createdAt).format('yyyy-mm-DD HH:mm')}>
          <CommentDate>{moment(props.data.createdAt).fromNow()}</CommentDate>
        </Tooltip>
      }
    />
  );
};

export default CommentItem;

const CommentAuth = styled.div`
  a {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-primary-700);

    span {
      font-size: 13px;
      font-weight: 400;
      color: var(--color-gray-7);
    }
  }
`;
const CommentDate = styled.div`
  font-size: 12px;
  color: var(--color-gray-7);
`;
const CommentContent = styled.div`
  .mention {
    padding: 0 4px;
    border-radius: 2px;
    color: var(--color-primary-700);
    background-color: var(--color-primary-100);
  }
`;
const CommentAction = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;

  font-size: 12px;
  color: var(--color-gray-7);

  cursor: pointer;

  ${(props) => {
    if (props.disabled) return `user-select: none;`;
  }}

  .comment-action {
    line-height: 1;
  }
`;
