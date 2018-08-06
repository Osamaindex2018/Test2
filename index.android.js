import { AppRegistry } from 'react-native';
import App from './App';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/Screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root:{
            component:{
                name:"SignUp"
            }
        }
    })
})