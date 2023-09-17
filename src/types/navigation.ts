import type {RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Info: {
    id: number;
  };
  Form: undefined;
};

type ViewNavigationProps<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;
type RouteNavigationProps<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

export type {RootStackParamList, ViewNavigationProps, RouteNavigationProps};
