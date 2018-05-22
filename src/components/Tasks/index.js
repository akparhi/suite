import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { showModal } from 'actions/modal';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'react-router-dom/Link';
import Divider from '@material-ui/core/Divider';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Spacer from 'lib/Spacer';
import TaskList from 'components/Tasks/TaskList';
import AddTask from 'components/Tasks/AddTask';
import { withUIConsumer } from 'providers/ui';
import { backgrounds, themes } from 'utils/constants';

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
    fontSize: 36,
    color: '#fff',
    background: 'transparent',
    marginLeft: 2,
    padding: 0,
    '&:after': {
      borderBottom: 'none'
    }
  },
  actionButton: {
    color: '#f5f5f5'
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

  let background = 'mars',
    theme = 'blue';
  if (
    ctx.state.currentTaskListId !== '__new' &&
    isLoaded(tasklists) &&
    !isEmpty(tasklists)
  ) {
    if (tasklists[ctx.state.currentTaskListId].background) {
      background = tasklists[ctx.state.currentTaskListId].background;
    }

    if (tasklists[ctx.state.currentTaskListId].theme) {
      theme = tasklists[ctx.state.currentTaskListId].theme;
    }
  }

  return (
    <div className={classes.container}>
      <div
        className={classes.theme}
        style={{
          backgroundImage: `linear-gradient(to right bottom, ${
            themes[theme]
          }), url(${backgrounds[background]})`
        }}
      />
      <div className={classes.header}>
        <IconButton
          component={HomeLink}
          size="large"
          aria-label="Home Link"
          className={classes.homeButton}
        >
          <ArrowBackIcon />
        </IconButton>
        <div>
          <Select
            value={currentTaskListId}
            className={classes.listSelect}
            onChange={handleTaskListChange}
            IconComponent={KeyboardArrowDownIcon}
          >
            {isLoaded(tasklists) &&
              !isEmpty(tasklists) &&
              Object.keys(tasklists).map(taskListId => (
                <MenuItem value={taskListId} key={taskListId}>
                  {tasklists[taskListId].title}
                </MenuItem>
              ))}
            <MenuItem value="__new">New List</MenuItem>
          </Select>
        </div>
        <Spacer />
        {currentTaskListId !== '__new' && (
          <div>
            <IconButton
              onClick={() =>
                showModal('TASKLIST_THEME', {
                  id: currentTaskListId
                })
              }
              className={classes.actionButton}
            >
              <ColorLensIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
        )}
        {currentTaskListId !== '__new' && (
          <div>
            <IconButton
              onClick={() =>
                showModal('EDIT_TASKLIST', {
                  id: currentTaskListId,
                  ...tasklists[currentTaskListId]
                })
              }
              className={classes.actionButton}
            >
              <EditIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
        )}
      </div>

      <TaskList
        taskListId={currentTaskListId}
        tasklists={tasklists}
        loaded={isLoaded(tasklists)}
      />
      <Divider />
      <AddTask taskListId={currentTaskListId} />
    </div>
  );
};

export default compose(
  withUIConsumer,
  firebaseConnect((props, store) => [
    {
      path: 'tasklists',
      queryParams: [
        `orderByChild=createdBy`,
        `equalTo=${store.getState().firebase.auth.uid}`
      ]
    }
  ]),
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
