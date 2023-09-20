import {PermissionsAndroid, Platform} from 'react-native';
import type {Permission} from 'react-native';

interface PermissionProps {
  title: string;
  message: string;
  buttonNeutral?: string;
  buttonNegative?: string;
  buttonPositive: string;
}

const getPermissions = async (
  permissionType: Permission,
  cb: () => void,
  {title, message, buttonNeutral, buttonNegative, buttonPositive}: PermissionProps,
) => {
  if (Platform.OS === 'android') {
    const permission = await PermissionsAndroid.request(permissionType, {
      title,
      message,
      buttonNeutral,
      buttonNegative,
      buttonPositive,
    });

    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      cb();
    }
  }
};

export {getPermissions};
