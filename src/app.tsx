import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
/* import {SafeAreaProvider, useSafeArea} from 'react-native-safe-area-context'; */

import {ModalContainer, ToastContainer, ActionSheetContainer, SafeArea, StatusBar} from '@components';
import {HomeView, InfoView, FormView} from '@screens';
import {store} from '@state/store';
import {ThemeProvider, theme} from '@styles';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppInner />
      </Provider>
    </ThemeProvider>
  );
}

const Stack = createNativeStackNavigator();

const AppInner = () => (
  <ModalContainer displayProps={{noPositionTop: true}}>
    <ActionSheetContainer>
      <ToastContainer>
        <SafeArea>
          <StatusBar showHideTransition="slide" animated />

          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {backgroundColor: theme.primaryColor.default},
                headerTintColor: theme.colors.white,
                headerTitleAlign: 'center',
              }}>
              <Stack.Screen
                name="Home"
                component={HomeView}
                options={{
                  title: 'Contacts',
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />

              <Stack.Screen name="Info" component={InfoView} />

              <Stack.Screen name="Form" component={FormView} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeArea>
      </ToastContainer>
    </ActionSheetContainer>
  </ModalContainer>
);

export {App};
