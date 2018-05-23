import React, { Component } from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';

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
    padding: '16px 32px',
    minWidth: 320,
    maxWidth: 320
  },
  input: {
    marginBottom: 10
  }
});

class SignIn extends Component {
  state = {
    open: true,
    mode: this.props.mode || 'signin',
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleClose = () => this.setState({ open: false }, this.props.handleClose);

  handleChange = field => e => this.setState({ [field]: e.target.value });

  toggleMode = () =>
    this.setState({ mode: this.state.mode === 'signin' ? 'signup' : 'signin' });

  submit = theme => {
    const { mode, email, password, confirmPassword } = this.state;
    const { firebase } = this.props;
    if (
      mode === 'signup' &&
      email &&
      password &&
      password === confirmPassword
    ) {
      firebase.createUser({ email, password }).then(this.handleClose);
    }
    if (mode === 'signin' && password && email) {
      firebase.login({ email, password }).then(this.handleClose);
    }
  };

  render() {
    const { open, mode, email, password, confirmPassword } = this.state;
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
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </Typography>
          </div>
        </div>
        <Divider light />
        <div className={classes.body}>
          <Input
            placeholder="Email"
            fullWidth
            value={email}
            onChange={this.handleChange('email')}
            className={classes.input}
          />
          <Input
            placeholder="Password"
            fullWidth
            type="password"
            value={password}
            onChange={this.handleChange('password')}
            className={classes.input}
          />
          {mode === 'signup' && (
            <Input
              placeholder="Confirm password"
              fullWidth
              type="password"
              value={confirmPassword}
              onChange={this.handleChange('confirmPassword')}
              className={classes.input}
            />
          )}
          <Button
            variant="raised"
            color="primary"
            onClick={this.submit}
            fullWidth
            className={classes.input}
          >
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>

          <Button
            color="primary"
            onClick={this.toggleMode}
            fullWidth
            className={classes.input}
          >
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
      </Dialog>
    );
  }
}

export default compose(withStyles(styles), firebaseConnect())(SignIn);
