import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TaskItem from 'components/Tasks/TaskItem';

const styles = {
  container: {
    height: 'calc(100vh - 228px)'
  },
  tasksContainer: {
    height: 'calc(100vh - 228px)',
    maxHeight: 'calc(100vh - 228px)',
    overflowY: 'scroll'
  },
  loader: {
    height: 'calc(100vh - 228px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const renderTasks = (uid, tasks) => {
  let complete = [],
    incomplete = [];
  // <TaskItem key={key} id={key} task={tasks[key]} />
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
    <div>
      {incomplete.map(el => <TaskItem key={el.id} uid={uid} task={el} />)}
      {complete.map(el => <TaskItem key={el.id} uid={uid} task={el} />)}
    </div>
  );
};

const TaskList = ({ classes, uid, tasks, firebase }) => {
  const tasksList = !isLoaded(tasks) ? (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  ) : isEmpty(tasks) ? (
    'Empty'
  ) : (
    renderTasks(uid, tasks)
  );

  return (
    <div className={classes.container}>
      <div className={classes.tasksContainer}>{tasksList}</div>
    </div>
  );
};

export default compose(
  firebaseConnect((props, store) => [
    `tasks/${store.getState().firebase.auth.uid}`
  ]),
  connect(({ firebase: { data, auth } }) => ({
    uid: auth.uid,
    tasks: data.tasks && data.tasks[auth.uid]
  })),
  withStyles(styles)
)(TaskList);
