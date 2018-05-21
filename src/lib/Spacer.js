import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  grow: {
    flexGrow: 1
  }
};
const Spacer = ({ classes }) => <div className={classes.grow} />;

export default withStyles(styles)(Spacer);
