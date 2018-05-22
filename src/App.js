import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { UIProvider } from 'providers/ui';
import Router from 'react-router-dom/Router';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import withStyles from '@material-ui/core/styles/withStyles';
import store, { history } from './store';
import theme, { globalStyles } from 'utils/theme';
import Routes from 'components/Routes';
import Modal from 'components/modals';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <UIProvider>
            <MuiThemeProvider theme={theme}>
              <Routes />
              <Modal />
            </MuiThemeProvider>
          </UIProvider>
        </Router>
      </Provider>
    );
  }
}

export default withStyles(globalStyles)(App);
