import {Platform} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface State {
  [key: string]: any;
}

const getItem = async (key: string): Promise<State | undefined> => {
  if (Platform.OS === 'web') return undefined;

  const savedStateString = await AsyncStorage.getItem(key);
  return savedStateString ? JSON.parse(savedStateString) : undefined;
};

const setItem = async (key: string, value: any): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export {getItem, setItem};
