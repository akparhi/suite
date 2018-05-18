import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from 'actions/modal';

import EditTaskModal from 'components/modals/EditTaskModal';

const MODALS = {
  EDIT_TASK: EditTaskModal
};

const ModalRoot = props => {
  if (!props.modalType) return null;

  const Modal = MODALS[props.modalType];
  return <Modal {...props.modalProps} handleClose={props.hideModal} />;
};

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  modalProps: state.modal.modalProps
});

export default connect(mapStateToProps, { hideModal })(ModalRoot);
