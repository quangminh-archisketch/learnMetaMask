import { Avatar, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { CameraFilled } from '@ant-design/icons';

import onBeforeSelectFile from 'common/functions/onBeforeSelectFile';

import styled from 'styled-components';

type Props = {
  avatar?: string;
  isUpload?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (info: UploadChangeParam<UploadFile>) => void;
};

const AvatarUser = (props: Props) => {
  const { isUpload = true } = props;

  return (
    <AvatarUser_Wrapper className='user_avatar'>
      <Avatar src={props.avatar} />
      {isUpload ? (
        <Upload
          showUploadList={false}
          accept='.png, .jpeg, .jpg'
          beforeUpload={(file) => onBeforeSelectFile({ file })}
          onChange={(info) => props.onSelect && props.onSelect(info)}>
          <CameraFilled />
        </Upload>
      ) : (
        ''
      )}
    </AvatarUser_Wrapper>
  );
};

export default AvatarUser;

const AvatarUser_Wrapper = styled.div`
  position: relative;
  display: inline-block;

  width: 110px;
  height: 110px;

  .ant-avatar {
    width: 100%;
    height: 100%;
    border: solid 1.5px #edf6f8;
  }
  .anticon {
    position: absolute;
    bottom: -4px;
    right: 17px;
    width: 27px;
    height: 27px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    color: var(--color-white);
    background-color: var(--color-primary-700);
    border-radius: 50%;

    cursor: pointer;
  }
`;
