import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from 'actions/modal';
import Loadable from 'packages/Loadable';

const EditTaskList = Loadable(() => import('components/modals/EditTaskList'));
const EditTask = Loadable(() => import('components/modals/EditTask'));
const TaskListTheme = Loadable(() => import('components/modals/TaskListTheme'));
const SignIn = Loadable(() => import('components/modals/SignIn'));

const MODALS = {
  EDIT_TASKLIST: EditTaskList,
  EDIT_TASK: EditTask,
  TASKLIST_THEME: TaskListTheme,
  SIGNIN: SignIn
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
