import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'react-router-dom/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import mars from 'assets/images/mars.jpg';

const HomeLink = props => <Link to="/" {...props} />;

const styles = {
  container: {
    minHeight: '100vh'
  },
  theme: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    height: 172,
    zIndex: -1,
    opacity: 1,
    backgroundImage: `linear-gradient(to right bottom, rgb(118, 94, 230), rgb(28, 159, 255)), url(${mars})`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'cover, 1280px',
    backgroundPosition: 'top',
    backgroundBlendMode: 'hard-light'
  },
  header: {
    display: 'flex',
    padding: '96px 16px 16px 16px'
  },
  homeButton: {
    color: '#fff'
  },
  title: {
    color: '#fff'
  }
};

const Tasks = ({ classes }) => {
  return (
    <div className={classes.container}>
      <div className={classes.theme} />
      <div className={classes.header}>
        <IconButton
          component={HomeLink}
          size="large"
          aria-label="Home Link"
          className={classes.homeButton}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="display1" gutterBottom className={classes.title}>
          Tasks
        </Typography>
      </div>
    </div>
  );
};

export default withStyles(styles)(Tasks);
