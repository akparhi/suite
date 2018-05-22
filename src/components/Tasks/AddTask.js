import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { showModal } from 'actions/modal';

const styles = {
  container: {
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 16px'
  },
  buttonContainer: {
    marginTop: -55,
    position: 'relative',
    zIndex: 3
  },
  button: {
    borderRadius: 100,
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  }
};

const AddTask = ({ classes, showModal, taskListId }) => {
  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <Button
          size="large"
          variant="raised"
          className={classes.button}
          color="primary"
          onClick={() =>
            taskListId === '__new'
              ? showModal('EDIT_TASKLIST')
              : taskListId === '__none'
                ? null
                : showModal('EDIT_TASK', { taskListId })
          }
        >
          <AddIcon className={classes.addIcon} />
          Add a task
        </Button>
      </div>
    </div>
  );
};

export default compose(withStyles(styles), connect(null, { showModal }))(
  AddTask
);
