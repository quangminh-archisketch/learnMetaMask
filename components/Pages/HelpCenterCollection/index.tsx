import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Breadcrumb } from 'antd';
import { changeToSlug } from 'common/functions';

import urlPage from 'constants/url.constant';
import helpCenterServices from 'services/helpCenter-services';

import { HelpCategory, HelpModel } from 'models/help.models';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';
import { Container } from 'styles/__styles';

const HelpCollection__Wrapper = styled.main`
  .help-collection-breadcrumb {
    padding: 30px 0;
    ${maxMedia.medium} {
      padding: 15px 0;
    }
  }
  .help-collection-title {
    font-size: 32px;
    font-weight: 500;
    color: var(--text-title);

    ${maxMedia.medium} {
      font-size: 24px;
    }
  }
  .help-collection-description {
    margin-top: 4px;
    font-size: 14px;
    color: var(--color-gray-7);
  }
  .help-collection-article-list {
    margin-top: 16px;
  }
`;
const HelpCollection__ArticleCard = styled.div`
  border: var(--border-1px);
  border-radius: 8px;
  transition: all 0.16s ease 0s;
  &:hover {
    border-color: var(--color-primary-700);
  }
  &:not(:last-child) {
    margin-bottom: 24px;

    ${maxMedia.medium} {
      margin-bottom: 16px;
    }
  }
  .help-collection-article-card-content {
    display: block;
    padding: 16px;

    ${maxMedia.medium} {
      padding: 12px 16px;
    }
  }
  .help-collection-article-card-title {
    font-size: 18px;
    font-weight: 400;
    color: var(--text-caption);

    ${maxMedia.medium} {
      font-size: 16px;
    }
  }
`;

type Props = {
  helpCollection: HelpCategory;
};

const HelpCollection = (props: Props) => {
  const { helpCollection } = props;

  const [helpList, setHelpList] = useState<HelpModel[]>();

  useEffect(() => {
    if (helpCollection)
      helpCenterServices
        .searchArticle({ category: helpCollection?.id })
        .then((res) => setHelpList(res.data));
  }, [helpCollection]);

  return (
    <HelpCollection__Wrapper>
      <Container>
        <Breadcrumb className='help-collection-breadcrumb my-breadcrumb' separator='>'>
          <Breadcrumb.Item>
            <Link href={urlPage.help}>Help Center</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{helpCollection?.title}</Breadcrumb.Item>
        </Breadcrumb>

        <div className='help-collection-content'>
          <h1 className='help-collection-title'>{helpCollection?.title}</h1>
          <div className='help-collection-description'>{helpCollection?.description}</div>

          <div className='help-collection-article-list'>
            {helpList?.map((article) => {
              // prettier-ignore
              const link = urlPage.helpDetail
                .replace('{collection-slug}', `${changeToSlug(article.market_category_help.title)}--${article.market_category_help.id}`)
                .replace('{article-slug}', `${changeToSlug(article.title)}--${article.id}`);
              return (
                <HelpCollection__ArticleCard key={article.id}>
                  <Link href={link}>
                    <a className='help-collection-article-card-content'>
                      <h3 className='help-collection-article-card-title'>{article.title}</h3>
                    </a>
                  </Link>
                </HelpCollection__ArticleCard>
              );
            })}
          </div>
        </div>
      </Container>
    </HelpCollection__Wrapper>
  );
};
export default HelpCollection;
