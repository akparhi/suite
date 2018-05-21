import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from 'actions/modal';

import EditTaskList from 'components/modals/EditTaskList';
import EditTask from 'components/modals/EditTask';

const MODALS = {
  EDIT_TASKLIST: EditTaskList,
  EDIT_TASK: EditTask
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
