import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { isLoaded } from 'react-redux-firebase';

import Loader from 'lib/Loader';
import PrivateRoute from 'packages/PrivateRoute';
import Loadable from 'packages/Loadable';

const Login = Loadable(() => import('components/Login'));
const Tasks = Loadable(() => import('components/Tasks'));

const Routes = ({ classes, auth }) => {
  if (!isLoaded(auth)) return <Loader />;

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute
        exact
        path="/*"
        component={Tasks}
        authenticated={!!auth && !!auth.uid}
      />
    </Switch>
  );
};

export default withRouter(
  compose(connect(({ firebase: { auth } }) => ({ auth })))(Routes)
);
