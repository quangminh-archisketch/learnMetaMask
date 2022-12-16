import { Fragment, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { Breadcrumb, Button, Dropdown, Input, Menu, Spin } from 'antd';

import useDebounce from 'hooks/useDebounce';
import { useClickOutside } from 'hooks/useClickOutside';

import { changeToSlug, convertToHighlightText } from 'common/functions';

import helpCenterServices from 'services/helpCenter-services';

import Icon from 'components/Fragments/Icons';

import { HelpModel } from 'models/help.models';

import styled from 'styled-components';
import { Container } from 'styles/__styles';
import { maxMedia } from 'styles/__media';

const Banner__Wrapper = styled.section`
  .help-center-banner-content {
    position: relative;
    padding: 36px 50px;
    border-radius: 16px;
    color: #fff;
    background-color: #2b5ca6;
    background-image: url(/static/images/help-center/banner-icon.png);
    background-repeat: no-repeat;
    background-position: center right 100px;

    ${maxMedia.custom(768)} {
      padding-bottom: 50px;
      background-size: 150px auto;
      background-position: bottom 50px right 50px;
    }

    ${maxMedia.small} {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 95px 20px 50px;
      background-size: 80px auto;
      background-position: top 20px left 20px;
    }
  }
  .help-center-title {
    font-size: 40px;
    font-weight: 400;
    line-height: 1.5;
    color: #fff;

    ${maxMedia.small} {
      font-size: 24px;
    }
  }
  .help-center-banner-caption {
    font-size: 16px;
    font-weight: 300;
    ${maxMedia.small} {
      font-size: 12px;
      text-align: center;
      br {
        display: none;
      }
    }
  }
  .help-center-btn-contact {
    margin-top: 20px;
    padding: 5px 48px;
    height: 41px;
    font-weight: 500;
  }
  .help-center-search {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 610px;
    max-width: calc(100% - 40px);
    height: 51px;
    padding: 4px 15px;

    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 4px 30px 0 rgba(0, 0, 0, 0.1);
    .ant-input-prefix {
      margin-right: 8px;
      .my-icon {
        font-size: 20px;
      }
    }
    .ant-input {
      color: var(--color-gray-7);
    }
  }
`;
const GroupSearch = styled.div`
  .ant-dropdown-menu {
    max-height: 300px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: #ffffff;
    }
    &::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: 4px;
    }
    &:hover::-webkit-scrollbar-thumb {
      background: #ccc;
    }
  }
  .help-center-search-not-found {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    padding: 20px;
    color: var(--color-gray-7);
  }
`;
const ArticleSearchItem = styled.div`
  h4 {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 400;
    color: #1890ff;
    .hl {
      font-weight: 600;
    }
  }
  .ant-breadcrumb,
  .ant-breadcrumb li:last-child {
    color: var(--color-gray-7);
  }
  .ant-breadcrumb li:not(:last-child) > span:last-child {
    display: inline-block;
  }
`;

const SearchResult = (articles: HelpModel[], keywords: string) => (
  <Menu>
    {articles.map((article, index) => {
      const link =
        '/help-center/' +
        changeToSlug(article.market_category_help.title) +
        '--' +
        article.market_category_help.id +
        '/' +
        changeToSlug(article.title) +
        '--' +
        article.id;

      return (
        <Fragment key={article.id}>
          {index !== 0 && <Menu.Divider />}
          <Menu.Item key={article.id} style={{ padding: 12 }}>
            <Link href={link}>
              <ArticleSearchItem>
                <h4
                  dangerouslySetInnerHTML={{
                    __html: convertToHighlightText(article.title, keywords),
                  }}
                />
                <Breadcrumb separator='>'>
                  <Breadcrumb.Item>Help Center</Breadcrumb.Item>
                  <Breadcrumb.Item>{article.market_category_help.title}</Breadcrumb.Item>
                </Breadcrumb>
              </ArticleSearchItem>
            </Link>
          </Menu.Item>
        </Fragment>
      );
    })}
  </Menu>
);

const SearchNotFound = (keywords: string, loading: boolean) => (
  <Menu className='help-center-search-not-found'>
    {!loading && (
      <>
        No results found for query <strong className='ml-1'>{keywords}</strong>
      </>
    )}
  </Menu>
);

const HelpCenterBanner = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [articles, setArticles] = useState<HelpModel[]>([]);
  const [keywords, setKeyword] = useState<string>('');

  const refSearch = useRef<HTMLDivElement>(null);
  const debouncedKeywords = useDebounce<string>(keywords, 500);

  useClickOutside(refSearch, () => setVisible(false));

  useEffect(() => {
    if (debouncedKeywords) onSearchArticle();
    setVisible(debouncedKeywords.length > 0);
  }, [debouncedKeywords]);

  const onSearchArticle = async () => {
    setLoading(true);
    setArticles([]);
    await helpCenterServices.searchArticle({ title: debouncedKeywords }).then((res) => {
      setArticles(res.data || []);
      setVisible(!res.error);
    });
    setLoading(false);
  };

  return (
    <Banner__Wrapper>
      <Container>
        <div className='help-center-banner-content'>
          <h1 className='help-center-title'>Need help or support</h1>
          <p className='help-center-banner-caption'>
            If you need to help using VRStyler service, please <br />
            contact us by clicking the button below.
          </p>
          <Button className='help-center-btn-contact'>
            <Link href='/contact-us'>Contact us</Link>
          </Button>

          <GroupSearch ref={refSearch}>
            <Dropdown
              overlay={
                <Spin spinning={loading} tip={articles.length > 0 ? undefined : 'Searching...'}>
                  {articles.length > 0
                    ? SearchResult(articles, debouncedKeywords)
                    : SearchNotFound(debouncedKeywords, loading)}
                </Spin>
              }
              trigger={['click']}
              visible={visible}
              getPopupContainer={(elm) => elm || document.body}>
              <Input
                className='help-center-search'
                placeholder='Search help center'
                bordered={false}
                prefix={<Icon iconName='search' style={{ width: 20 }} />}
                onClick={(e) => e.preventDefault()}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Dropdown>
          </GroupSearch>
        </div>
      </Container>
    </Banner__Wrapper>
  );
};

export default HelpCenterBanner;
