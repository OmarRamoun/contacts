import type {RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {ContactItem} from './contact';

type RootStackParamList = {
  Home: undefined;
  Info: {
    id: ContactItem['id'];
  };
  Form:
    | {
        type: 'add';
      }
    | {
        type: 'edit';
        id: ContactItem['id'];
      };
  Settings: undefined;
};

type ViewNavigationProps<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;
type RouteNavigationProps<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

export type {RootStackParamList, ViewNavigationProps, RouteNavigationProps};
