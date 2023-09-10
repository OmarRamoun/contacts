import React from 'react';
import type {TouchableWithoutFeedbackProps} from 'react-native';
import {TouchableWithoutFeedback as TWF} from 'react-native';

interface OptionalTouchableWithoutFeedbackProps extends TouchableWithoutFeedbackProps {
  children: React.ReactElement;
}

const TouchableWithoutFeedback = ({onPress, children, ...props}: OptionalTouchableWithoutFeedbackProps) => {
  if (onPress) {
    return (
      <TWF onPress={onPress} {...props}>
        {children}
      </TWF>
    );
  }

  return children;
};

export {TouchableWithoutFeedback};
