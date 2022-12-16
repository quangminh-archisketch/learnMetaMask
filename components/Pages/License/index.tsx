import React, { useEffect } from 'react';
import { usePDF } from '@react-pdf/renderer';
import config from 'config';
import { Button } from 'antd';

import { changeToSlug } from 'common/functions';

import urlPage from 'constants/url.constant';

import PDFComponent from './PDFComponent';
import Footer from './Footer';
import Header from './Header';

import { AssetModel } from 'models/asset.models';

import { Container } from 'styles/__styles';
import { maxMedia } from 'styles/__media';
import styled from 'styled-components';

type Props = {
  data: AssetModel;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LicenseComponent = (props: Props) => {
  const productLink = urlPage.productDetail.replace(
    '{slug}',
    changeToSlug(props.data?.market_item?.title) + '--' + props.data?.market_item?.id
  );

  const listType: { title: string; info: string }[] = [
    { title: 'License Type', info: props.data?.license?.title },
    { title: 'Item Title', info: props.data?.market_item?.title },
    { title: 'ID product', info: props.data?.market_item?.id },
    { title: 'Item Url', info: `${config.urlRoot}${productLink}` },
    {
      title: `Licensor's Author`,
      info: props.data?.market_item?.market_user?.name || 'VRStyler Company',
    },
    { title: 'Licensee', info: props.data?.market_user?.name },
  ];

  const [instance] = usePDF({
    document: <PDFComponent listType={listType} imageBanner={props.data?.market_item?.image} />,
  });

  useEffect(() => {
    if (instance.url) {
      props.setLoading(false);
    }
  }, [instance]);

  return (
    <License_wrapper className='position-relative'>
      {props.loading ? (
        ''
      ) : (
        <Container>
          <div className='shadow'>
            <div className='invoicePages' id='invoicePageOne'>
              <Header />

              <MainBanner_wrapper>
                <img src={props.data?.market_item?.image} alt='' />
              </MainBanner_wrapper>

              <Table_wrapper>
                {listType.map((item, index) => (
                  <div className='item' key={index}>
                    <h3 className='left'>{item.title}</h3>
                    {item.title === 'Item Url' ? (
                      <a className='right right--link' href={item.info}>
                        {item.info}
                      </a>
                    ) : (
                      <p className='right'>{item.info}</p>
                    )}
                  </div>
                ))}
              </Table_wrapper>

              <p className='support'>
                For any queries related to this document or license please contact VRStyler Support
              </p>
              <a href='https://vrstyler.com/support' className='link'>
                https://vrstyler.com/support
              </a>

              <Footer />
            </div>
          </div>
        </Container>
      )}

      {instance.url && (
        <div className='download__wrapper'>
          <Button type='primary' shape='round'>
            <a href={instance.url} download={`${props.data?.market_item?.title}-license.pdf`}>
              Download
            </a>
          </Button>
        </div>
      )}
    </License_wrapper>
  );
};

const License_wrapper = styled.div`
  .shadow {
    margin-top: 40px;
    box-shadow: 0 -2px 16px 0 rgba(0, 0, 0, 0.1);

    ${maxMedia.medium} {
      margin-top: 20px;
    }
  }

  .support,
  .link {
    padding: 0 20px;
  }

  .support {
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-gray-9);
    text-align: center;
  }

  .link {
    display: block;
    margin-bottom: 100px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-main-7);
  }

  .download__wrapper {
    text-align: center;
    padding: 30px 0;

    .ant-btn {
      width: 212px;
      height: 42px;
      font-weight: 600;
    }

    ${maxMedia.medium} {
      padding: 20px 0;
    }
  }
`;

const Table_wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .item {
    display: flex;
  }

  .left,
  .right {
    min-height: 60px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-weight: 500;
    font-size: 16px;
  }

  .item:not(:last-child) {
    margin-bottom: 10px;
  }

  .left {
    min-width: 200px;
    color: var(--color-gray-9);

    background-color: var(--color-gray-4);
  }

  .right {
    flex: 1;
    background-color: var(--color-gray-5);
    color: var(--color-gray-11);
    word-break: break-all;

    &--link {
      display: block;
      line-height: 60px;
      color: #1890ff;
      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  ${maxMedia.small} {
    .item {
      flex-direction: column;
      .right {
        flex: initial;
      }
    }
  }
`;

const MainBanner_wrapper = styled.div`
  width: 400px;
  height: 400px;
  margin: 30px auto;
  border-radius: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${maxMedia.medium} {
    width: 280px;
    height: 280px;
  }
`;

export default LicenseComponent;
