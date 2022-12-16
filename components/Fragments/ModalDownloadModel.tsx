import styled from 'styled-components';
import { Button, Modal, ModalProps, Radio } from 'antd';

import { ModelFileType } from 'constants/model.contant';

import { AssetFileType } from 'models/asset.models';

import { maxMedia } from 'styles/__media';
import { useState } from 'react';
import assetsServices from 'services/assets-services';

type Props = {
  isOpen: boolean;
  isFree?: boolean;
  product: { id: string; title: string; image: string };
  files: AssetFileType[];
  onClose: () => void;
  onUpdateDownloaded?: () => void;
};

const ModalDownloadModel = (props: Props) => {
  const [fileDownload, setFileDownload] = useState<AssetFileType>();
  const [isDownloading, setDownloading] = useState<boolean>(false);

  const onDownload = async () => {
    if (!fileDownload) return;

    try {
      setDownloading(true);
      const { url } = await assetsServices[props.isFree ? 'downloadFree' : 'download'](
        props.product.id,
        fileDownload
      );
      if (url) window.open(url, '_self');
      setDownloading(false);
      props.onUpdateDownloaded && props.onUpdateDownloaded();
    } catch (error) {
      setDownloading(false);
    }
  };

  const modalProps: ModalProps = {
    title: 'Download Model',
    visible: props.isOpen,
    footer: null,
    centered: true,
    width: 640,
    destroyOnClose: true,
    onCancel: props.onClose,
  };

  return (
    <Modal {...modalProps}>
      <ModalDownloadModel__Wrapper>
        <div className='Model__Info'>
          <img className='Model__Image' src={props.product.image} alt='' loading='lazy' />
          <h3 className='Model__Title'>{props.product.title}</h3>
        </div>

        <Radio.Group className='File__List' onChange={(e) => setFileDownload(e.target.value)}>
          {props.files?.map((item) => {
            return (
              <Radio key={item} value={item}>
                {ModelFileType[item]}
              </Radio>
            );
          })}
        </Radio.Group>

        <Button
          className='Btn__Download'
          type='primary'
          loading={isDownloading}
          onClick={onDownload}>
          Download
        </Button>
      </ModalDownloadModel__Wrapper>
    </Modal>
  );
};

export default ModalDownloadModel;

const ModalDownloadModel__Wrapper = styled.div`
  .Model__Info {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;

    .Model__Image {
      height: 71px;
      width: 71px;
      border-radius: 5px;
      object-fit: cover;
    }

    .Model__Title {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-caption);
    }
  }

  .File__List {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 10px;

    ${maxMedia.small} {
      grid-template-columns: 100%;
    }

    .ant-checkbox-wrapper {
      margin-left: 0;
      color: var(--text-caption);
    }
  }

  .Btn__Download {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    width: 100%;
    max-width: 400px;
    margin: 30px auto 0;

    font-weight: 600;
  }
`;
