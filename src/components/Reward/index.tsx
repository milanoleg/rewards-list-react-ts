import * as React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { red, lightBlue } from '@material-ui/core/colors';

import { IReward } from 'constants/general';
import { formatDate } from 'utils';
import joinURL from 'url-join';
import { ROUTES } from '../../constants/routes';

interface IProps {
  reward: IReward;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    avatar: {
      backgroundColor: red[500]
    },
    status: {
      backgroundColor: lightBlue[50],
      borderRadius: '10px',
      padding: '5px 10px'
    },
    actions: {
      justifyContent: 'flex-end'
    }
  })
);

const Reward: React.FC<IProps> = (props: IProps): React.ReactElement => {
  const {
    reward: { id, user, experience, date, status }
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {user.name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <Typography variant="body2" component="p" className={classes.status}>
            {status}
          </Typography>
        }
        title={user.name}
        subheader={formatDate(date)}
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {experience}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          component={Link}
          to={joinURL(ROUTES.REWARD_EDIT, `${id}`)}
          color="primary"
          variant="outlined"
          size="small"
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Reward;
