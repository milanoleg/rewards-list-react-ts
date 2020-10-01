import * as React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { ROUTES } from 'constants/routes';

import Rewards from 'Pages/Rewards';
import RewardEdit from 'Pages/RewardEdit';

const Routes: React.FC = () => (
  <Switch>
    <Redirect from="/" to={`${ROUTES.REWARDS}`} exact />
    <Route path={ROUTES.REWARDS} component={Rewards} />
    <Route path={`${ROUTES.REWARD_EDIT}/:rewardId`} component={RewardEdit} />
  </Switch>
);

export default Routes;
