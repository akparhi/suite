import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router-dom/Router';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import withStyles from '@material-ui/core/styles/withStyles';
import store, { history } from './store';
import theme, { globalStyles } from 'utils/theme';
import Routes from 'components/Routes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <Routes />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default withStyles(globalStyles)(App);
