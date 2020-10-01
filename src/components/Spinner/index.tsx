import { makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  loader: {
    display: 'flex',
    height: 'calc(100vh - 160px)',
    width: '100%',
    'justify-content': 'center',
    'align-items': 'center'
  }
}));

interface IProps {
  size?: string;
}

const Spinner: React.FC<IProps> = (props: IProps): React.ReactElement => {
  const { size } = props;
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress size={size} />
    </div>
  );
};

Spinner.defaultProps = {
  size: '3rem'
};

export default Spinner;
