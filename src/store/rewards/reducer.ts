import { IReward } from 'constants/general';
import { RewardsAction } from './actions';
import { RewardsActionTypes as types } from './types';

export interface IRewardsState {
  rewards: IReward[];
  isLoading: boolean;
  error: string;
}

const defaultState: IRewardsState = {
  rewards: [],
  isLoading: false,
  error: ''
};

export const rewardsReducer = (state = defaultState, action: RewardsAction): IRewardsState => {
  switch (action.type) {
    case types.GET_REWARDS:
      return {
        ...state,
        isLoading: true
      };
    case types.GET_REWARDS_SUCCESS:
      return {
        ...state,
        rewards: action.rewards,
        isLoading: false
      };
    case types.GET_REWARDS_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return {
        ...state
      };
  }
};
