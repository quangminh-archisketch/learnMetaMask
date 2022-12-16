import { useState } from 'react';

import Link from 'next/link';

import { Button, Form, message, Tooltip, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { InfoCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { FilesType } from 'constants/upload-model.constant';

import UploadModelSection from './Fragments/Section';
import ModalAddFileType from './Fragments/ModalAddFileType';

import { FormFile3D } from 'models/upload-model.models';
import { ProductModel } from 'models/product.model';

import styled from 'styled-components';

type Props = {
  /* eslint-disable no-unused-vars */
  data?: ProductModel;
  saveType?: 'draft' | 'public';
  isHaveFile: boolean;
  onChangeHaveFile: (value: boolean) => void;
};

const UploadFile = (props: Props) => {
  const isPublish = props.saveType === 'public';
  const disabledChange: boolean =
    typeof props.data?.bought_count === 'number' && props.data.bought_count > 0;

  const [filesType, setFileType] = useState<FormFile3D[]>(
    FilesType.filter((i) => props.data?.files && props.data?.files[i.key])
  );
  const [openAddFile, setOpenAddFile] = useState<boolean>(false);

  const onAddFileType = (value: string[]) => {
    const fieldsNotChange = filesType.filter((i) => value.includes(i.key));
    const fieldsNew = FilesType.filter(
      (i) => value.includes(i.key) && fieldsNotChange.findIndex((k) => k.key === i.key) === -1
    );
    ![...fieldsNotChange, ...fieldsNew].length && props.onChangeHaveFile(false);
    setFileType([...fieldsNotChange, ...fieldsNew]);
  };

  const normalFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const onBeforeUpload = (file: RcFile, fieldName: string) => {
    const fileName = file?.name,
      fileSize = file?.size,
      fileFormat = fileName?.split('.')?.slice(-1)[0];

    // Check file demo
    if (fieldName === 'DEMO') {
      const maxSizeDemo = 1024 * 1024 * 20;
      if (!fileName || fileFormat !== 'glb' || fileSize > maxSizeDemo) {
        if (fileFormat !== 'glb' && fileName) message.error('Demo file must be GLB');
        else if (fileSize > maxSizeDemo)
          message.error('Demo files are not allowed to be larger than 20MB');
        return Upload.LIST_IGNORE;
      } else onSendModelToViewer('model', file);
    }

    // Check file model
    const filesType = FilesType.map((i) => i.key);
    if (filesType.includes(fieldName)) {
      const fileAccept = FilesType.find((i) => i.key === fieldName)?.accept;
      if (fileFormat && !fileAccept?.includes(fileFormat)) {
        message.error('The file is not in the correct format');
        return Upload.LIST_IGNORE;
      } else props.onChangeHaveFile(true);
    }

    return false;
  };

  const onSendModelToViewer = (type: 'cancel' | 'model', file?: any) => {
    const iframe = document.querySelector('iframe');
    let postMsg = { type, file };
    iframe?.contentWindow?.postMessage(postMsg, '*');
  };

  const ValidateFile = (index: 1 | 2) => (
    <FileItem id={'field-item-file-is-required-' + index}>
      <Form.Item
        className='upload-file-msg-validate'
        name={'file-is-required-' + index}
        rules={[{ required: isPublish, message: 'You must upload at least one model file' }]}
      />
    </FileItem>
  );

  return (
    <>
      <UploadModelSection title='Upload Models'>
        <Wrapper>
          <FileItem id='field-item-DEMO'>
            <Form.Item
              label={
                <>
                  Demo
                  <Tooltip
                    placement='right'
                    getPopupContainer={(elm) => elm}
                    title={
                      <>
                        <p>Demo file alf GLB and less than 20MB</p>
                        <Link href='/' target='_blank'>
                          Why upload a demo file?
                        </Link>
                      </>
                    }>
                    <InfoCircleOutlined />
                  </Tooltip>
                </>
              }
              name='DEMO'
              valuePropName='fileList'
              getValueFromEvent={normalFile}
              initialValue={
                props.data?.files?.DEMO
                  ? [{ name: props.data?.files.DEMO.split('/').at(-1) }]
                  : undefined
              }
              rules={[{ required: isPublish, message: 'Please upload demo model' }]}>
              <Upload
                accept='.glb'
                maxCount={1}
                disabled={disabledChange}
                beforeUpload={(file) => onBeforeUpload(file, 'DEMO')}
                onRemove={() => onSendModelToViewer('cancel')}>
                <Button className='btn-upload-file' icon={<UploadOutlined />}>
                  Upload demo file
                </Button>
              </Upload>
            </Form.Item>
          </FileItem>

          {filesType?.map((file, index) => {
            return (
              <FileItem key={index} id={'field-item-' + file.key}>
                <Form.Item
                  label={file.title}
                  name={file.key}
                  valuePropName='fileList'
                  getValueFromEvent={normalFile}
                  initialValue={
                    props.data?.files?.[file.key]
                      ? [{ name: props.data?.files[file.key].split('/').at(-1) }]
                      : undefined
                  }>
                  <Upload
                    accept={file.accept}
                    maxCount={1}
                    disabled={
                      disabledChange && props.data?.file_details?.join('_').includes(file.key)
                    }
                    beforeUpload={(uploadFile) => onBeforeUpload(uploadFile, file.key)}>
                    <Button className='btn-upload-file' icon={<UploadOutlined />}>
                      Upload {file.key} file
                    </Button>
                  </Upload>
                </Form.Item>
              </FileItem>
            );
          })}

          {!props.isHaveFile && filesType.length > 0 && ValidateFile(1)}

          <Button
            className='UploadModel__BtnAddFile'
            icon={<PlusOutlined />}
            onClick={() => setOpenAddFile(true)}>
            Add file Upload
          </Button>

          {!props.isHaveFile && filesType.length === 0 && ValidateFile(2)}
        </Wrapper>
      </UploadModelSection>

      <ModalAddFileType
        visible={openAddFile}
        onCancel={() => setOpenAddFile(false)}
        filesType={filesType}
        filesNotChange={disabledChange ? props.data?.file_details : undefined}
        onOk={onAddFileType}
      />
    </>
  );
};

export default UploadFile;

const Wrapper = styled.div`
  .upload-file-msg-validate {
    display: block;
    margin-top: -10px;
    font-size: 13px;

    .ant-form-item-control-input {
      min-height: 0;
    }
  }
  .UploadModel__BtnAddFile {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 25px 0 10px;
    width: 182px;
    color: var(--color-primary-700);
    border-color: var(--color-primary-700);

    .anticon {
      font-size: 12px;
    }
  }
`;
const FileItem = styled.div`
  & + div {
    margin-top: 10px;
  }
  .ant-checkbox-wrapper span:nth-child(2),
  .ant-form-item-label label {
    color: var(--color-gray-7);
    user-select: none;
  }
  .ant-form-item {
    div.ant-form-item-label {
      padding-bottom: 5px;
      overflow: unset;
      label {
        flex-direction: row !important;
        gap: 7px;
      }
    }
  }
  .btn-upload-file {
    display: flex;
    align-items: center;

    width: 182px;
  }
  .ant-upload-text-icon {
    display: inline-flex;
  }
  .ant-upload-list-item {
    width: fit-content;
    min-width: 182px;
  }
`;
