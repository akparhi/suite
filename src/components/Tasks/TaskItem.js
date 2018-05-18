import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import { showModal } from 'actions/modal';

const styles = {
  container: {
    height: 68
  },
  body: {
    height: 67,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    zIndex: 1,
    '&:hover': {
      zIndex: 2,
      boxShadow:
        '0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
    }
  },
  bodyContent: {
    display: 'flex',
    alignItems: 'center'
  },
  complete: {
    color: '#34a853'
  },
  incomplete: {},
  task: {
    marginLeft: 12
  }
};

const TaskItem = ({
  classes,
  firebase,
  uid,
  showModal,
  task: { id, title, details, done }
}) => {
  const toggleStatus = done => () =>
    firebase.update(`tasks/${uid}/${id}`, { done });

  return (
    <div className={classes.container}>
      <Paper className={classes.body} elevation={0}>
        <div className={classes.bodyContent}>
          {done ? (
            <Tooltip id="tooltip-icon" title="Mark incomplete">
              <IconButton onClick={toggleStatus(false)}>
                <CheckCircleIcon className={classes.complete} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip id="tooltip-icon" title="Mark complete">
              <IconButton onClick={toggleStatus(true)}>
                <RadioButtonUncheckedIcon />
              </IconButton>
            </Tooltip>
          )}

          <div className={classes.task}>
            <Typography variant="body1">{title}</Typography>
            {details && (
              <Typography variant="caption" gutterBottom>
                {details.length > 77 ? `${details.substr(0, 77)}..` : details}
              </Typography>
            )}
          </div>
        </div>

        <div>
          <Tooltip id="tooltip-icon" title="Edit details">
            <IconButton
              onClick={() =>
                showModal('EDIT_TASK', { id, title, details, done })
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>

      <Divider />
    </div>
  );
};

export default compose(
  withStyles(styles),
  connect(null, { showModal }),
  firebaseConnect()
)(TaskItem);
