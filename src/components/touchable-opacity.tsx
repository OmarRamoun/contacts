import React from 'react';
import type {TouchableOpacityProps as TOProps} from 'react-native';
import {TouchableOpacity as TO} from 'react-native';

interface TouchableOpacityProps extends TOProps {
  children: React.ReactElement;
}

const TouchableOpacity = ({onPress, children, ...props}: TouchableOpacityProps) => {
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
