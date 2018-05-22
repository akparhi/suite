import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import LensIcon from '@material-ui/icons/Lens';
import { themes } from 'utils/constants';

const styles = theme => ({
  paper: {
    boxShadow: theme.shadows[5],
    borderRadius: 16
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
    display: 'flex',
    padding: '16px 32px'
  },
  input: {
    marginBottom: 10
  },
  backgroundSelect: {
    '&:after': {
      borderBottom: 'none'
    }
  }
});

class EditTaskList extends Component {
  state = {
    open: true,
    id: this.props.id || null
  };

  handleClose = () => this.setState({ open: false }, this.props.handleClose);

  handleChange = field => e => this.setState({ [field]: e.target.value });

  update = theme => {
    const { id } = this.state;
    const { firebase } = this.props;

    firebase
      .update(`tasklists/${id}`, { theme, updatedAt: Date.now() })
      .then(() => this.handleClose());
  };

  render() {
    const { open } = this.state;
    const { classes } = this.props;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        BackdropProps={{
          invisible: true
        }}
        classes={{
          paper: classes.paper
        }}
      >
        <div className={classes.header}>
          <div className={classes.headerTitleContainer}>
            <IconButton aria-label="Back" onClick={this.handleClose}>
              <ArrowBackIcon />
            </IconButton>
            <Typography className={classes.headerTitle}>
              Select Theme
            </Typography>
          </div>
        </div>
        <Divider light />
        <div className={classes.body}>
          {Object.keys(themes).map((el, i) => (
            <div key={i}>
              <IconButton
                onClick={() => this.update(el)}
                className={classes.actionButton}
              >
                <LensIcon style={{ color: themes[el].split('), ')[1] }} />
              </IconButton>
            </div>
          ))}
        </div>
      </Dialog>
    );
  }
}

export default compose(
  withStyles(styles),
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({
    uid: auth.uid
  }))
)(EditTaskList);
