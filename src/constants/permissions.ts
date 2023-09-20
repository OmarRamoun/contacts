import type {Permission} from 'react-native';
import {PermissionsAndroid} from 'react-native';

type PermissionType = {
  [key: string]: Permission;
};

const ANDROID: PermissionType = {
  camera: PermissionsAndroid.PERMISSIONS.CAMERA,
  contactsRead: PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  contactsWrite: PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
};

const CONTACTS_WRITE_PERM_DETAILS = {
  title: 'Contacts Write Permission',
  message: 'This app would like to edit your contacts.',
  buttonNeutral: 'Ask Me Later',
  buttonNegative: 'Cancel',
  buttonPositive: 'OK',
};

const CONTACTS_READ_PERM_DETAILS = {
  title: 'Contacts Read Permission',
  message: 'This app would like to import your contacts.',
  buttonNeutral: 'Ask Me Later',
  buttonNegative: 'Cancel',
  buttonPositive: 'OK',
};

export type {PermissionType};
export {ANDROID, CONTACTS_WRITE_PERM_DETAILS, CONTACTS_READ_PERM_DETAILS};
