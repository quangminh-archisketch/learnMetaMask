import { useState } from 'react';

import { Button, Checkbox, Modal, ModalProps } from 'antd';

import { FilesType } from 'constants/upload-model.constant';

import { FormFile3D } from 'models/upload-model.models';

import styled from 'styled-components';

type Props = {
  /* eslint-disable no-unused-vars */
  visible: boolean;
  filesType: FormFile3D[];
  filesNotChange?: string[];
  onCancel: () => void;
  onOk: (value: string[]) => void;
};

const ModalAddFileType = (props: Props) => {
  const { visible, filesType, filesNotChange: filesHide, onCancel, onOk } = props;

  const [selected, setSelected] = useState<string[]>(filesType.map((i) => i.key));

  const modalProps: ModalProps = {
    visible,
    title: 'Add type file',
    destroyOnClose: true,
    centered: true,
    width: 572,
    footer: [
      <Button
        key='add'
        type='primary'
        style={{ width: 125, height: 41 }}
        onClick={() => {
          onOk(selected);
          onCancel();
        }}>
        Add
      </Button>,
    ],
    style: { borderRadius: 11, overflow: 'hidden' },
    onCancel,
  };

  return (
    <Modal {...modalProps}>
      <Wrapper>
        <Checkbox.Group
          defaultValue={filesType.map((i) => i.key)}
          onChange={(value) => setSelected(value.map((i) => i.toString()))}>
          {FilesType.map((file) => {
            return (
              <Checkbox key={file.key} value={file.key} disabled={filesHide?.includes(file.key)}>
                {file.title}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </Wrapper>
    </Modal>
  );
};
export default ModalAddFileType;

const Wrapper = styled.div`
  .ant-checkbox-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 10px;
    .ant-checkbox-wrapper {
      & + .ant-checkbox-wrapper {
        margin-left: 0;
      }
    }
  }
`;
