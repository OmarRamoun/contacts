import type {ViewStyle} from 'react-native';

import type {DefaultTheme} from 'styled-components/native';
import type {PaddingProps, BorderProps, MarginProps} from 'styled-system';

import {theme} from '@styles';

import type {IconList, iconSizeMap} from '../icon';

export const textStyleMap: {[key: string]: keyof DefaultTheme['textStyles']} = {
  sm: 'buttonSmall',
  md: 'buttonMedium',
  lg: 'buttonLarge',
};

export const buttonPaddingMap: {
  [key: string]: keyof DefaultTheme['button'];
} = {
  sm: 'buttonPaddingSmall',
  md: 'buttonPaddingMedium',
  lg: 'buttonPaddingLarge',
};

export const buttonHeightMap: {
  [key: string]: keyof DefaultTheme['sizes'];
} = {
  sm: 'buttonHeightSmall',
  md: 'buttonHeightMedium',
  lg: 'buttonHeightLarge',
};

export const buttonTypes: {[key: string]: ButtonStyleObject} = {
  primary: {
    alternateColor: theme.primaryColor.alt,
    backgroundColor: theme.primaryColor.default,
    textColor: 'white',
  },
  primaryDestructive: {
    alternateColor: 'redDarkened',
    backgroundColor: 'red',
    textColor: 'white',
  },
  primarySuccess: {
    alternateColor: 'greenDarkened',
    backgroundColor: 'green',
    textColor: 'white',
  },
  secondary: {
    alternateColor: 'grey',
    textColor: 'darkBlue',
    backgroundColor: 'lightGrey1',
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'solid',
    shouldLift: false,
  },
  trialButton: {
    alternateColor: 'redLightened',
    backgroundColor: 'redLightened',
    textColor: 'white',
  },
  tertiary: {
    textColor: 'darkBlue',
    shouldLift: false,
  },
  tertiaryDestructive: {
    textColor: 'red',
    shouldLift: false,
  },
  tertiaryDark: {
    textColor: 'white',
    shouldLift: false,
  },
  quickMessage: {
    textColor: 'darkBlue',
    style: {
      backgroundColor: theme.colors.lightGrey1,
      borderBottomWidth: 2,
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderColor: theme.colors.grey,
      borderStyle: 'solid',
    },
    shouldLift: true,
  },
  close: {
    alternateColor: 'redDarkened',
    textColor: 'white',
    backgroundColor: 'red',
  },
};

export const disabledButtonTypes: {[key: string]: ButtonStyleObject} = {
  primary: {
    ...buttonTypes.primary,
    alternateColor: 'blueDarkenedDisabled',
    backgroundColor: 'blueDisabled',
  },
  primarySuccess: {
    ...buttonTypes.primarySuccess,
    textColor: 'greenLightened',
  },
  primaryDestructive: {
    ...buttonTypes.primaryDestructive,
    textColor: 'redDarkened',
  },
  secondary: {
    ...buttonTypes.secondary,
    textColor: 'grey',
  },
  tertiary: {
    ...buttonTypes.tertiary,
    opacity: 0.3,
  },
  tertiaryDestructive: {
    ...buttonTypes.tertiaryDestructive,
    opacity: 0.3,
  },
  tertiaryDark: {
    ...buttonTypes.tertiaryDark,
    opacity: 0.3,
  },
  quickMessage: {
    ...buttonTypes.quickMessage,
    opacity: 0.3,
  },
  close: {
    alternateColor: 'redLightened',
    textColor: 'white',
    backgroundColor: 'redLightened',
  },
};

export const buttonHoverTypes: {[key: string]: ButtonStyleObject} = {
  primary: {
    backgroundColor: 'blueLightened',
  },
  primarySuccess: {
    backgroundColor: 'greenLightened',
  },
  primaryDestructive: {
    backgroundColor: 'redLightened',
  },
  secondary: {
    backgroundColor: 'grey',
  },
  trialButton: {
    backgroundColor: 'darkGrey',
  },
  tertiary: {
    opacity: 0.7,
  },
  tertiaryDestructive: {
    opacity: 0.7,
  },
  tertiaryDark: {
    opacity: 0.7,
  },
  quickMessage: {
    opacity: 0.7,
  },
  close: {
    opacity: 0.7,
  },
};

export type ButtonSizes = 'sm' | 'md' | 'lg';
export type ButtonTypes = keyof typeof buttonTypes;

export interface ButtonStyleObject extends BorderProps {
  opacity?: number;
  textColor?: keyof DefaultTheme['colors'];
  backgroundColor?: keyof DefaultTheme['colors'];
  alternateColor?: keyof DefaultTheme['colors'];
  shouldLift?: boolean;
  style?: ViewStyle;
}

export interface ButtonViewProps extends PaddingProps, MarginProps {
  buttonSize?: ButtonSizes;
  color?: keyof DefaultTheme['colors'];
  underline?: boolean;
  align?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
}

export interface ButtonInteractionInheritProps {
  hovered: boolean;
  pressed: boolean;
  to?: string;
}

export interface ButtonContentProps extends ButtonViewProps {
  children?: React.ReactNode;
  type?: ButtonTypes;
  depth?: number;
  icon?: IconList;
  iconColor?: keyof DefaultTheme['colors'];
  disabled?: boolean;
  loading?: boolean;
  overrideTextColor?: keyof DefaultTheme['colors'];
  overrideBackgroundColor?: keyof DefaultTheme['colors'];
  overrideTextStyle?: keyof DefaultTheme['textStyles'];
  onDarkBackground?: boolean;
  flexDirection?: 'row' | 'row-reverse';
  iconLeft?: boolean;
  overrideHorizontalPadding?: number;
  overrideVerticalPadding?: number;
  iconSizeOverride?: keyof typeof iconSizeMap;
  definedBorderColor?: keyof DefaultTheme['colors'];
}

export interface ButtonProps extends ButtonContentProps {
  children?: string | React.ReactNode;
  onPress?: () => void;
  to?: string;
  underline?: boolean;
  overrideHorizontalPadding?: number;
  overrideVerticalPadding?: number;
  iconSizeOverride?: keyof typeof iconSizeMap;
}
