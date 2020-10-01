import { AnyAction, Dispatch } from 'redux';

import { IReward } from 'constants/general';
import api from 'models/api';
import { RewardsActionTypes as types } from './types';

export interface IGetRewards {
  type: types.GET_REWARDS;
}

export interface IGetRewardsSuccess {
  type: types.GET_REWARDS_SUCCESS;
  rewards: IReward[];
}

export interface IGetRewardsFail {
  type: types.GET_REWARDS_FAIL;
  error: string;
}

export const getRewards = (): IGetRewards => ({
  type: types.GET_REWARDS
});

export const getRewardsSuccess = (rewards: IReward[]): IGetRewardsSuccess => ({
  type: types.GET_REWARDS_SUCCESS,
  rewards
});

export const getRewardsFail = (error: string): IGetRewardsFail => ({
  type: types.GET_REWARDS_FAIL,
  error
});

export const fetchRewards = () => {
  return async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    dispatch(getRewards());

    try {
      const rewards = await api.getRewards();
      dispatch(getRewardsSuccess(rewards));
    } catch (error) {
      dispatch(getRewardsFail(error));
    }
  };
};

export type RewardsAction = IGetRewards | IGetRewardsSuccess | IGetRewardsFail;

export interface IUpdateReward {
  type: types.UPDATE_REWARD;
}

export interface IUpdateRewardSuccess {
  type: types.UPDATE_REWARD_SUCCESS;
  reward: IReward;
}

export interface IUpdateRewardFail {
  type: types.UPDATE_REWARD_FAIL;
  error: string;
}

export const updateReward = (): IUpdateReward => ({
  type: types.UPDATE_REWARD
});

export const updateRewardSuccess = (reward: IReward): IUpdateRewardSuccess => ({
  type: types.UPDATE_REWARD_SUCCESS,
  reward
});

export const updateRewardFail = (error: string): IUpdateRewardFail => ({
  type: types.UPDATE_REWARD_FAIL,
  error
});

export const updateRewardData = (reward: IReward) => {
  return async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    dispatch(updateReward());

    try {
      const updatedReward: IReward = await api.updateReward(reward);
      updateRewardSuccess(updatedReward);
    } catch (error) {
      dispatch(updateRewardFail(error));
    }
  };
};
