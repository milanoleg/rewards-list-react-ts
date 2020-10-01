import React from 'react';
import Grid from '@material-ui/core/Grid';
import debounce from 'lodash/debounce';

import { IReward, RewardStatus } from 'constants/general';
import TopAppBar from 'components/TopAppBar';
import TabsPanel from 'components/TabsPanel';

interface IProps {
  rewards: IReward[];
  isLoading: boolean;
  fetchRewards: () => void;
  fetchUsers: () => void;
}

interface IState {
  searchValue: string;
}

class Rewards extends React.Component<IProps, IState> {
  state: IState = {
    searchValue: ''
  };

  componentDidMount(): void {
    const { fetchRewards } = this.props;

    fetchRewards();
  }

  onSearchReward = (value: string) => {
    const searchValue = value.trim().toLowerCase();

    this.setState({
      searchValue
    });
  };

  debouncedRewardSearch = debounce(this.onSearchReward, 500);

  get getTabs() {
    const { rewards } = this.props;
    const { searchValue } = this.state;
    let filteredRewards = rewards;

    if (searchValue.length) {
      filteredRewards = rewards.filter(({ user, experience }: IReward) => {
        return (
          user.name.toLowerCase().includes(searchValue) ||
          experience.toLowerCase().includes(searchValue)
        );
      });
    }

    const newRewards = filteredRewards.filter(
      (reward: IReward) => reward.status === RewardStatus.new
    );
    const redeemedRewards = filteredRewards.filter(
      (reward: IReward) => reward.status === RewardStatus.redeemed
    );
    const completedRewards = filteredRewards.filter(
      (reward: IReward) => reward.status === RewardStatus.completed
    );
    const scheduledRewards = filteredRewards.filter(
      (reward: IReward) => reward.status === RewardStatus.scheduled
    );

    return [
      {
        label: 'All',
        link: 'all',
        content: filteredRewards
      },
      {
        label: 'New',
        link: RewardStatus.new,
        content: newRewards
      },
      {
        label: 'Redeemed',
        link: RewardStatus.redeemed,
        content: redeemedRewards
      },
      {
        label: 'Completed',
        link: RewardStatus.completed,
        content: completedRewards
      },
      {
        label: 'Scheduled',
        link: RewardStatus.scheduled,
        content: scheduledRewards
      }
    ];
  }

  render() {
    const { isLoading } = this.props;
    return (
      <>
        <TopAppBar isEnableSearch onSearchInputChange={this.debouncedRewardSearch} />
        <Grid container>
          <Grid item xs={12}>
            <TabsPanel tabs={this.getTabs} isLoading={isLoading} />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Rewards;
