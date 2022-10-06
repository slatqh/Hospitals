import React from 'react';
import {SafeAreaView} from 'react-native';
import AppNavigator from './src/navigation/AppNavigations';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
