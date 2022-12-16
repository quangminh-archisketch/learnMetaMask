import { Button, message } from 'antd';
import { Mention, MentionsInput } from 'react-mentions';

import commentServices from 'services/comment-services';

import { UserModel } from 'models/user.models';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

type Props = {
  /* eslint-disable no-unused-vars */
  id?: string;
  value: string;
  submitting?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const CommentWrite = (props: Props) => {
  const { onChange, onSubmit, submitting, value, id } = props;

  const onSearch = async (text: string, callback: any) => {
    await commentServices
      .searchUser(text)
      .then((res) => res.data.map((user: UserModel) => ({ display: user.nickname, id: user.id })))
      .then(callback);
  };

  const handelSubmit = () => {
    if (value.trim()) onSubmit();
    else message.warning('Please write your comment');
  };

  return (
    <Wrapper id={id}>
      <MentionsInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={defaultStyle}
        a11ySuggestionsListLabel={'Suggested mentions'}>
        <Mention
          markup='@[__display__](user:__id__)'
          trigger='@'
          data={onSearch}
          renderSuggestion={(_, __, highlightedDisplay, ___, focused) => (
            <div className={`user ${focused ? 'focused' : ''}`}>{highlightedDisplay}</div>
          )}
          style={{ color: 'var(--color-primary-700)', backgroundColor: 'var(--color-primary-100)' }}
        />
        <Mention
          markup='@[__display__](email:__id__)'
          trigger={/(([^\s@]+@[^\s@]+\.[^\s@]+))$/}
          data={(search) => [{ id: search, display: search }]}
          style={{ backgroundColor: '#d1c4e9' }}
        />
      </MentionsInput>
      <Button loading={submitting} onClick={handelSubmit} type='primary'>
        Add Comment
      </Button>
    </Wrapper>
  );
};

export default CommentWrite;

const Wrapper = styled.div`
  padding-bottom: 20px;
  text-align: right;

  .ant-mentions {
    text-align: left;
  }

  .ant-btn {
    margin-top: 15px;
    padding: 10px 48px;
    height: auto;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;

    ${maxMedia.small} {
      padding: 5px 30px;
    }
  }
`;

const defaultStyle = {
  control: {
    backgroundColor: '#fff',
    fontSize: 14,
    fontWeight: 'normal',
  },

  '&multiLine': {
    control: {
      minHeight: 90,
    },
    highlighter: {
      padding: 9,
      border: '1px solid transparent',
    },
    input: {
      padding: 9,
      border: '1px solid #d9d9d9',
      outline: 'none',
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: 180,

    highlighter: {
      padding: 1,
      border: '2px inset transparent',
    },
    input: {
      padding: 1,
      border: '2px inset',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
      maxHeight: 200,
      overflow: 'auto',
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      textAlign: 'left',
      '&focused': {
        backgroundColor: '#cee4e5',
      },
    },
  },
};
