import React from 'react';
import {SafeAreaView} from 'react-native';
import AppNavigator from './src/navigation/AppNavigations';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/theme/theme';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider theme={theme}>
            <AppNavigator />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
