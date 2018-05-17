import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import Loadable from 'packages/Loadable';

const Home = Loadable(() => import('components/Home'));
const Tasks = Loadable(() => import('components/Tasks'));

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/tasks" component={Tasks} />
  </Switch>
);

export default AppRoutes;
