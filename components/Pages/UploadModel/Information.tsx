import { useState } from 'react';

// prettier-ignore
import { Checkbox, Col, Form, FormInstance, Input, InputNumber, message, Row, Select, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { CKEditor } from 'ckeditor4-react';

import UploadModelSection from './Fragments/Section';

import { CategoryModel } from 'models/category.models';
import { ProductModel } from 'models/product.model';
import { License } from 'models/license.models';

import styled from 'styled-components';

type Props = {
  antForm: FormInstance<any>;
  saveType?: 'draft' | 'public';
  data?: ProductModel;
  image?: string;
  category: CategoryModel[];
  categorySelected: string[];
  license: License[];
  linkLicense?: string;
  onRemoveAvatar: () => void;
};

const UploadFileInformation = (props: Props) => {
  const isPublish = props.saveType === 'public';

  const [isFree, setFree] = useState<boolean>(props.data?.price === 0);

  const normalFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const onBeforeUpload = (file: RcFile, fieldName: string) => {
    const fileName = file?.name,
      fileFormat = fileName?.split('.')?.slice(-1)[0],
      fileSize = file?.size;

    // Check Image
    if (fieldName === 'image') {
      if (!['png', 'jpg', 'jpeg'].includes(fileFormat)) {
        message.error('This image format is not supported');
        return Upload.LIST_IGNORE;
      }
      if (fileSize > 1024 * 1024 * 2) {
        message.error('Image are not allowed to be larger than 2MB');
        return Upload.LIST_IGNORE;
      }
    }

    return false;
  };

  return (
    <>
      <UploadModelSection title='Model Information'>
        <Wrapper>
          <Row gutter={[20, 5]}>
            <Col span={24} id='field-item-image'>
              <Form.Item
                label='Image'
                name='image'
                valuePropName='fileList'
                getValueFromEvent={normalFile}
                initialValue={props.image ? [{ name: props.image.split('/').at(-1) }] : undefined}
                rules={[{ required: isPublish, message: 'Please upload pictures for this model' }]}>
                <Upload
                  accept='.png, .jpg, .jpeg'
                  maxCount={1}
                  showUploadList={false}
                  beforeUpload={(file) => onBeforeUpload(file, 'image')}>
                  <AvatarUpload>
                    {props.image ? (
                      <>
                        <img src={props.image} alt='' />
                        <div className='delete d-flex align-items-center justify-content-center'>
                          <DeleteOutlined
                            onClick={(e) => {
                              e.stopPropagation();
                              props.onRemoveAvatar();
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <UploadOutlined />
                        Upload
                      </>
                    )}
                  </AvatarUpload>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={24} id='field-item-title'>
              <Form.Item
                label='Name'
                name='title'
                initialValue={props.data?.title}
                rules={[
                  { required: true, message: 'Please enter model name' },
                  { whitespace: true, message: 'Name cannot be empty' },
                ]}>
                <Input placeholder='' />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label='Description' name='description'>
                <CKEditor
                  initData={props.data?.description}
                  config={{
                    // prettier-ignore
                    toolbar: [
                      ['Bold', 'Italic', 'Link', 'Format', 'Image', 'Blockquote', 'NumberedList', 'BulletedList'],
                    ],
                    contentsCss: `
                      * { max-width: 100%; margin: 0; }
                      body { padding: 10px }
                      h1 { font-size: 2.5em }
                      h2 { font-size: 2em }
                      h3 { font-size: 1.17em }
                      h4 { margin-block-start: 1.33em }
                      p { margin: 0 }
                      ul { padding: 0 20px 10px }
                      ol { padding: 0 20px 10px }
                      img { width: auto }
                      blockquote {
                        background-color: #f3fbfb;
                        border-left: 5px solid #e2f8f9;
                        border-radius: 5px;
                        margin: 0;
                        margin-bottom: 1em;
                        padding: 0.8em;
                      }`,
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={24} id='field-item-cat_id'>
              <Form.Item
                label='Category'
                name='cat_ids'
                initialValue={props.data?.market_item_categories?.map(
                  (cate) => cate.market_category.id
                )}
                rules={[
                  { required: isPublish, message: 'Please choose the category of the model' },
                ]}>
                <Select
                  className='upload-model-category-select'
                  mode='multiple'
                  optionLabelProp='label'
                  getPopupContainer={(triggerNode) => triggerNode}>
                  {props.category.map((cate) => {
                    const checked = props.categorySelected.includes(cate.id);
                    const disabled = props.categorySelected.length >= 2 && !checked;
                    const optionProps = { value: cate.id, label: cate.title, disabled };
                    const checkboxProps = { checked, disabled };
                    return (
                      <Select.Option key={cate.id} {...optionProps}>
                        <Checkbox {...checkboxProps} onClick={(e) => e.stopPropagation()}>
                          {cate.title}
                        </Checkbox>
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label='Tags' name='tags' initialValue={props.data?.tags?.split('|')}>
                <Select mode='tags' open={false} />
              </Form.Item>
            </Col>

            <Col span={24} md={16}>
              <Row gutter={[20, 5]}>
                <Col span={24} md={12} id='field-item-price'>
                  <Form.Item
                    label='Sold Price'
                    name='price'
                    initialValue={props.data?.price}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!isFree)
                            if (typeof value === 'number' && value < 1)
                              return Promise.reject(new Error('Price must be more than 1'));
                            else if (isPublish && !value)
                              return Promise.reject(
                                new Error('Please enter the price for this product')
                              );

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <InputNumber className='w-100' addonBefore='$' disabled={isFree} />
                  </Form.Item>
                </Col>

                <Col span={24} md={12} id='field-item-price'>
                  <Form.Item
                    label='Original price'
                    name='old_price'
                    initialValue={props.data?.old_price}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('price') < value) return Promise.resolve();
                          return Promise.reject(
                            new Error('Original price must be greater than selling price')
                          );
                        },
                      }),
                    ]}>
                    <InputNumber className='w-100' addonBefore='$' disabled={isFree} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    className='upload-model-free-checkbox'
                    name='free'
                    valuePropName='checked'
                    initialValue={props.data?.price === 0}>
                    <Checkbox onChange={(e) => setFree(e.target.checked)}>Share for free</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col span={24} md={8} id='field-item-license_id'>
              <Form.Item
                label='License'
                name='license_id'
                initialValue={props.data?.market_license?.id}
                rules={[{ required: isPublish, message: 'Please choose a license' }]}>
                <Select
                  options={props.license
                    .filter((i) => (isFree ? i.is_free : !i.is_free))
                    .map((i) => ({ label: i.title, value: i.id }))}
                />
              </Form.Item>

              {props.linkLicense && (
                <a href={props.linkLicense} target='__blank'>
                  {props.linkLicense}
                </a>
              )}
            </Col>

            <Col span={24} md={6}>
              <Form.Item
                name='is_animated'
                valuePropName='checked'
                initialValue={props.data?.is_animated}>
                <Checkbox>Is Animation</Checkbox>
              </Form.Item>
            </Col>

            <Col span={24} md={6}>
              <Form.Item name='is_pbr' valuePropName='checked' initialValue={props.data?.is_pbr}>
                <Checkbox>Is PBR</Checkbox>
              </Form.Item>
            </Col>

            <Col span={24} md={6}>
              <Form.Item
                name='is_rigged'
                valuePropName='checked'
                initialValue={props.data?.is_rigged}>
                <Checkbox>Is rigged</Checkbox>
              </Form.Item>
            </Col>

            <Col span={24} md={6}>
              <Form.Item name='is_uv' valuePropName='checked' initialValue={props.data?.is_uv}>
                <Checkbox>UV Layers</Checkbox>
              </Form.Item>
            </Col>

            <Col span={24} md={8}>
              <Form.Item
                label='Unit'
                name='unit'
                initialValue={props.data?.unit}
                rules={[
                  {
                    required: isPublish,
                    message: 'Please select the unit that you use to make the model',
                  },
                ]}>
                <Select
                  placeholder='Unit'
                  options={[
                    { label: 'Meter', value: 1 },
                    { label: 'Centimet', value: 2 },
                    { label: 'Milimet', value: 3 },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={24} md={8}>
              <Form.Item label='Quads' name='quads' initialValue={props.data?.geometry?.quads}>
                <Input placeholder='' />
              </Form.Item>
            </Col>

            <Col span={24} md={8}>
              <Form.Item
                label='Total triangles'
                name='total_triangles'
                rules={[{ whitespace: true, message: 'Total Triangles cannot be empty' }]}
                initialValue={props.data?.geometry?.total_triangles}>
                <Input placeholder='' />
              </Form.Item>
            </Col>

            <Col span={24} md={8}>
              <Form.Item
                label='Vertices'
                name='vertices'
                rules={[{ whitespace: true, message: 'Vertices cannot be empty' }]}
                initialValue={props.data?.vertices}>
                <Input placeholder='' />
              </Form.Item>
            </Col>

            <Col span={24} md={8}>
              <Form.Item
                label='Textures'
                name='textures'
                rules={[{ whitespace: true, message: 'Textures cannot be empty' }]}
                initialValue={props.data?.textures}>
                <Input placeholder='' />
              </Form.Item>
            </Col>

            <Col span={24} md={8}>
              <Form.Item
                label='Materials'
                name='materials'
                rules={[{ whitespace: true, message: 'Materials cannot be empty' }]}
                initialValue={props.data?.materials}>
                <Input placeholder='' />
              </Form.Item>
            </Col>
          </Row>
        </Wrapper>
      </UploadModelSection>
    </>
  );
};

export default UploadFileInformation;

const Wrapper = styled.main`
  #field-item-image .ant-form-item-control-input-content {
    line-height: 1;
    > span {
      display: inline-block;
      line-height: 1;
    }
  }
  .upload-model-category-select {
    .ant-select-item-option:hover {
      background-color: inherit;
    }
    .ant-select-item-option-selected {
      background-color: inherit;
    }
    .ant-checkbox-wrapper {
      width: 100%;
    }
  }
  .upload-model-free-checkbox .ant-form-item-control-input {
    min-height: unset;
  }
`;
const AvatarUpload = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 104px;
  height: 104px;
  padding: 1px;
  border-radius: 2px;
  border: solid 1px var(--color-gray-5);
  background-color: var(--color-gray-2);

  img {
    height: 100%;
  }

  &:hover .delete {
    opacity: 1;
    visibility: visible;
  }

  .anticon {
    margin-bottom: 9px;
    font-size: 20px;
    color: var(--color-primary-700);
  }
  .delete {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;

    background-color: #0000002e;

    .anticon {
      font-size: 16px;
      color: #ff4d4f;
    }
  }
`;
