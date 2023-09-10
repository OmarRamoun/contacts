import React from 'react';
import type {TouchableOpacityProps} from 'react-native';
import {TouchableOpacity as TO} from 'react-native';

interface OptionalTouchableOpacityProps extends TouchableOpacityProps {
  children: React.ReactElement;
}

const TouchableOpacity = ({onPress, children, ...props}: OptionalTouchableOpacityProps) => {
  if (onPress) {
    return (
      <TO onPress={onPress} {...props}>
        {children}
      </TO>
    );
  }

  return children;
};

export {TouchableOpacity};
