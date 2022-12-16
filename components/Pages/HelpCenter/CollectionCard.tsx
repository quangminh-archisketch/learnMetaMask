import Link from 'next/link';

import { changeToSlug } from 'common/functions';

import urlPage from 'constants/url.constant';

import { HelpCategory } from 'models/help.models';

import styled from 'styled-components';

const Collection__Wrapper = styled.div`
  padding: 16px;
  border: 1px solid var(--color-gray-7);
  border-radius: 8px;
  transition: all 0.16s ease 0s;
  &:hover {
    border-color: var(--color-primary-700);
  }
  .help-collection-card-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .help-collection-card-content {
    flex: auto;
  }
  .help-collection-card-footer {
    margin-top: 7px;
    padding-top: 7px;
    border-top: 1px solid var(--color-gray-5);
  }
  .help-collection-card-title {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-title);
  }
  .help-collection-card-description {
    height: 63px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    color: var(--color-gray-7);
    -webkit-line-clamp: 3;
  }
  .help-collection-card-article-count {
    font-size: 14px;
    font-weight: 300;
    color: var(--color-gray-7);
  }
`;

const HelpCollectionCard = ({ data }: { data: HelpCategory }) => {
  const link = urlPage.helpCenterCollection.replace(
    '{slug}',
    changeToSlug(data.title) + '--' + data.id
  );

  return (
    <Collection__Wrapper>
      <Link href={link}>
        <a className='help-collection-card-box'>
          <div className='help-collection-card-content'>
            <h3 className='help-collection-card-title'>{data.title}</h3>
            <div className='help-collection-card-description text-truncate-line'>
              {data.description}
            </div>
          </div>
          <div className='help-collection-card-footer'>
            <p className='help-collection-card-article-count'>
              {data.market_helps_aggregate?.aggregate.count || 0} post
              {data.market_helps_aggregate && data.market_helps_aggregate.aggregate.count > 1
                ? 's'
                : ''}
            </p>
          </div>
        </a>
      </Link>
    </Collection__Wrapper>
  );
};
export default HelpCollectionCard;
