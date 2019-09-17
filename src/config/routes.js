// eslint-disable-next-line import/named
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ROUTES from '../constants/routeNames';

import BeginRun from '../screens/beginRun.screen';
import History from '../screens/history.screen';
import Home from '../screens/Home/home.screen';
import Running from '../screens/running.screen';

const AppNavigator = createStackNavigator(
  {
    [ROUTES.SCREENS.MAIN]: {
      screen: Home,
      navigationOptions: {
        header: () => null,
      },
    },
    BeginRun: {
      screen: BeginRun,
      navigationOptions: {
        header: () => null,
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        header: () => null,
      },
    },
    Running: {
      screen: Running,
      navigationOptions: {
        header: () => null,
      },
    },
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
