import {Platform, Linking} from 'react-native';

const openURL = (url: string) => {
  if (Platform.OS === 'web') return window.open(url, '_blank');
  return Linking.openURL(url);
};

export {openURL};
