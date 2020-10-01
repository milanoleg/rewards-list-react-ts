import React from 'react';
import {
  NavLink,
  Switch,
  Route,
  Redirect,
  match,
  matchPath,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import joinURL from 'url-join';
import { makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { ROUTES } from '../../constants/routes';
import Grid from '@material-ui/core/Grid';
import { IReward } from '../../constants/general';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Spinner from 'components/Spinner';
import Reward from '../Reward';

export interface ITab {
  label: string;
  link: string;
  content: any;
}

interface IProps extends RouteComponentProps {
  tabs: ITab[];
  isLoading: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

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

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const TabsPanel = (props: IProps) => {
  const { location, tabs, isLoading } = props;
  const classes = useStyles();
  let defaultTabIndex: number = 0;
  const tabIndex: number = tabs.findIndex((tab: ITab) => {
    const matchRes: match<{ filterId: string }> | null = matchPath(location.pathname, {
      path: `${ROUTES.REWARDS}/:filterId`,
      exact: true
    });

    return tab.link === matchRes?.params.filterId;
  });

  if (tabIndex > 0) {
    defaultTabIndex = tabIndex;
  }

  const [value, setValue] = React.useState(defaultTabIndex);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {tabs.map(({ label, link }: ITab) => (
            <Tab
              key={link}
              to={joinURL(ROUTES.REWARDS, link)}
              component={NavLink}
              label={label}
              disabled={isLoading}
            />
          ))}
        </Tabs>
      </AppBar>
      <Switch>
        {tabs.map(({ content, link }, index) => (
          <Route
            key={link}
            path={joinURL(ROUTES.REWARDS, link)}
            render={() => (
              <TabPanel value={value} index={index}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Grid container justify="center">
                    <Grid item xs={8} lg={5}>
                      {content.map((reward: IReward) => (
                        <List key={reward.id}>
                          <ListItem>
                            <Reward reward={reward} />
                          </ListItem>
                        </List>
                      ))}
                    </Grid>
                  </Grid>
                )}
              </TabPanel>
            )}
          />
        ))}
        <Redirect from={`${ROUTES.REWARDS}`} to={`${ROUTES.REWARDS}/all`} exact />
      </Switch>
    </div>
  );
};

export default withRouter(TabsPanel);
