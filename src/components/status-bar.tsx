import React from 'react';
import {StatusBar as RSB} from 'react-native';

import {theme} from '@styles';

interface StatusBarProps {
  hidden?: boolean;
  animated?: boolean;
  backgroundColor?: string;
  barStyle?: 'default' | 'dark-content' | 'light-content';
  showHideTransition?: 'fade' | 'slide' | 'none';
}

const StatusBar = ({
  hidden = false,
  animated = false,
  backgroundColor = theme.primaryColor.default,
  barStyle = 'default',
  showHideTransition = 'none',
}: StatusBarProps) => (
  <RSB
    hidden={hidden}
    animated={animated}
    backgroundColor={backgroundColor}
    barStyle={barStyle}
    showHideTransition={showHideTransition}
  />
);

export {StatusBar};
