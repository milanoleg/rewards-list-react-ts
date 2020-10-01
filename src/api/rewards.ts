import { IReward } from 'constants/general';

export interface IRewardsAPI {
  fetchRewards: () => Promise<IReward[]>;
  updateReward: (reward: IReward) => Promise<IReward>;
}

class RewardsApi implements IRewardsAPI {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchRewards() {
    const response = await fetch(`${this.baseUrl}/rewards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();

    // Promise using just to make a little delay to show loader, to imitate a real request to API
    const rewards: IReward[] = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(responseJson as IReward[]);
      }, 600);
    });

    return rewards;
  }

  async updateReward(reward: IReward): Promise<IReward> {
    const response = await fetch(`${this.baseUrl}/rewards/${reward.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reward)
    });

    const responseJson = await response.json();

    return responseJson;
  }
}

export const rewardsApi = new RewardsApi('http://localhost:3001');
