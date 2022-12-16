import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import axios from 'axios';
import { Button, Form, message, Modal, Popconfirm, Spin } from 'antd';
import { CloseOutlined, LoadingOutlined, InfoCircleFilled, WarningFilled } from '@ant-design/icons';

import config from 'config';
import getBase64 from 'common/functions/getBase64';
import { FilesType } from 'constants/upload-model.constant';
import productServices from 'services/product-services';

import ModelPlay from './ModelPlay';
import UploadFile from './File';
import UploadFileInformation from './Information';

import { PageProps } from 'models/page.models';
import { ProductModel } from 'models/product.model';
import { CategoryModel } from 'models/category.models';
import { License } from 'models/license.models';

import styled from 'styled-components';
import { ContainerFreeSize } from 'styles/__styles';
import { maxMedia } from 'styles/__media';

type Props = PageProps & {
  type?: 'create' | 'update';
  category: CategoryModel[];
  license: License[];
  data?: ProductModel;
};

const UploadModel = (props: Props) => {
  const { type = 'create' } = props;

  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);

  const [form] = Form.useForm();

  const [saveType, setSaveType] = useState<'draft' | 'public'>();
  const [isHaveFile, setIsHaveFile] = useState<boolean>(false);
  const [urlPlayDemo, setUrlPlayDemo] = useState<string>(config.urlModelViewer);
  const [backgroundViewer, setBackgroundViewer] = useState('');
  const [configs3DViewer, setConfigs3DViewer] = useState<
    Record<string, string | number> | undefined
  >(props.data?.config_3d_viewer);
  const [image, setImage] = useState<string>(props.data?.image || '');
  const [categorySelected, setCategorySelected] = useState<string[]>(
    props.data?.market_item_categories?.map((cate) => cate.market_category.id) || []
  );
  const [linkLicense, setLinkLicense] = useState<string>();
  const [submitting, setSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (props.data) {
      if (FilesType.some((i) => props.data?.files && props.data?.files[i.key])) setIsHaveFile(true);

      let URLModelViewer = config.urlModelViewer;
      if (props.data.files?.DEMO) {
        URLModelViewer += '/' + props.data.id + '?';

        if (props.data.viewer_bg && !props.data.config_3d_viewer?.background) {
          URLModelViewer += `background=${props.data.viewer_bg.split('#')[1]}`;
        }

        if (props.data.config_3d_viewer)
          for (const key in props.data.config_3d_viewer) {
            let value = props.data?.config_3d_viewer[key].toString();
            value = value.startsWith('#') ? value.split('#')[1] : value;
            URLModelViewer += '&' + key + '=' + value;
          }

        setUrlPlayDemo(URLModelViewer);
      }
    }

    // Exit confirm when close or reload page if have data
    window.onbeforeunload = function () {
      let isConfirm: boolean = false;
      for (const key in form.getFieldsValue()) {
        if (form.getFieldsValue()[key]) {
          isConfirm = true;
          break;
        }
      }

      if (!isConfirm) return;
      return 'Are you sure you want to exit?';
    };
  }, [props.data]);

  useEffect(() => {
    const onChangeEnvironmentModel = (config: Record<string, any>) => {
      const { environment, lighting, background } = config;

      background && setBackgroundViewer(background);
      // prettier-ignore
      setConfigs3DViewer((l) => ({ ...l, environment: environment || 'default', background, ...lighting }));
    };

    window.addEventListener('message', (e) => onChangeEnvironmentModel(e.data), false);
  }, []);

  const onChangeValue = async (fields: any, allValues: any) => {
    const fieldName = Object.keys(fields)[0];

    // Convert image to base64
    if (fieldName === 'image' && fields[fieldName][0]) {
      let imageBase64 = await getBase64(fields[fieldName][0].originFileObj);
      setImage(imageBase64 as string);
    }

    // Check files exit
    setIsHaveFile(FilesType.some((i) => allValues[i.key] && allValues[i.key].length));

    if (fieldName === 'cat_ids') setCategorySelected(fields['cat_ids']);

    if (fieldName === 'license_id')
      setLinkLicense(props.license.find((l) => l.id === fields['license_id'])?.link);

    if (fieldName === 'free') {
      setLinkLicense(undefined);
      form.setFieldsValue({ license_id: undefined });
      if (fields['free']) form.setFieldsValue({ price: undefined, old_price: undefined });
    }
  };

  const onRemoveAvatar = () => {
    form.setFieldsValue({ image: undefined });
    setImage('');
  };

  const onSubmit = async (values: any) => {
    try {
      setSubmit(true);

      let bodyProduct = { ...values };

      bodyProduct['image'] = image;
      if (image.startsWith('data:image')) {
        bodyProduct['filename'] = values.image[0].name;
        bodyProduct['filetype'] = values.image[0].type;
      }
      if (image !== props.data?.image) bodyProduct['oldImage'] = props.data?.image;
      if (backgroundViewer) bodyProduct['viewer_bg'] = backgroundViewer;
      if (configs3DViewer) bodyProduct['config_3d_viewer'] = configs3DViewer;
      if (values.description) bodyProduct['description'] = values.description.editor.getData();
      if (values.free) bodyProduct['price'] = 0;
      if (values.tags) bodyProduct['tags'] = [...values.tags].join('|');
      if (values.quads || values.total_triangles)
        bodyProduct['geometry'] = { quads: values.quads, total_triangles: values.total_triangles };
      delete bodyProduct['free'];
      delete bodyProduct['quads'];
      delete bodyProduct['total_triangles'];
      delete bodyProduct['DEMO'];
      FilesType.forEach((i) => delete bodyProduct[i.key]);
      bodyProduct['status'] = 5;

      // 3D files initial
      let productFiles: { [key: string]: string } = { ...props.data?.files };
      for (const key in props.data?.files) {
        if (!values[key] || !values[key].length) delete productFiles[key];
      }

      let productFileDetails: string[] = props.data?.file_details
        ? [...props.data.file_details]
        : [];

      productFileDetails.forEach((fileName) => {
        if (!values[fileName] || !values[fileName].length)
          productFileDetails = [...productFileDetails].filter((i) => i !== fileName);
      });

      // List file upload
      let files3D: { name: string; value: any }[] = [];

      if (values.DEMO && values.DEMO[0] && values.DEMO[0].originFileObj)
        files3D.push({ name: 'DEMO', value: values.DEMO });

      FilesType.filter((i) => values[i.key]).forEach((i) => {
        if (values[i.key][0] && values[i.key][0].originFileObj)
          files3D.push({ name: i.key, value: values[i.key] });
      });

      if (saveType === 'public' && files3D.length === 0) bodyProduct['status'] = 1;

      const resProduct =
        type === 'create'
          ? await productServices.addProduct(bodyProduct)
          : await productServices.updateProduct(props.data?.id as string, {
              ...bodyProduct,
              files: productFiles,
              file_details: productFileDetails,
            });

      if (!resProduct.error) {
        setImage(resProduct.data.image);

        let isError: boolean = false,
          uploadError: { name: string; fileName: string }[] = [];

        // Upload file
        await Promise.all(
          files3D.map(async (file) => {
            try {
              const resLinkS3 = await productServices.getLinkS3({
                filename: file.value[0].name,
                kind: file.name === 'DEMO' ? 'public' : 'private',
              });

              if (resLinkS3.upload) {
                await axios
                  .put(resLinkS3.upload, file.value[0].originFileObj, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    timeout: 1000 * 9999999999,
                    transformRequest: (data, headers: any) => {
                      delete headers.common['Authorization'];
                      return data;
                    },
                  })
                  .then(async () => {
                    productFiles[file.name] = resLinkS3.download;
                    if (file.name !== 'DEMO') productFileDetails.push(file.name);

                    if (file.name === 'DEMO' && resLinkS3.download_usdz)
                      productFiles['DEMO_USDZ'] = resLinkS3.download_usdz;
                    if (file.name === 'GLB' && resLinkS3.download_usdz) {
                      productFiles['USDZ'] = resLinkS3.download_usdz;
                      productFileDetails.push('USDZ');
                    }

                    const isUploadedAll: boolean = files3D.every((i) => productFiles[i.name]);

                    await productServices.updateProduct(resProduct.data.id, {
                      files: productFiles,
                      file_details: productFileDetails,
                      image: resProduct.data.image,
                      cat_ids: categorySelected,
                      status: saveType === 'public' && isUploadedAll ? 1 : 5,
                    });
                  })
                  .catch(() => {
                    isError = true;
                    uploadError.push({ name: file.name, fileName: file.value[0].name });
                  });
              } else isError = true;
            } catch (error) {}
          })
        );

        if (isError) {
          setSubmit(false);
          showConfirm(
            (saveType === 'draft' && uploadError.length) ||
              (saveType === 'public' &&
                (!productFiles['DEMO'] || uploadError.length + 1 === files3D.length))
              ? 'error'
              : 'warning',
            uploadError,
            resProduct.data.id
          );
        } else onFinalSuccess();
      } else {
        setSubmit(false);
        message.error(`Product ${type === 'create' ? 'creation' : 'update'} failed`);
      }
    } catch (error) {
      setSubmit(false);
      message.error(`Product ${type === 'create' ? 'creation' : 'update'} failed`);
      console.log(error);
    }
  };

  const onFinalUpdateProduct = async (productId: string, body: any) => {
    try {
      const resPublic = await productServices.updateProduct(productId, body);
      if (!resPublic.error) onFinalSuccess();
    } catch (error) {
      setSubmit(false);
      console.log(error);
    }
  };

  const onFinalSuccess = () => {
    router.push('/seller/models');
    message.success('Model has been uploaded successfully');
  };

  const showConfirm = (
    type: 'error' | 'warning',
    errors: { name: string; fileName: string }[],
    productId: string
  ) => {
    Modal.confirm({
      icon: null,
      content: (
        <PopupNotification type={type}>
          <h4 className='popup-noti-title d-flex align-items-center'>
            {type === 'error' ? <WarningFilled /> : <InfoCircleFilled />}
            {type === 'error' ? 'Error' : 'Warning'}
          </h4>
          <div className='popup-noti-content'>
            <div>
              {type === 'error' && saveType === 'draft' && 'File upload failed.'}
              {type === 'error' &&
                saveType === 'public' &&
                'This model cannot be published. All model file uploads fail.'}
              {type === 'warning' &&
                saveType === 'public' &&
                'Upload model successfully! However, there is still have error model when uploading!'}
            </div>
            <ul>
              {errors.map((item) => {
                return (
                  <li key={item.name}>
                    File <span>{item.name}</span>: {item.fileName}
                  </li>
                );
              })}
            </ul>
            {type === 'warning' && 'Do you want to continue, and public your models?'}
          </div>
        </PopupNotification>
      ),
      getContainer: pageRef.current || document.body,
      keyboard: false,
      mask: false,
      style: { top: 48 },
      bodyStyle: {
        padding: '10px 16px',
        backgroundColor: type === 'error' ? 'var(--color-red-1)' : '#fffbe6',
        border: `solid 1px ${type === 'error' ? '#ffccc7' : '#ffe58f'}`,
      },
      okText: 'Publish',
      okButtonProps: {
        style: {
          display: type === 'error' ? 'none' : 'initial',
          backgroundColor: '#faad14',
          borderColor: '#faad14',
        },
      },
      cancelText: type === 'error' ? 'Close' : 'Cancel',
      cancelButtonProps: {
        className: type === 'error' ? 'btn-close' : '',
        icon: <CloseOutlined />,
        style: {
          backgroundColor: 'transparent',
          borderColor: 'var(--color-gray-6)',
          color: 'var(--color-gray-6)',
        },
      },
      onCancel: () => router.push('/seller/models'),
      onOk: () => onFinalUpdateProduct(productId, { status: 1, image, cat_ids: categorySelected }),
    });
  };

  const handelHideProduct = async () => {
    setSubmit(true);
    await productServices
      .updateProduct(props.data?.id || '', {
        status: 7,
        cat_ids: categorySelected,
        image: props.data?.image,
      })
      .then(() => {
        router.push('/seller/models');
        message.success('Model has been uploaded successfully');
      })
      .catch(() => message.error('Hide failed product'));
    setSubmit(false);
  };

  const onScrollToValidate = (id: string, smooth: boolean = false) => {
    const elm = document.getElementById(id);
    elm && window.scrollTo({ top: elm.offsetTop - 140, behavior: smooth ? 'smooth' : undefined });
  };

  return (
    <Wrapper ref={pageRef}>
      {submitting && (
        <Spin
          className='d-flex align-items-center justify-content-center'
          indicator={<LoadingOutlined style={{ fontSize: 40 }} />}
        />
      )}
      <ContainerFreeSize>
        <Form
          form={form}
          layout='vertical'
          onValuesChange={onChangeValue}
          onFinish={onSubmit}
          onFinishFailed={(fileList) =>
            onScrollToValidate('field-item-' + fileList.errorFields[0].name[0])
          }>
          <ModelPlay url={urlPlayDemo} />
          <UploadFile
            data={props.data}
            saveType={saveType}
            isHaveFile={isHaveFile}
            onChangeHaveFile={(value) => setIsHaveFile(value)}
          />
          <UploadFileInformation
            antForm={form}
            saveType={saveType}
            data={props.data}
            image={image}
            category={props.category}
            categorySelected={categorySelected}
            license={props.license}
            linkLicense={linkLicense}
            onRemoveAvatar={onRemoveAvatar}
          />

          <ActionGroup>
            <Button danger onClick={() => router.push('/seller/models')}>
              Cancel
            </Button>
            <div>
              {props.data && (
                <Popconfirm
                  title={
                    <>
                      This only hides the product and does not change any information.
                      <br />
                      <span style={{ color: '#ff4d4f' }}>
                        Products will not be changed once hidden.
                      </span>
                      <br />
                      <strong style={{ fontWeight: 600 }}>Still want to hide?</strong>
                    </>
                  }
                  okText='Yes'
                  cancelText='No'
                  onConfirm={handelHideProduct}>
                  <Button type='primary' danger loading={submitting} disabled={submitting}>
                    Hide
                  </Button>
                </Popconfirm>
              )}

              <Button
                type='primary'
                ghost
                htmlType='submit'
                loading={saveType === 'draft' && submitting}
                disabled={saveType === 'public' && submitting}
                onClick={() => setSaveType('draft')}>
                Save as Draft
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                loading={saveType === 'public' && submitting}
                disabled={saveType === 'draft' && submitting}
                onClick={() => setSaveType('public')}>
                Publish
              </Button>
            </div>
          </ActionGroup>
        </Form>
      </ContainerFreeSize>
    </Wrapper>
  );
};

