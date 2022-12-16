import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import moment from 'moment';
import { Button } from 'antd';

import { changeToSlug, getNewObjByFields } from 'common/functions';
import { OpenShare } from 'store/reducer/web';
import urlPage from 'constants/url.constant';

import Icon from 'components/Fragments/Icons';
import RenderHtmlEditor from 'components/Fragments/RenderHTMLEditor';
import ProductEmbedViewer from './EmbedViewer';

import { ProductModel } from 'models/product.model';
import { CategoryModel } from 'models/category.models';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

type Props = {
  data: ProductModel;
  isPreview?: boolean;
};

const ProductDetailContent = (props: Props) => {
  const { data, isPreview } = props;
  const categoryOne: CategoryModel | undefined = data.market_item_categories?.length
    ? data.market_item_categories[0].market_category
    : undefined;

  const dispatch = useDispatch();

  const [openEmbed, setOpenEmbed] = useState<boolean>(false);

  return (
    <ProductContent__Wrapper>
      <Product__Auth>
        <Link href={data.author_id ? urlPage.profile.replace('{nickname}', data.author_id) : '#'}>
          <a>
            <img
              className={'logo' + (data.market_user?.name ? ' auth-image' : '')}
              src={data.market_user?.image || '/static/images/logo.png'}
              alt='VRStyler Logo'
            />
            <h4>{data.market_user?.name || 'VRStyler'}</h4>
          </a>
        </Link>
      </Product__Auth>

      {!isPreview && (
        <Product__Share_Save>
          <li onClick={() => setOpenEmbed(true)}>
            <Icon iconName='embed' />
            <span className='text'>Embed</span>
          </li>
          <li onClick={() => dispatch(OpenShare({ link: location.href }))}>
            <Icon iconName='share' />
            <span className='text'>Share</span>
          </li>
          {/* <li>
          <Icon iconName='plus' />
          <span className='text'>Add To</span>
        </li> */}
        </Product__Share_Save>
      )}

      <Product__Published_Category_Tag>
        <div className='item'>
          <Icon iconName='clock' />
          <span className='text'>Published {moment(data.createdAt).fromNow()}</span>
        </div>

        {categoryOne && (
          <div className='item'>
            <Icon iconName='archive' style={{ fill: 'none' }} />
            <Button className='text'>
              <Link href={`/explore/${changeToSlug(categoryOne.title)}--${categoryOne.id}`}>
                {categoryOne.title}
              </Link>
            </Button>
          </div>
        )}
        {data?.tags && (
          <div className='item'>
            <Icon iconName='tag' />
            <div className='item__wrapper'>
              {data?.tags.split('|').map((tag, index) => (
                <span key={index} className='item__tag text'>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Product__Published_Category_Tag>

      <Product__Description>
        <RenderHtmlEditor html={data.description} />
      </Product__Description>

      <ProductEmbedViewer
        visible={openEmbed}
        product={getNewObjByFields(data, ['id', 'title', 'viewer_bg'])}
        onClose={() => setOpenEmbed(false)}
      />
    </ProductContent__Wrapper>
  );
};

export default ProductDetailContent;

const ProductContent__Wrapper = styled.div``;

const Product__Auth = styled.div`
  margin-top: 15px;

  a {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .logo {
    width: 40px;
    height: 40px;
    padding: 8px;
    border-radius: 50%;
    border: 1px solid var(--color-primary-100);

    &.auth-image {
      padding: 0;
      object-fit: cover;
    }
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-title);
  }
`;

const Product__Share_Save = styled.ul`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 17px;

  li {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    &:nth-child(2) .my-icon {
      font-size: 16px;
    }

    .my-icon {
      font-size: 20px;

      svg {
        fill: none;
      }
    }

    .text {
      color: #707991;
      font-size: 12px;
      line-height: 16px;
    }
  }
`;

const Product__Description = styled.div`
  margin-top: 15px;
`;

const Product__Published_Category_Tag = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 15px;

  .item {
    display: flex;
    align-items: center;
    gap: 10px;

    .my-icon {
      font-size: 20px;
    }
  }

  .text {
    font-size: 14px;
    color: var(--color-gray-8);
  }

  .ant-btn {
    padding: 7px 10px;
    height: auto;
    border-radius: var(--border-radius-base);
    border: 1px solid #c2c2c2;
  }

  .item__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .item__tag {
    padding: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #0a0a0a;
    background-color: #edf6f8;
    border-radius: 5px;
  }

  ${maxMedia.xsmall} {
    gap: 10px;
  }
`;
