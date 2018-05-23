import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import Loadable from 'packages/Loadable';

const Tasks = Loadable(() => import('components/Tasks'));

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={Tasks} />
  </Switch>
);

export default AppRoutes;
