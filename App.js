import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import configureStore from './redux/reducers/configureStore';
import MainNavigator from './navigation/MainNavigator';
import SplashScreen from 'react-native-splash-screen';

const store = configureStore();

function App() {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

export default App;
