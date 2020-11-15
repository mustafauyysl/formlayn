import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './redux/reducers/configureStore';
import MainNavigator from './navigation/MainNavigator';

const store = configureStore();

function App() {
  return(
    <Provider store={store}>
       <MainNavigator />
    </Provider>
  )
}

export default App;
