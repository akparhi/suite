import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import { withUIConsumer } from 'providers/ui';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    borderRadius: '0 0 4px 4px',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: 'wrap'
  }
});

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.email}
      selected={isHighlighted}
      component="div"
      style={{
        display: 'flex',
        height: 'unset'
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src={suggestion.avatarUrl}
        style={{
          margin: '2px 8px'
        }}
      />
      <div>
        <Typography>{suggestion.displayName}</Typography>
        <Typography variant="caption">{suggestion.email}</Typography>
      </div>
    </MenuItem>
  );
}

class UserAutoFill extends Component {
  handleInputChange = event =>
    this.props.ctx.actions.changeUserSearchValue(event.target.value);

  handleChange = item => {
    this.props.onChange(item);
    this.props.ctx.actions.changeUserSearchValue('');
  };

  render() {
    const { classes, users, selectedItem } = this.props;
    const suggestions = [];
    if (isLoaded(users) && !isEmpty(users)) {
      Object.keys(users).forEach(uid => {
        const { displayName, avatarUrl, email } = users[uid];
        suggestions.push({
          uid,
          displayName,
          avatarUrl,
          email
        });
      });
    }

    return (
      <Downshift onChange={this.handleChange} selectedItem={selectedItem}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: 'Search users',
                id: 'integration-downshift-simple',
                onChange: this.handleInputChange
              })
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {suggestions.map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.email }),
                    highlightedIndex,
                    selectedItem
                  })
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

export default compose(
  withUIConsumer,
  firebaseConnect(({ ctx }, store) => {
    // do something with route params here
    // like change the query if you wanna fetch shared lists
    return [
      {
        path: 'users',
        queryParams: [
          'orderByChild=email',
          `startAt=${ctx.state.userSearchValue}`,
          'limitToFirst=1'
        ]
      }
    ];
  }),
  connect(({ firebase: { data } }) => ({
    users: data.users
  })),
  withStyles(styles)
)(UserAutoFill);
