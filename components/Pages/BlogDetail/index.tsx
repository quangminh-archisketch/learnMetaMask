import styled from 'styled-components';
import Link from 'next/link';

import { Breadcrumb } from 'antd';
import moment from 'moment';

import { changeToSlug } from 'common/functions';

import RenderHtmlEditor from 'components/Fragments/RenderHTMLEditor';
import Icon from 'components/Fragments/Icons';
import DividerMain from 'components/Fragments/DividerMain';
import ArticleRelateBlog from './ArticleRelate';
import BlogDetailProductSuggest from './ProductSuggest';

import { BlogModel } from 'models/blog.models';

import { Container } from 'styles/__styles';
import { maxMedia } from 'styles/__media';

const BlogDetailComponent = ({ data }: { data: BlogModel }) => {
  return (
    <Wrapper>
      <Container>
        <Breadcrumb className='my-breadcrumb' separator='>'>
          <Breadcrumb.Item>
            <Link href='/blog/all'>Blog</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              href={`/blog/${changeToSlug(data.market_category_blog.title)}--${
                data.market_category_blog.id
              }`}>
              {data.market_category_blog.title}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{data.title}</Breadcrumb.Item>
        </Breadcrumb>
        <div className='BlogDetail__Banner'>
          <img src={data.image} alt={data.title} />
        </div>
        <div className='BlogDetail__Info'>
          <div className='BlogDetail__Header'>
            <h3>{data.market_category_blog.title}</h3>
            <h1>{data.title}</h1>
            <p className='BlogDetal__sumary'>{data.sumary}</p>
            <p className='BlogDetail_time'>{moment(data.createdAt).format('DD/MM/YYYY')}</p>
            <div className='BlogDetail__Content'>
              <RenderHtmlEditor html={data?.content} />
            </div>
            <div className='BlogDetail__Content__Frame'>
              {data.hashtag && data.hashtag.length > 0 && (
                <ul className='BlogDetail__Hashtags'>
                  {data.hashtag.map((ht, index) => {
                    return <li key={index}>#{ht}</li>;
                  })}
                </ul>
              )}
            </div>
          </div>
          {data && (
            <ArticleRelateBlog articleId={data.id} categoryId={data.market_category_blog.id} />
          )}
        </div>
        <Link href='/blog'>
          <a className='BlogDetail__GoBack'>
            <Icon iconName='arrow-left-line' />
            Back to Blog
          </a>
        </Link>
        {data.items && data.items?.length > 0 ? (
          <div className='icon__mobile' style={{ display: 'block' }}>
            <DividerMain />
          </div>
        ) : (
          <div className='icon__mobile' style={{ display: 'none' }}>
            <DividerMain />
          </div>
        )}
        {data.items && data.items?.length > 0 && <BlogDetailProductSuggest products={data.items} />}
      </Container>
    </Wrapper>
  );
};
export default BlogDetailComponent;

const Wrapper = styled.main`
  .site-card-wrapper {
    ${maxMedia.medium} {
      margin-left: auto;
      margin-right: auto;
    }
    ${maxMedia.small} {
      margin-left: auto;
      margin-right: auto;
    }
    ${maxMedia.xsmall} {
      margin-left: auto;
      margin-right: auto;
    }
  }
  padding-bottom: 20px;
  .BlogDetail__Banner {
    text-align: center;
    img {
      height: 400px;
      object-fit: cover;
      ${maxMedia.medium} {
        width: 100% !important;
        height: 187px;
      }
    }
  }
  .BlogDetail__Info {
    display: flex;
    flex-wrap: nowrap;
    ${maxMedia.medium} {
      flex-wrap: wrap;
      max-width: unset;
    }
    ${maxMedia.small} {
      display: flex;
      flex-wrap: wrap;
    }
    ${maxMedia.xsmall} {
      display: flex;
      flex-wrap: wrap;
    }
    ${maxMedia.tiny} {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .BlogDetail_time {
    font-size: 14px;
    color: var(--color-gray-7);
    padding: 8px 0 30px 0;
    ${maxMedia.small} {
      font-size: 14px;
      padding: 15px 0 30px 0;
    }
    ${maxMedia.xsmall} {
      font-size: 14px;
      padding: 6px 0 15px 0;
    }
  }
  .BlogDetail__Header {
    margin: 30px 0 20px 0;
    width: 70%;
    flex: 1;
    ${maxMedia.small} {
      margin: 0;
    }
    ${maxMedia.xsmall} {
      margin: 0;
    }
    h3 {
      font-size: 16px;
      font-weight: normal;
      color: var(--color-primary-500);
      padding: 0 0 8px 0;
      ${maxMedia.small} {
        margin: 15px 0 6px 0;
      }
    }
    h1 {
      font-size: 38px;
      color: var(--color-gray-11);
      ${maxMedia.small} {
        margin: 6px 0;
        font-size: 18px;
        font-weight: 500px;
      }
    }
    .BlogDetal__sumary {
      font-size: 16px;
      font-style: italic;
      color: var(--color-gray-9);
      padding: 8px 0 8px 0;
      ${maxMedia.small} {
        font-size: 14px;
        padding: 6px 0 15px 0;
      }
    }
    ${maxMedia.medium} {
      max-width: unset;
    }
  }
  .BlogDetail__Content {
    max-width: calc(100% - 5px);
    text-align: justify;
    font-size: 14px;
    color: var(--color-gray-9);
  }
  .BlogDetail__Hashtags {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 40px 0 31.5px 0;
    list-style: none;
    ${maxMedia.small} {
      margin: 20px 0;
    }
    ${maxMedia.xsmall} {
      margin: 20px 0;
    }
    li {
      padding: 10px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 400;
      line-height: 1;
      color: #fefefe;
      background-color: var(--color-primary-700);
    }
  }
  .BlogDetail__GoBack {
    width: 100%;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    color: var(--color-gray-7);
    .my-icon {
      font-size: 24px;
      margin-right: 8px;
    }
    ${maxMedia.medium} {
      display: none;
    }
    ${maxMedia.small} {
      display: none;
    }
    ${maxMedia.xsmall} {
      display: none;
    }
  }
`;
