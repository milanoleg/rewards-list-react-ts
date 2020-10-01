import { rewardsApi, IRewardsAPI } from 'api/rewards';
import { IReward } from '../constants/general';

class ApiModel {
  rewardsApi: IRewardsAPI;

  constructor() {
    this.rewardsApi = rewardsApi;
  }

  getRewards() {
    return this.rewardsApi.fetchRewards();
  }

  updateReward(reward: IReward): Promise<IReward> {
    return this.rewardsApi.updateReward(reward);
  }
}

export default new ApiModel();
