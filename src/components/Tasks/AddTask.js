import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { showModal } from 'actions/modal';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';
import converter from 'number-to-words';

const styles = {
  container: {
    height: 55,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 16px'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 35,
    zIndex: 3
  },
  button: {
    borderRadius: 100,
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
  stats: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  substats: {
    display: 'flex',
    alignItems: 'center'
  },
  complete: {
    fontSize: 18,
    color: '#34a853',
    marginRight: 4
  },
  incomplete: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.54)',
    marginRight: 4
  }
};

const renderTaskStats = ({ tasks = [] } = {}, taskListId, classes) => {
  let complete = [],
    incomplete = [];

  Object.keys(tasks).forEach((key, id) => {
    if (tasks[key].done) {
      complete.push({
        id: key,
        ...tasks[key]
      });
    } else {
      incomplete.push({
        id: key,
        ...tasks[key]
      });
    }
  });

  return (
    <div className={classes.stats}>
      <div className={classes.substats}>
        <CheckCircleIcon className={classes.complete} />
        <Typography variant="caption">
          {converter
            .toWords(complete.length)
            .replace(/^\w/, c => c.toUpperCase())}{' '}
          completed tasks
        </Typography>
      </div>
      <div className={classes.substats}>
        <RadioButtonUncheckedIcon className={classes.incomplete} />
        <Typography variant="caption">
          {converter
            .toWords(incomplete.length)
            .replace(/^\w/, c => c.toUpperCase())}{' '}
          remaining tasks
        </Typography>
      </div>
    </div>
  );
};

const AddTask = ({ classes, showModal, taskListId, tasklists }) => {
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
              : showModal('EDIT_TASK', { taskListId })
          }
        >
          <AddIcon className={classes.addIcon} />
          Add a task
        </Button>
      </div>
      {renderTaskStats(tasklists[taskListId], taskListId, classes)}
    </div>
  );
};

export default compose(withStyles(styles), connect(null, { showModal }))(
  AddTask
);
