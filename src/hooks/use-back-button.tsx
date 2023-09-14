import {useEffect} from 'react';
import {BackHandler} from 'react-native';

const useBackButton = (handler: () => boolean | null | undefined) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
};

export {useBackButton};