export default UploadModel;

const Wrapper = styled.main`
  padding: 30px 0;

  .ant-form-item .ant-form-item-label .ant-form-item-required::before {
    display: none;
  }
  .ant-tooltip {
    max-width: 300px;
    .ant-tooltip-inner {
      background-color: var(--color-gray-9);
      a {
        text-decoration: underline;
        color: #1890ff;
      }
    }
    .ant-tooltip-arrow-content {
      --antd-arrow-background-color: var(--color-gray-9);
    }
  }
  .ant-spin {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgb(255 255 255 / 70%);
  }
  .ant-modal-confirm-btns {
    margin-top: 0;
    .ant-btn {
      margin-top: 10px;
      .anticon {
        display: none;
      }
      span {
        margin-left: 0;
      }
      & + .ant-btn {
        margin-left: 16px;
      }
      &.btn-close {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        margin-top: 0;
        padding: 10px;
        height: auto;
        border: none;
        box-shadow: none;
        span {
          display: none;
        }
        .anticon {
          display: inline-block;
        }
      }
    }
  }
`;
const ActionGroup = styled.div`
  position: sticky;
  bottom: 0;

  display: flex;
  justify-content: space-between;

  padding: 20px 50px;
  background-color: #ffffff;
  box-shadow: 0 4px 30px 0 rgba(0, 0, 0, 0.1);

  & > div {
    display: flex;
    gap: 20px;
  }

  ${maxMedia.xsmall} {
    padding: 20px;

    &,
    & > div {
      display: grid;
      grid-template-columns: 100%;
      gap: 10px 0;
    }

    .btn-publish {
      margin-left: 0;
    }
  }
`;
const PopupNotification = styled.div<{ type: 'error' | 'warning' }>`
  .popup-noti-title {
    gap: 8px;
    font-size: 18px;
    font-weight: 500;
    color: var(--text-title);

    .anticon {
      font-size: 16px;
      color: ${(props) => (props.type === 'error' ? '#ff4d4f' : '#faad14')};
    }
  }
  .popup-noti-content {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.43;
    letter-spacing: 0.2px;
    color: var(--text-caption);

    ul {
      margin: 5px 0;
      padding-left: 25px;
      list-style: disc;
      li span {
        font-weight: 600;
      }
    }
  }
`;
