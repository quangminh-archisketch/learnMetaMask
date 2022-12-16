import { useState } from 'react';

import { useRouter } from 'next/router';

import { Badge, Button, Col, Form, Input, InputNumber, Row, Spin, Tooltip } from 'antd';

import { formatNumber } from 'common/functions';
import Modal from './Modal';

import { ParamWithdraw } from 'models/seller.model';

import { Container } from 'styles/__styles';
import * as L from './style';

type Props = {
  minWithdraw: number;
  loading: boolean;
  maxWithdraw: number;
};

const WithdrawComponent = (props: Props) => {
  const { minWithdraw, loading, maxWithdraw } = props;

  const router = useRouter();

  const [modalLists, setModalLists] = useState<{
    isShow: boolean;
    data: ParamWithdraw | null;
  }>({
    isShow: false,
    data: null,
  });

  const [form] = Form.useForm();

  const onFinish = (values: ParamWithdraw) => {
    values.amount = values?.amount_withdraw || 0;
    delete values['amount_withdraw'];

    setModalLists({
      isShow: true,
      data: values,
    });
  };

  return (
    <L.Withdraw_wrapper>
      <Container>
        {loading ? (
          <Spin />
        ) : (
          <Form layout='vertical' form={form} onFinish={onFinish}>
            <Row gutter={[0, 18]}>
              <Col span={24}>
                <Form.Item
                  label='Bank name'
                  name='bank_name'
                  rules={[{ required: true, message: 'Bank name is required' }]}>
                  <Input
                    placeholder='Example: Vietnam Bank for Industry and Trade (VietinBank)'
                    disabled={maxWithdraw < minWithdraw}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label='Swift code'
                  name='swift_code'
                  rules={[{ required: true, message: 'Swift code is required' }]}>
                  <Input placeholder='Enter swift code' disabled={maxWithdraw < minWithdraw} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label='Account name'
                  name='account_name'
                  rules={[{ required: true, message: 'Account name is required' }]}>
                  <Input placeholder='Enter account name' disabled={maxWithdraw < minWithdraw} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label='Account number'
                  name='card_number'
                  rules={[{ required: true, message: 'Account number is required' }]}>
                  <Input
                    placeholder='Example: 4242 4242 4242 4242'
                    disabled={maxWithdraw < minWithdraw}
                  />
                </Form.Item>
              </Col>

              <Col span={24} className='position-relative'>
                <Form.Item
                  label='Amount withdraw'
                  name='amount_withdraw'
                  className='btn__withdraw--group'
                  rules={[
                    { required: true, message: 'Amount withdraw is required' },
                    () => ({
                      validator(_, value) {
                        if (value > maxWithdraw) {
                          return Promise.reject(
                            new Error(
                              `Withdrawal amount must be less than or equal to ${formatNumber(
                                maxWithdraw,
                                '$'
                              )}`
                            )
                          );
                        } else if (value < minWithdraw) {
                          return Promise.reject(
                            new Error(
                              `Withdraw amount must be greater than or equal to ${formatNumber(
                                minWithdraw,
                                '$'
                              )}`
                            )
                          );
                        } else return Promise.resolve();
                      },
                    }),
                  ]}>
                  <InputNumber
                    addonBefore='$'
                    placeholder={`Minimum withdrawal amount ${formatNumber(minWithdraw, '$')}`}
                    controls={false}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    // disabled={loading || maxWithdraw < minWithdraw}
                    addonAfter={
                      <Tooltip title={`Current amount: ${formatNumber(maxWithdraw, '$')}`}>
                        <Button
                          type='text'
                          className={`btn__draw ${maxWithdraw === 0 ? 'disable' : ''}`}
                          onClick={
                            maxWithdraw > 0
                              ? () => form.setFieldsValue({ amount_withdraw: maxWithdraw })
                              : undefined
                          }>
                          Maximum
                        </Button>
                      </Tooltip>
                    }
                    disabled={maxWithdraw < minWithdraw}
                    min={0}
                    className='w-100 h-100'
                  />
                </Form.Item>
              </Col>

              <div className='note'>
                <Badge dot status='error' />
                You cannot cancel the withdrawal once you have confirmed the withdrawal from the
                store.
                <br />
                <Badge dot status='error' />
                If you enter the wrong bank information or your information leads to the loss of
                money we will not be responsible.
              </div>

              <div className='text-center w-100 btn__withdraw--group'>
                <Button
                  className='btn__cancel'
                  type='ghost'
                  loading={loading}
                  onClick={() => router.push('/seller/withdraw')}>
                  Cancel
                </Button>

                <Button
                  className='btn__submit'
                  type='primary'
                  disabled={maxWithdraw < minWithdraw}
                  loading={loading}
                  htmlType='submit'>
                  Preview
                </Button>
              </div>
            </Row>
          </Form>
        )}
        <Modal isShow={modalLists.isShow} data={modalLists.data} setModalLists={setModalLists} />
      </Container>
    </L.Withdraw_wrapper>
  );
};

export default WithdrawComponent;
