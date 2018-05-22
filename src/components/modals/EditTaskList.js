import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import { withUIConsumer } from 'providers/ui';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16
  },
  header: {
    height: 56,
    padding: '0 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitleContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 21,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  body: {
    padding: '24px 24px 16px 24px'
  },
  input: {
    marginBottom: 10
  },
  footer: {
    padding: '0 24px 12px 24px',
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const getModalStyle = () => ({
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%'
});

class EditTaskList extends Component {
  state = {
    open: true,
    id: this.props.id || null,
    title: this.props.title || ''
  };

  handleClose = () => this.setState({ open: false }, this.props.handleClose);

  handleChange = field => e => this.setState({ [field]: e.target.value });

  save = async () => {
    const { id, title } = this.state;
    const { firebase, uid, ctx } = this.props;

    if (!id) {
      const key = await firebase.push('tasklists', {
        title,
        createdBy: uid,
        createdAt: Date.now()
      }).key;
      ctx.actions.changeTaskListId(key);
      this.handleClose();
    } else {
      firebase
        .update(`tasklists/${id}`, { title, updatedAt: Date.now() })
        .then(() => this.handleClose());
    }
  };

  remove = () => {
    const { id } = this.state;
    const { firebase } = this.props;
    firebase.remove(`tasklists/${id}`).then(() => this.handleClose());
  };

  render() {
    const { id, open, title } = this.state;
    const { classes } = this.props;

    return (
      <Modal
        open={open}
        onClose={this.handleClose}
        BackdropProps={{
          invisible: true
        }}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <div className={classes.header}>
            <div className={classes.headerTitleContainer}>
              <IconButton aria-label="Back" onClick={this.handleClose}>
                <ArrowBackIcon />
              </IconButton>
              <Typography className={classes.headerTitle}>
                {id ? 'Edit List' : 'Add List'}
              </Typography>
            </div>
            {id && (
              <IconButton aria-label="Delete" onClick={this.remove}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
          <Divider light />
          <div className={classes.body}>
            <Input
              placeholder="Enter title"
              fullWidth
              value={title}
              onChange={this.handleChange('title')}
              className={classes.input}
            />
          </div>
          <div className={classes.footer}>
            <Button variant="raised" color="primary" onClick={this.save}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default compose(
  withStyles(styles),
  withUIConsumer,
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({
    uid: auth.uid
  }))
)(EditTaskList);
