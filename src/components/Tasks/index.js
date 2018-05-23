import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import EditIcon from '@material-ui/icons/Edit';
import ColorLensIcon from '@material-ui/icons/ColorLens';

import { withUIConsumer } from 'providers/ui';
import { backgrounds, themes } from 'utils/constants';
import { showModal } from 'actions/modal';
import { resetStore } from 'actions/util';

import Loader from 'lib/Loader';
import Spacer from 'lib/Spacer';
import TaskList from 'components/Tasks/TaskList';
import AddTask from 'components/Tasks/AddTask';

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
  title: {
    color: '#fff',
    marginLeft: 14
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

const Tasks = ({
  classes,
  firebase,
  tasklists,
  ctx,
  showModal,
  resetStore
}) => {
  if (!isLoaded(tasklists)) {
    return <Loader />;
  }
  const { currentTaskListId } = ctx.state;
  const handleTaskListChange = ({ target: { value } }) => {
    if (value === '__new') {
      return showModal('EDIT_TASKLIST');
    }
    ctx.actions.changeTaskListId(value);
  };

  let background = 'mars',
    theme = 'blue';
  if (ctx.state.currentTaskListId !== '__new' && !isEmpty(tasklists)) {
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
        <div className={classes.title}>
          <Select
            value={currentTaskListId}
            className={classes.listSelect}
            onChange={handleTaskListChange}
            IconComponent={KeyboardArrowDownIcon}
          >
            {!isEmpty(tasklists) &&
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
                  id: currentTaskListId,
                  ...tasklists[currentTaskListId]
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
        <div>
          <IconButton
            onClick={() => {
              resetStore();
              firebase.logout();
              ctx.actions.changeTaskListId('__new');
            }}
            className={classes.actionButton}
          >
            <PowerSettingsNewIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>

      <TaskList taskListId={currentTaskListId} tasklists={tasklists} />
      <Divider />
      <AddTask taskListId={currentTaskListId} tasklists={tasklists} />
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
    { showModal, resetStore }
  ),
  withStyles(styles)
)(Tasks);
