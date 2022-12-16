import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, ModalProps } from 'antd';

import { AppState } from 'store/type';
import { CloseSellerRegister } from 'store/reducer/modal';

import SalesRegistrationForm from './FormRegister';
import SalesRegistrationSuccess from './RegisterSuccess';

import styled from 'styled-components';

const SalesRegistration = () => {
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const visible = useSelector((state: AppState) => state.modal.sellerRegister);
  const user = useSelector((state: AppState) => state.auth?.user);

  const modalProps: ModalProps = {
    visible,
    width: 900,
    footer: null,
    destroyOnClose: true,
    getContainer: wrapperRef.current || false,
    onCancel: () => dispatch(CloseSellerRegister()),
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Modal {...modalProps}>
        {!user?.is_seller ? <SalesRegistrationForm /> : <SalesRegistrationSuccess />}
      </Modal>
    </Wrapper>
  );
};
export default SalesRegistration;

const Wrapper = styled.div`
  .ant-modal-content {
    border-radius: 11px;
  }
  .ant-modal-body {
    padding: 30px;
  }
`;
