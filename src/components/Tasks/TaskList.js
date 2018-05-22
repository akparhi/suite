import React from 'react';
import { isEmpty } from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import TaskItem from 'components/Tasks/TaskItem';

const styles = {
  container: {
    height: 'calc(100vh - 216px)'
  },
  tasksContainer: {
    height: 'calc(100vh - 216px)',
    maxHeight: 'calc(100vh - 216px)',
    overflowY: 'scroll'
  }
};

const renderTasks = (taskListId, { tasks = [] } = {}) => {
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
    <div>
      {incomplete.map(el => (
        <TaskItem key={el.id} taskListId={taskListId} task={el} />
      ))}
      {complete.map(el => (
        <TaskItem key={el.id} taskListId={taskListId} task={el} />
      ))}
    </div>
  );
};

const TaskList = ({ classes, taskListId, tasklists }) => {
  const tasksList = isEmpty(tasklists)
    ? null
    : renderTasks(taskListId, tasklists[taskListId]);

  return (
    <div className={classes.container}>
      <div className={classes.tasksContainer}>{tasksList}</div>
    </div>
  );
};

export default withStyles(styles)(TaskList);
