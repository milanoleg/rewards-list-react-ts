import { Action, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IStore } from 'store/types';
import { getRewardsState, fetchRewards } from 'store/rewards';
import { IReward } from 'constants/general';
import Rewards from './Rewards';

export interface IMapStateToProps {
  rewards: IReward[];
  isLoading: boolean;
}

export interface IMapDispatchToProps {
  fetchRewards: () => (dispatch: Dispatch<Action>) => Promise<void>;
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
      fetchRewards
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Rewards);
