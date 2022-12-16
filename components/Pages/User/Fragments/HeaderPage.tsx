import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import Icon from 'components/Fragments/Icons';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  caption?: ReactNode;
  isBack?: boolean;
  className?: string;
  total?: number | string;
};

const HeaderPage = (props: Props) => {
  const { title, subtitle, caption, className, total, isBack = false } = props;
  const totalData = typeof total === 'number' && total === 0 ? '0' : total;

  const router = useRouter();

  return (
    <PageHeader_Wrapper className={className}>
      {isBack && (
        <div className='Header__Page__Back' onClick={() => router.back()}>
          <Icon iconName='arrow-left-double' />
          Back
        </div>
      )}
      <div className='Header__Page__Content' id='headerPageContent'>
        <h5>{subtitle}</h5>
        <h3>
          {title}
          {totalData && <span className='Header__Page__Total'>{totalData}</span>}
        </h3>
        <p>{caption}</p>
      </div>
    </PageHeader_Wrapper>
  );
};

export default HeaderPage;

const PageHeader_Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 2rem;

  .Header__Page__Back {
    display: inline-flex;
    align-items: center;
    gap: 0 5px;

    font-size: 12px;
    line-height: 1.83;
    color: var(--color-main-5);

    cursor: pointer;

    .my-icon {
      width: 10px;
      color: var(--color-main-5);
    }
  }

  .Header__Page__Content {
    position: relative;

    & > h5 {
      font-size: 15px;
      font-weight: 500;
      line-height: 1.534;
      letter-spacing: 0.83px;
      color: var(--color-primary-700);

      ${maxMedia.medium} {
        font-size: 13px;
      }
    }
    & > h3 {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: 1.1px;
      color: var(--text-title);

      ${maxMedia.medium} {
        font-size: 16px;
      }

      .Header__Page__Total {
        height: 26px;
        padding: 0 2px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        border-radius: 3px;
        color: var(--color-white);
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5;
        background-color: var(--color-red-6);
      }
    }
    & > p {
      font-size: 14px;
      line-height: 1.5;
      letter-spacing: 1.05px;
      color: var(--color-gray-7);

      ${maxMedia.medium} {
        font-size: 13px;
      }
    }
  }
`;
