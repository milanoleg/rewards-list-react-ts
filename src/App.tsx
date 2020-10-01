import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Routes from 'routes/routes';
import store, { history } from 'store';

import './App.css';

const App: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#26A1F0',
        contrastText: '#ffffff'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
