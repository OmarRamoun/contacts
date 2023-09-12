import React from 'react';

/* import {SafeAreaProvider, useSafeArea} from 'react-native-safe-area-context'; */

import {ModalContainer, ToastContainer, ActionSheetContainer} from '@components';
import {HomeView} from '@screens';
import {ThemeProvider} from '@styles';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

const AppInner = () => (
  <ModalContainer displayProps={{noPositionTop: true}}>
    <ActionSheetContainer>
      <ToastContainer>
        <HomeView />
      </ToastContainer>
    </ActionSheetContainer>
  </ModalContainer>
);

export {App};
