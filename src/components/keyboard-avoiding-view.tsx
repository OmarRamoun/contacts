// TODO: implement using KeyboardAvoidingView @ https://reactnative.dev/docs/keyboardavoidingview
import React, {useEffect, useCallback, useRef} from 'react';
import type {KeyboardEvent, ViewStyle} from 'react-native';
import {Keyboard, Animated, ScrollView} from 'react-native';

interface KeyboardAvoidingViewProps {
  children: React.ReactNode;
  bottomInset?: number;
  onShow?: (height: number, duration: number) => void;
  onHide?: (duration: number) => void;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

const KeyboardAvoidingView = ({
  children,
  bottomInset = 0,
  onShow,
  onHide,
  style = {},
  contentContainerStyle = {},
}: KeyboardAvoidingViewProps) => {
  const layoutPaddingRef = useRef<Animated.Value>(new Animated.Value(bottomInset));

  const onKeyboardShow = useCallback(
    (event: KeyboardEvent) => {
      Animated.timing(layoutPaddingRef.current, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
        useNativeDriver: false,
      }).start();

      if (onShow) onShow(event.endCoordinates.height, event.duration);
    },
    [onShow],
  );

  const onKeyboardHide = useCallback(
    (event: KeyboardEvent) => {
      Animated.timing(layoutPaddingRef.current, {
        duration: event.duration,
        toValue: bottomInset,
        useNativeDriver: false,
      }).start();

      if (onHide) onHide(event.duration);
    },
    [onHide, bottomInset],
  );

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
    const hideListener = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [onKeyboardHide, onKeyboardShow]);

  return (
    <Animated.View style={{...style, flex: 1, paddingBottom: layoutPaddingRef.current}}>
      <ScrollView contentContainerStyle={{flexGrow: 1, ...contentContainerStyle}}>{children}</ScrollView>
    </Animated.View>
  );
};

export {KeyboardAvoidingView};
