import Link from 'next/link';

import styled from 'styled-components';
import { Breadcrumb } from 'antd';

import Icon from 'components/Fragments/Icons';
import RenderHtmlEditor from 'components/Fragments/RenderHTMLEditor';

import { HelpModel } from 'models/help.models';

import { Container } from 'styles/__styles';
import { maxMedia } from 'styles/__media';
import urlPage from 'constants/url.constant';
import { changeToSlug } from 'common/functions';

type Props = {
  data: HelpModel;
};

const HelpCenterArticleComponent = (props: Props) => {
  const collectionName = props.data.market_category_help.title;
  const collectionLink = urlPage.helpCenterCollection.replace(
    '{slug}',
    changeToSlug(collectionName) + '--' + props.data.market_category_help.id
  );

  return (
    <Wrapper>
      <Container>
        <Breadcrumb className='help-article-breadcrumb my-breadcrumb' separator='>'>
          <Breadcrumb.Item>
            <Link href='/help-center'>Help Center</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={collectionLink}>{collectionName}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{props.data.title}</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className='Article__Title'>{props.data.title}</h1>

        <article className='Article__Content'>
          <RenderHtmlEditor html={props.data.content} />
        </article>

        <Link href={collectionLink}>
          <a className='Go__HelpCenter'>
            <Icon iconName='arrow-left-line' />
            Back to {collectionName}
          </a>
        </Link>
      </Container>
    </Wrapper>
  );
};
export default HelpCenterArticleComponent;

const Wrapper = styled.main`
  padding-bottom: 50px;

  .help-article-breadcrumb {
    padding: 30px 0;

    ${maxMedia.medium} {
      padding: 15px 0;
    }
  }

  .Article__Title {
    font-size: 32px;
    font-weight: 500;
    color: var(--text-title);

    ${maxMedia.medium} {
      font-size: 24px;
    }
  }
  .Article__Content {
    margin-top: 30px;
    text-align: justify;

    ${maxMedia.small} {
      margin-top: 15px;
    }
  }
  .Go__HelpCenter {
    display: inline-flex;
    align-items: center;

    margin-top: 60px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    color: var(--color-gray-7);

    .my-icon {
      font-size: 24px;
      margin-right: 8px;
    }
  }
`;
