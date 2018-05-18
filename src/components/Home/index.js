import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Link from 'react-router-dom/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// import SettingsIcon from '@material-ui/icons/Settings';
import TodayIcon from '@material-ui/icons/Today';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '48px 40px'
  },
  homeHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32
  },
  actionButton: {
    marginBottom: '0.35em',
    borderRadius: 100,
    color: '#5f6368'
  },
  root: {
    flexGrow: 1
  },
  paper: {
    width: '100%',
    height: 140,
    borderRadius: 8
  },
  paperContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  appTitle: {
    color: '#5f6368'
  },
  tasksLogo: {
    fontSize: 72,
    color: '#4285f4'
  },
  otherLogo: {
    fontSize: 72,
    color: '#34a853'
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center'
  }
};

const TasksLink = props => <Link to="/tasks" {...props} />;
const TasksButton = props => <Button component={TasksLink} {...props} />;

const Home = ({ classes, firebase }) => {
  return (
    <div className={classes.container}>
      <div className={classes.homeHeader}>
        <Typography variant="display1" gutterBottom>
          Home
        </Typography>
        <div className={classes.actionButtons}>
          {/* <div>
            <Button aria-label="Settings Link" className={classes.actionButton}>
              <SettingsIcon />
            </Button>
          </div> */}
          <div>
            <Button
              color="secondary"
              className={classes.actionButton}
              onClick={() => firebase.logout()}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <Grid container className={classes.root} spacing={24}>
        <Grid item xs={6}>
          <Paper component={TasksButton} className={classes.paper}>
            <div className={classes.paperContent}>
              <TodayIcon className={classes.tasksLogo} />
              <Typography
                variant="subheading"
                gutterBottom
                align="center"
                className={classes.appTitle}
              >
                My Tasks
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper component={Button} className={classes.paper}>
            <div className={classes.paperContent}>
              <CheckCircleIcon className={classes.otherLogo} />
              <Typography
                variant="subheading"
                gutterBottom
                align="center"
                className={classes.appTitle}
              >
                Some App
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default compose(firebaseConnect(), withStyles(styles))(Home);
