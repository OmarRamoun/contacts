/*
 * InputContainer
 *
 * InputField = InputText + InputContainer ( all of them are exported )
 * */

import React, {useState} from 'react';
import type {TextInputProps as TIProps, ViewStyle} from 'react-native';

import type {FlexProps} from '../../flex';
import type {InputSharedProps, InputSharedSlotProps} from '../input-shared';
import {StyledInputContainer} from '../input-utils';
import {Label} from '../label';

import type {InputTextProps} from './input-text';

export interface InputContainerProps
  extends Omit<FlexProps, 'children'>,
    InputSharedProps<string>,
    InputSharedSlotProps {
  onSubmit?: () => void;
  children(props: InputTextProps): React.ReactNode;
  numberOfLines?: number;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  inputTextProps?: TIProps;
  style?: ViewStyle;
  onFocusStyle?: ViewStyle;
}

const InputContainer = ({
  disabled,
  numberOfLines,
  initialValue,
  value,
  error,
  errorMessage,
  title,
  helpers,
  onValueChange,
  labelFlexProps = {},
  labelTextStyle,
  onDarkBackground,
  onBlur,
  onFocus,
  children,
  leftSlot,
  rightSlot,
  inputTextProps = {},
  style,
  onFocusStyle,
  ...props
}: InputContainerProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <Label
      title={title}
      error={error}
      errorMessage={errorMessage}
      textStyle={labelTextStyle}
      onDarkBackground={onDarkBackground}
      {...labelFlexProps}>
      <StyledInputContainer
        disabled={!!disabled}
        error={!!error}
        focused={!!focused}
        style={[style, focused && onFocusStyle]}
        {...props}>
        {leftSlot ? leftSlot(focused, !!error, !!disabled) : null}

        {children({
          disabled,
          numberOfLines,
          initialValue,
          value,
          rightSlot,
          helpers,
          onValueChange,
          onBlur,
          onFocus,
          setFocused,
          ...inputTextProps,
        })}

        {rightSlot ? rightSlot(focused, !!error, !!disabled) : null}
      </StyledInputContainer>
    </Label>
  );
};

export {InputContainer};
