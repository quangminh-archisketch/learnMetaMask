import { ReactNode } from 'react';

import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import styled from 'styled-components';

const UploadModelSection = (props: { title: string; tooltip?: ReactNode; children: ReactNode }) => {
  const { title, tooltip, children } = props;
  return (
    <Wrapper>
      <h4>
        {title}
        {tooltip && (
          <Tooltip
            className='title-tooltip'
            title={tooltip}
            placement='right'
            getPopupContainer={(elm) => elm}>
            <InfoCircleOutlined />
          </Tooltip>
        )}
      </h4>
      <div>{children}</div>
    </Wrapper>
  );
};

export default UploadModelSection;

const Wrapper = styled.main`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 30px 0 rgba(0, 0, 0, 0.1);

  & > h4 {
    display: flex;
    align-items: center;
    gap: 6px;

    padding-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
    color: var(--text-title);
    border-bottom: var(--border-1px);

    .title-tooltip {
      font-size: 18px;
      color: var(--color-icon);
    }
  }

  & > div {
    margin-top: 20px;
  }
`;
