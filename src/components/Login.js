import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Redirect from 'react-router-dom/Redirect';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TodayIcon from '@material-ui/icons/Today';

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    fontSize: 64,
    color: '#4285f4',
    margin: 24
  },
  title: {
    marginBottom: 48
  },
  subtitle: {
    marginBottom: 24
  },
  button: {
    margin: 8
  }
};

export const LoginPage = ({ firebase, auth, location, classes }) => {
  if (!isEmpty(auth)) {
    return (
      <Redirect
        to={
          location && location.state && location.state.from
            ? location.state.from.pathname
            : '/'
        }
      />
    );
  }
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <TodayIcon className={classes.logo} />
        <Typography variant="display2" gutterBottom className={classes.title}>
          A Suite
        </Typography>

        <Typography
          variant="subheading"
          gutterBottom
          align="center"
          className={classes.subtitle}
        >
          From work to play, A Suite is the easiest way to get stuff done, every
          day.
        </Typography>
        <Button
          variant="raised"
          size="large"
          color="primary"
          className={classes.button}
          onClick={() =>
            firebase.login({ provider: 'google', type: 'redirect' })
          }
        >
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth })),
  withStyles(styles)
)(LoginPage);
