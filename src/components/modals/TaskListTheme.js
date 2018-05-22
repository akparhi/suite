import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import LensIcon from '@material-ui/icons/Lens';
import DoneIcon from '@material-ui/icons/Done';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { themes, thumbBackgrounds } from 'utils/constants';

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
    padding: '16px 32px'
  },
  theme: {
    display: 'flex'
  },
  input: {
    marginBottom: 10
  },
  background: {
    height: 40,
    width: 40,
    opacity: 1,
    margin: '0 4px',
    backgroundColor: 'unset',
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'cover, 40px',
    backgroundPosition: 'top',
    backgroundBlendMode: 'hard-light'
  }
});

const BackgroundButton = props => <Button {...props} />;

class EditTaskList extends Component {
  state = {
    open: true,
    id: this.props.id || null,
    theme: this.props.theme || 'blue',
    background: this.props.background || 'mars'
  };

  handleClose = () => this.setState({ open: false }, this.props.handleClose);

  handleChange = field => e => this.setState({ [field]: e.target.value });

  updateTheme = theme => {
    const { id } = this.state;
    const { firebase } = this.props;

    firebase
      .update(`tasklists/${id}`, { theme, updatedAt: Date.now() })
      .then(() => this.setState({ theme }));
  };

  updateBackground = background => {
    const { id } = this.state;
    const { firebase } = this.props;

    firebase
      .update(`tasklists/${id}`, { background, updatedAt: Date.now() })
      .then(() => this.setState({ background }));
  };

  render() {
    const { open, theme, background } = this.state;
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
          <div className={classes.theme}>
            {Object.keys(themes).map((el, i) => (
              <div key={i}>
                <IconButton
                  onClick={() => this.updateTheme(el)}
                  className={classes.actionButton}
                >
                  {el === theme ? (
                    <CheckCircleIcon
                      style={{ color: themes[el].split('), ')[1] }}
                    />
                  ) : (
                    <LensIcon style={{ color: themes[el].split('), ')[1] }} />
                  )}
                </IconButton>
              </div>
            ))}
          </div>
          <div className={classes.theme}>
            {Object.keys(thumbBackgrounds).map((el, i) => (
              <Paper
                key={i}
                component={BackgroundButton}
                onClick={() => this.updateBackground(el)}
                className={classes.background}
                style={{
                  backgroundImage: `linear-gradient(to right bottom, ${
                    themes[theme]
                  }), url(${thumbBackgrounds[el]})`
                }}
              >
                {background === el && <DoneIcon style={{ color: '#fff' }} />}
              </Paper>
            ))}
          </div>
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
