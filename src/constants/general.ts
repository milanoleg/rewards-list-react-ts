export enum RewardStatus {
  new = 'new',
  redeemed = 'redeemed',
  completed = 'completed',
  scheduled = 'scheduled'
}

export interface IUser {
  id: number;
  name: string;
}

export interface IReward {
  id: number;
  user: IUser;
  experience: string;
  date: string;
  status: RewardStatus;
}
