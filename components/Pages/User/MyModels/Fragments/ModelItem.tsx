import { useState } from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import { Button } from 'antd';

import urlPage from 'constants/url.constant';
import { changeToSlug } from 'common/functions';

import Icon from 'components/Fragments/Icons';
import ModalDownloadModel from 'components/Fragments/ModalDownloadModel';
import ModalReviewProduct from './ModalReview';

import { AssetModel } from 'models/asset.models';

import { maxMedia } from 'styles/__media';

type Props = {
  data: AssetModel;
};

const ModelItem = (props: Props) => {
  const [review, setReview] = useState<any>(
    props.data.market_item.market_reviews ? props.data.market_item.market_reviews[0] : undefined
  );
  const [isOpenReview, setOpenReview] = useState<boolean>(false);
  const [isDownloaded, setDownloaded] = useState<boolean>(
    props.data.downloaded || props.data.market_order?.is_free || false
  );
  const [isOpenDownload, setModalDownload] = useState<boolean>(false);

  const licenseLink = urlPage.license.replace(
    '{slug}',
    changeToSlug(props.data.market_item.title) + '--' + props.data.item_id
  );

  return (
    <>
      <ModelItem__Wrapper>
        <div className='Model__Info'>
          <img className='Model__Image' src={props.data.market_item.image} alt='' loading='lazy' />
          <h3 className='Model__Title'>{props.data.market_item.title}</h3>
        </div>

        {isDownloaded && (
          <Button className='Btn__License__Mobile' type='link'>
            <Link href={licenseLink}>Licence</Link>
          </Button>
        )}

        <div className='Model__Action'>
          {isDownloaded && (
            <>
              <Button className='Btn__Licence' type='link'>
                <Link href={licenseLink}>Licence</Link>
              </Button>
              {!props.data.market_order?.is_free && (
                <Button className='Btn__Review' onClick={() => setOpenReview(!isOpenReview)}>
                  Review
                </Button>
              )}
            </>
          )}
          <Button
            type='primary'
            shape='round'
            className='Btn__Download'
            onClick={() => setModalDownload(true)}>
            Download
            <Icon iconName='download' />
          </Button>
        </div>
      </ModelItem__Wrapper>

      <ModalDownloadModel
        isOpen={isOpenDownload}
        product={{
          id: props.data.item_id,
          title: props.data.market_item.title,
          image: props.data.market_item.image,
        }}
        files={props.data.market_item.file_details}
        onClose={() => setModalDownload(false)}
        onUpdateDownloaded={() => setDownloaded(true)}
      />

      {isDownloaded && (
        <ModalReviewProduct
          review={review}
          visible={isOpenReview}
          product={props.data}
          onClose={() => setOpenReview(false)}
          onUpdateReview={(data) => setReview(data)}
        />
      )}
    </>
  );
};

const ModelItem__Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  padding: 15px 0;

  ${maxMedia.small} {
    padding: 20px 0;
  }

  &:not(:last-child) {
    border-bottom: var(--border-1px);
  }

  .Model__Info {
    display: flex;
    align-items: center;
    gap: 20px;

    ${maxMedia.small} {
      max-width: calc(100% - 90px);
    }

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

  .Btn__License__Mobile {
    display: none;
    padding: 0;
    color: var(--color-gray-7);

    ${maxMedia.small} {
      display: block;
    }
  }

  .Model__Action {
    display: flex;
    align-items: center;
    gap: 15px;

    .ant-btn {
      padding: 0 24px;
      border-radius: 4px;
    }

    .Btn__Licence {
      color: var(--color-gray-7);
    }

    .Btn__Review {
      color: var(--color-primary-700);
      border-color: var(--color-primary-700);
    }

    .Btn__Download {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      .my-icon {
        font-size: 15px;
        color: var(--color-white);
      }
    }

    ${maxMedia.small} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      margin-top: 20px;

      .Btn__Licence {
        display: none;
      }
    }
  }
`;

export default ModelItem;
