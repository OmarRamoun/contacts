/*
 * InputField
 *
 * InputField = InputText + InputContainer ( all of them are exported )
 * */

import React from 'react';

import {InputContainer} from './input-container';
import type {InputContainerProps} from './input-container';
import {InputText} from './input-text';

export type InputFieldProps = Omit<InputContainerProps, 'children'>;

const InputField = ({
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
  rightSlot,
  leftSlot,
  inputTextProps = {},
  ...props
}: InputFieldProps) => (
  <>
    <InputContainer
      {...{
        disabled,
        error,
        errorMessage,
        title,
        labelFlexProps,
        labelTextStyle,
        onDarkBackground,
        leftSlot,
        ...props,
      }}>
      {({setFocused}) => (
        <InputText
          {...{
            disabled,
            numberOfLines,
            initialValue,
            value,
            onValueChange,
            onBlur,
            onFocus,
            rightSlot,
            setFocused,
            helpers,
            ...inputTextProps,
          }}
        />
      )}
    </InputContainer>
  </>
);

export {InputField};
