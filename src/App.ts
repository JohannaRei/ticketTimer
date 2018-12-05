import React from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import registerScreens from './Screens/registerScreens';
import configureStore from './store/configureStore';
import { iconsMap, iconsLoaded } from './utils/AppIcons';

export interface Props {}

const store = configureStore();
registerScreens(store, Provider);

export default class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    iconsLoaded.then(() => this.startApp());
  }

  startApp() {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'app.MainScreen',
                      passProps: {
                        text: 'This is tab 1'
                      }
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    text: 'Home',
                    icon: require('./images/tab1.png'),
                    testID: 'TAB_1'
                  }
                }
              }
            },
            {
              component: {
                name: 'app.StatsScreen',
                passProps: {
                  text: 'This is tab 2'
                },
                options: {
                  bottomTab: {
                    text: 'Stats',
                    icon: require('./images/tab2.png'),
                    testID: 'TAB_2'
                  }
                }
              }
            }
          ]
        }
      }
    });
  }
}
