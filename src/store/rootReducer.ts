import { CombinedState, combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { rewardsReducer } from 'store/rewards/reducer';
import { IStore } from './types';

const reducers = (history: History): Reducer<CombinedState<IStore>> =>
  combineReducers({
    router: connectRouter(history),
    rewards: rewardsReducer
  });

export default reducers;
