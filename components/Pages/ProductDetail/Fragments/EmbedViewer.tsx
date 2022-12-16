import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Row,
  Switch,
  Tabs,
} from 'antd';

import config from 'config';

import Icon from 'components/Fragments/Icons';

import { ProductModel } from 'models/product.model';

import styled from 'styled-components';
import { minMedia } from 'styles/__media';

const EmbedViewer__Wrapper = styled.div`
  .ant-modal-body {
    ${minMedia.small} {
      height: 520px;
    }

    .product-embed-viewer-info {
      display: flex;
      flex-direction: column;
    }
    .product-embed-viewer-tool {
      .ant-tabs {
        height: 100%;
        display: flex;
        flex-direction: column;
        .ant-tabs-content-holder {
          flex: auto;
          overflow-y: auto;
        }
      }
    }
  }
`;
const EmbedViewer__Footer = styled.div`
  text-align: left;

  .product-embed-viewer-btn-copy {
    padding: 6px 10px;
    border: none;

    &.--copied {
      background-color: orange;
    }

    .my-icon {
      font-size: 20px;
      color: #ffffff;
    }
  }
`;
const EmbedViewer__Iframe = styled.div`
  iframe {
    width: 100%;
    height: unset !important;
    aspect-ratio: 10 / 5.5;
  }
`;
const EmbedViewer__Html = styled.div`
  flex: auto;
  max-height: 200px;
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 14px;
  font-family: monospace;
  white-space: pre-wrap;
  border: var(--border-1px);
  border-radius: var(--border-radius-base);
  color: var(--color-gray-8);
  overflow-y: auto;
`;
const EmbedViewer__Size = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-input-group {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
  }
`;

type Props = {
  visible: boolean;
  product: ProductModel;
  onClose: () => void;
};

const ProductEmbedViewer = (props: Props) => {
  const { visible, product, onClose } = props;

  const router = useRouter();

  const wrapRef = useRef<HTMLDivElement>(null);

  const [embed, setEmbed] = useState<string>('');
  const [fixedSize, setFixedSize] = useState<boolean>(false);
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [showCaption, setShowCaption] = useState<boolean>(true);
  const [background, setBackground] = useState<string>(product.viewer_bg?.replace('#', '') || '');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (visible) document.body.style.cssText = 'overflow:hidden; touch-action:none;';
    else document.body.removeAttribute('style');
  }, [visible]);

  useEffect(() => {
    onGetEmbed();
  }, [fixedSize, width, height, showCaption, background]);

  const onGetEmbed = () => {
    const embedCode = document.getElementById('vrstyle-embed-wrapper');
    if (embedCode) setEmbed(embedCode?.outerHTML);
  };

  const handelCopy = () => {
    navigator.clipboard.writeText(embed).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const ModalProps: ModalProps = {
    title: 'Embed viewer',
    visible,
    centered: true,
    width: 1000,
    destroyOnClose: true,
    maskClosable: false,
    footer: (
      <EmbedViewer__Footer>
        <Button
          className={'product-embed-viewer-btn-copy' + (copied ? ' --copied' : '')}
          type='primary'
          icon={<Icon iconName='copy' />}
          onClick={handelCopy}>
          {copied ? 'Copied' : 'Copy'} to clipboard
        </Button>
      </EmbedViewer__Footer>
    ),
    getContainer: () => wrapRef.current || document.body,
    onCancel: onClose,
    afterClose: () => {
      setFixedSize(false);
      setShowCaption(true);
      setBackground(product.viewer_bg?.replace('#', '') || '');
    },
  };

  return (
    <EmbedViewer__Wrapper ref={wrapRef}>
      <Modal {...ModalProps}>
        <Row gutter={[20, 20]} className='h-100'>
          <Col md={15} className='h-100 product-embed-viewer-info'>
            <EmbedViewer__Iframe>
              <div id='vrstyle-embed-wrapper'>
                <iframe
                  onLoad={onGetEmbed}
                  title={product.title}
                  src={
                    `${config.urlModelViewer}/${product.id}` +
                    (background ? '?background=' + background : '')
                  }
                  frameBorder='0'
                  allowFullScreen
                  allow='autoplay; fullscreen; xr-spatial-tracking'
                  width={fixedSize ? (width || 640) + 'px' : undefined}
                  height={fixedSize ? (height || 400) + 'px' : undefined}
                />
                {showCaption && (
                  <p style={{ fontSize: 16 }}>
                    <a
                      href={config.urlRoot + router.asPath}
                      style={{ color: '#369ca5', fontWeight: 600 }}>
                      {product.title}
                    </a>{' '}
                    by{' '}
                    <a href={config.urlRoot} style={{ color: '#369ca5', fontWeight: 600 }}>
                      VRStyler
                    </a>
                  </p>
                )}
              </div>
            </EmbedViewer__Iframe>

            <EmbedViewer__Html>{embed}</EmbedViewer__Html>
          </Col>
          <Col md={9} className='h-100 product-embed-viewer-tool'>
            <Tabs>
              <Tabs.TabPane tab='Appearance' key='tab-1'>
                <Form.Item label='Fixed size' colon={false} labelCol={{ span: 24 }}>
                  <EmbedViewer__Size>
                    <Switch
                      checkedChildren='ON'
                      unCheckedChildren='OFF'
                      checked={fixedSize}
                      onChange={(checked) => setFixedSize(checked)}
                    />
                    <Input.Group compact>
                      <InputNumber
                        style={{ width: 100 }}
                        defaultValue='640'
                        disabled={!fixedSize}
                        onBlur={(e) => setWidth(e.target.ariaValueNow || '')}
                      />
                      x
                      <InputNumber
                        style={{ width: 100 }}
                        defaultValue='400'
                        disabled={!fixedSize}
                        onBlur={(e) => setHeight(e.target.ariaValueNow || '')}
                      />
                    </Input.Group>
                  </EmbedViewer__Size>
                </Form.Item>

                <Form.Item label='Description' colon={false} labelCol={{ span: 24 }}>
                  <Checkbox
                    checked={showCaption}
                    onChange={(e) => setShowCaption(e.target.checked)}>
                    Show Caption
                  </Checkbox>
                </Form.Item>

                <Form.Item label='Background color' colon={false} labelCol={{ span: 24 }}>
                  <Input prefix='#' maxLength={6} onBlur={(e) => setBackground(e.target.value)} />
                </Form.Item>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
    </EmbedViewer__Wrapper>
  );
};
export default ProductEmbedViewer;
