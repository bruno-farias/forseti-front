import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import Clients from '../pages/Clients';

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/" exact component={Clients} isPrivate />
  </Switch>
);
