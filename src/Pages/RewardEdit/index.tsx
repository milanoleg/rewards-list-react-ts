import { Action, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { IStore } from 'store/types';
import { getRewardsState, updateRewardData } from 'store/rewards';
import { IReward } from 'constants/general';
import RewardEdit from './RewardEdit';

export interface IMapStateToProps {
  rewards: IReward[];
  isLoading: boolean;
}

export interface IMapDispatchToProps {
  updateRewardData: (reward: IReward) => (dispatch: Dispatch<Action>) => Promise<void>;
}

const mapStateToProps = (state: IStore): IMapStateToProps => {
  const rewardsState = getRewardsState(state);

  return {
    rewards: rewardsState.rewards,
    isLoading: rewardsState.isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IMapDispatchToProps =>
  bindActionCreators(
    {
      updateRewardData
    },
    dispatch
  );

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(RewardEdit);
