import { ReactNode } from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import useWindowSize from 'hooks/useWindowSize';

import { maxMedia } from 'styles/__media';
import styled from 'styled-components';

type Props = {
  title: string | ReactNode;
  children?: string | ReactNode;
  placement?: 'bottomRight';
};

const ToolTip = (props: Props) => {
  const [screenW] = useWindowSize();

  return (
    <Tooltip_wrapper id='tooltipContainer' onClick={(e) => e.stopPropagation()}>
      <Tooltip
        placement={props.placement}
        title={props.title}
        trigger={screenW > 992 ? 'hover' : 'click'}
        getPopupContainer={() => document.getElementById('tooltipContainer') || document.body}>
        {props.children || <InfoCircleOutlined />}
      </Tooltip>
    </Tooltip_wrapper>
  );
};

const Tooltip_wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .ant-tooltip-inner {
    width: fit-content;
  }

  ${maxMedia.medium} {
    .ant-tooltip {
      left: unset !important;
      right: 0;
    }
  }

  .anticon {
    color: var(--color-gray-7);
  }

  p {
    white-space: nowrap;
  }
`;

export default ToolTip;
