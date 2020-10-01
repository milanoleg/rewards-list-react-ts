import { RouterState } from 'connected-react-router';
import { LocationState } from 'history';

import { IRewardsState } from './rewards/reducer';

export interface IStore {
  router: RouterState<LocationState>;
  rewards: IRewardsState;
}
