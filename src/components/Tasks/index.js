import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { showModal } from 'actions/modal';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'react-router-dom/Link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import mars from 'assets/images/mars.jpg';
import Spacer from 'lib/Spacer';
import TaskList from 'components/Tasks/TaskList';
import AddTask from 'components/Tasks/AddTask';
import { withUIConsumer } from 'providers/ui';
const HomeLink = props => <Link to="/" {...props} />;

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  theme: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    height: 160,
    zIndex: -1,
    opacity: 1,
    backgroundImage: `linear-gradient(to right bottom, rgb(118, 94, 230), rgb(28, 159, 255)), url(${mars})`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'cover, 1280px',
    backgroundPosition: 'top',
    backgroundBlendMode: 'hard-light'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '96px 16px 16px 16px'
  },
  homeButton: {
    color: '#fff'
  },
  title: {
    color: '#fff',
    marginLeft: 2,
    marginBottom: 0
  },
  listSelect: {
    color: '#f5f5f5',
    background: '#f8f9fa52',
    padding: '0 8px',
    '&:after': {
      borderBottom: 'none'
    }
  }
};

const Tasks = ({ classes, tasklists, ctx, showModal }) => {
  const { currentTaskListId } = ctx.state;
  const handleTaskListChange = ({ target: { value } }) => {
    if (value === '__new') {
      return showModal('EDIT_TASKLIST');
    }
    ctx.actions.changeTaskListId(value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.theme} />
      <div className={classes.header}>
        <IconButton
          component={HomeLink}
          size="large"
          aria-label="Home Link"
          className={classes.homeButton}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="display1" gutterBottom className={classes.title}>
          Tasks
        </Typography>
        <Spacer />
        <div>
          <Select
            value={currentTaskListId}
            className={classes.listSelect}
            onChange={handleTaskListChange}
          >
            {isLoaded(tasklists) &&
              !isEmpty(tasklists) &&
              Object.keys(tasklists).map(taskListId => (
                <MenuItem value={taskListId} key={taskListId}>
                  {tasklists[taskListId].title}
                </MenuItem>
              ))}
            <MenuItem value="__new">Add List</MenuItem>
          </Select>
        </div>
        <div />
      </div>

      <TaskList taskListId={currentTaskListId} tasklists={tasklists} />
      <Divider />
      <AddTask taskListId={currentTaskListId} />
    </div>
  );
};

export default compose(
  withUIConsumer,
  firebaseConnect((props, store) => {
    // do something with route params here
    // like change the query if you wanna fetch shared lists
    return [
      {
        path: 'tasklists',
        queryParams: [
          `orderByChild=createdBy`,
          `equalTo=${store.getState().firebase.auth.uid}`
        ]
      }
    ];
  }),
  connect(
    ({ firebase: { data } }, { ctx }) => {
      if (
        ctx.state.currentTaskListId === '__new' &&
        data.tasklists &&
        isLoaded(data.tasklists) &&
        !isEmpty(data.tasklists)
      ) {
        ctx.actions.changeTaskListId(Object.keys(data.tasklists)[0]);
      }

      return {
        tasklists: data.tasklists
      };
    },
    { showModal }
  ),
  withStyles(styles)
)(Tasks);
