import { Navigation } from 'react-native-navigation';
import App from './src/App';

Navigation.registerComponent(`app.home`, () => App);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'app.home'
      }
    }
  });
});
