import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {ActionSheetContainer, ModalContainer, SafeArea, StatusBar, ToastContainer} from '@components';
import {persistor, store} from '@state/store';
import {ThemeProvider} from '@styles';

import {AppStack} from './stacks/app';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <AppInner />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const AppInner = () => (
  <ModalContainer displayProps={{noPositionTop: true}}>
    <ActionSheetContainer>
      <ToastContainer>
        <SafeArea>
          <StatusBar showHideTransition="slide" animated />

          <AppStack />
        </SafeArea>
      </ToastContainer>
    </ActionSheetContainer>
  </ModalContainer>
);

export {App};
