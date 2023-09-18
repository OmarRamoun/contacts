import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {FormView, HomeContextProvider, HomeView, InfoView, SettingsView} from '@screens';
import {theme} from '@styles';

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <HomeContextProvider>
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
        <Stack.Screen name="Settings" component={SettingsView} />
      </Stack.Navigator>
    </NavigationContainer>
  </HomeContextProvider>
);

export {AppStack};
