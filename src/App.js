import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { YellowBox } from 'react-native';
import { registerScreens } from './screens/registerScreens';
import { configureStore } from './store/configureStore';

YellowBox.ignoreWarnings(['unknown call: "relay:check"']);

const store = configureStore();
registerScreens(store, Provider);

const startApp = () => {
  const tabs = [
    {
      stack: {
        id: 'HOME_SCREEN',
        children: [
          {
            component: {
              name: 'app.HomeScreen'
            }
          }
        ],
        options: {
          bottomTab: {
            text: 'Home',
            testID: 'HOME_TAB',
            icon: require('./images/tab1.png')
          }
        }
      }
    },
    {
      stack: {
        children: [
          {
            component: {
              name: 'app.ProfileScreen'
            }
          }
        ],
        options: {
          bottomTab: {
            text: 'Profile',
            testID: 'PROFILE_TAB',
            icon: require('./images/tab2.png')
          }
        }
      }
    }
  ];
  return Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'ROOT',
        children: tabs
      }
    }
  });
};

const App = Navigation.events().registerAppLaunchedListener(() => startApp());

export default App;
