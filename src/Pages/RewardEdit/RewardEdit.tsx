import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import get from 'lodash/get';

import Spinner from 'components/Spinner';
import { IReward } from 'constants/general';
import TopAppBar from 'components/TopAppBar';
import validationSchema from './validationSchema';
import { ROUTES } from '../../constants/routes';

interface IProps extends RouteComponentProps<{ rewardId: string }>, WithStyles {
  rewards: IReward[];
  isLoading: boolean;
  fetchRewards: () => void;
  updateRewardData: (reward: IReward) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    },
    actions: {
      marginTop: '30px',
    },
    submitButton: {
      marginLeft: '20px',
    },
    title: {
      marginBottom: '30px'
    }
  });

export const RewardEdit: React.FC<IProps> = (props: IProps): React.ReactElement => {
  const { classes, rewards, match, isLoading, updateRewardData, history } = props;
  const editedReward: IReward =
    rewards.find((reward: IReward) => reward.id === +match.params.rewardId) || ({} as IReward);
  const { id, status, experience, date } = editedReward;
  const userName = get(editedReward, 'user.name', '');
  const userId = get(editedReward, 'user.id', 1);

  const initialValues = {
    name: userName,
    experience,
    status,
    date: date || new Date()
  };

  const onSubmit = ({ name, experience, status, date }: any) => {
    const payload: IReward = {
      id,
      user: {
        id: userId,
        name
      },
      experience,
      status,
      date
    };
    updateRewardData(payload);
    history.push(ROUTES.REWARDS);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const nameProps = formik.getFieldProps('name');
  const experienceProps = formik.getFieldProps('experience');
  const statusProps = formik.getFieldProps('status');
  const dateProps = formik.getFieldProps('date');

  return (
    <>
      <TopAppBar isEnableSearch={false} onSearchInputChange={() => {}} />
      <Box p={3}>
        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit} className={classes.root}>
            <Typography variant="h4" component="h3" className={classes.title}>
              {`Edit Reward for ${userName}:`}
            </Typography>
            <Grid container justify="center">
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Grid item>
                    <TextField
                      id="name"
                      label="User Name"
                      variant="outlined"
                      error={!!(formik.touched.name && formik.errors.name)}
                      helperText={formik.errors.name}
                      required
                      {...nameProps}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Grid item>
                    <TextField
                      id="experience"
                      label="Experience"
                      variant="outlined"
                      error={!!(formik.touched.experience && formik.errors.experience)}
                      helperText={formik.errors.experience}
                      required
                      {...experienceProps}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Grid item>
                    <TextField
                      id="status"
                      label="Status"
                      variant="outlined"
                      error={!!(formik.touched.status && formik.errors.status)}
                      helperText={formik.errors.status}
                      required
                      disabled
                      {...statusProps}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Grid item>
                    <TextField
                      id="date"
                      label="Date"
                      variant="outlined"
                      error={!!(formik.touched.date && formik.errors.date)}
                      helperText={formik.errors.date}
                      required
                      {...dateProps}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.actions}>
                <Grid container justify="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submitButton}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </>
  );
};

export default withStyles(styles)(RewardEdit);
