import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }
};
const Loader = ({ classes }) => (
  <div className={classes.container}>
    <CircularProgress />
  </div>
);

export default withStyles(styles)(Loader);
