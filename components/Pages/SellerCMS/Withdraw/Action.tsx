import moment from 'moment';

import { Modal, Tag } from 'antd';
import { formatNumber } from 'common/functions';

import styled from 'styled-components';

type Props = {
  isView: boolean;
  setIsView: any;
  data: any;
};

const Action = (props: Props) => {
  const { isView, setIsView, data = {} } = props;

  return (
    <Action_wrapper id='actionWrapper'>
      <Modal
        title={'Detail information'}
        visible={isView}
        centered
        width={572}
        footer={false}
        onCancel={() => {
          setIsView(false);
        }}
        getContainer={() => document.getElementById('actionWrapper') || document.body}>
        <div className='box'>
          <div className='item'>
            <h5 className='title'>Number ID</h5>
            <p>{data?.order_no}</p>
          </div>
          <div className='item'>
            <h5 className='title'>Bank name</h5>
            <p>{data?.bank_name}</p>
          </div>
          <div className='item'>
            <h5 className='title'>Swift code</h5>
            <p>{data?.swift_code}</p>
          </div>
          <div className='item'>
            <h5 className='title'>Account name</h5>
            <p>{data?.account_name}</p>
          </div>
          <div className='item'>
            <h5 className='title'>Card name</h5>
            <p>{data?.card_number}</p>
          </div>
          <div className='item'>
            <h5 className='title'>Amount</h5>
            <p>{formatNumber(data?.amount, '$')}</p>
          </div>
          <div className='item'>
            <h5 className='title'>Status</h5>
            {data?.status === 1 && (
              <Tag className='status status-1' color='success'>
                Success
              </Tag>
            )}
            {data?.status === 2 && (
              <Tag className='status status-2' color='error'>
                Unsuccessful
              </Tag>
            )}
            {data?.status === 3 && (
              <Tag className='status status-3' color='warning'>
                Wait for confirmation
              </Tag>
            )}
          </div>

          {data?.status === 1 && (
            <>
              <div className='item'>
                <h5 className='title'>Date update</h5>
                <p>{moment(data?.createdAt).format('h:mm A DD/MM/YYYY')}</p>
              </div>

              <div className='item'>
                <h5 className='title'>Transfer confirmation images</h5>

                <a href={data?.image} target='_blank' rel='noreferrer'>
                  Link
                </a>
              </div>
            </>
          )}
          {data?.status === 2 && (
            <>
              <div className='item'>
                <h5 className='title'>Reason</h5>
                <p>Incorrect bank information</p>
              </div>
              <div className='item'>
                <h5 className='title'>Date update</h5>
                <p>{moment(data?.createdAt).format('h:mm A DD/MM/YYYY')}</p>
              </div>
              <div className='item'>
                <h5 className='title'>Verification image</h5>

                <a href={data?.image} target='_blank' rel='noreferrer'>
                  Link
                </a>
              </div>
            </>
          )}
          {data?.status === 3 && (
            <div className='item'>
              <h5 className='title'>Date create</h5>
              <p>{moment(data?.createdAt).format('h:mm A DD/MM/YYYY')}</p>
            </div>
          )}
        </div>
      </Modal>
    </Action_wrapper>
  );
};

const Action_wrapper = styled.div`
  .ant-modal-title {
    font-size: 18px;
    font-weight: 500;
  }

  .item {
    &:not(:last-child) {
      margin-bottom: 20px;
    }

    .title {
      margin-bottom: 3px;
      font-weight: 400;
      font-size: 14px;
      color: var(--color-gray-7);
      line-height: normal;
    }

    p {
      font-weight: 500;
      font-size: 14px;
      color: #303030;
      line-height: normal;
    }
  }
`;

export default Action;
