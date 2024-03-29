import React, { Component } from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';

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

class EditTask extends Component {
  state = {
    open: true,
    id: this.props.id || null,
    title: this.props.title || '',
    details: this.props.details || '',
    done: this.props.done || false
  };

  handleClose = () => this.setState({ open: false }, this.props.handleClose);

  handleChange = field => e => this.setState({ [field]: e.target.value });

  save = () => {
    const { id, title, details, done } = this.state;
    const { firebase, taskListId } = this.props;
    if (!id) {
      firebase
        .push(`tasklists/${taskListId}/tasks`, {
          title,
          details,
          done,
          createdAt: Date.now()
        })
        .then(() => this.handleClose());
    } else {
      firebase
        .update(`tasklists/${taskListId}/tasks/${id}`, {
          title,
          details,
          updatedAt: Date.now()
        })
        .then(() => this.handleClose());
    }
  };

  remove = () => {
    const { id } = this.state;
    const { firebase, taskListId } = this.props;
    firebase
      .remove(`tasklists/${taskListId}/tasks/${id}`)
      .then(() => this.handleClose());
  };

  render() {
    const { id, open, title, details } = this.state;
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
            <IconButton aria-label="Back" onClick={this.handleClose}>
              <ArrowBackIcon />
            </IconButton>
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
            <Input
              placeholder="Add details"
              multiline
              fullWidth
              rows={3}
              value={details}
              onChange={this.handleChange('details')}
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

export default compose(withStyles(styles), firebaseConnect())(EditTask);
