/*
 * InputText
 *
 * InputField = InputText + InputContainer ( all of them are exported )
 * */

import React, {useRef, useCallback, useEffect} from 'react';
import type {TextInputProps as TIProps, TextInput as TI} from 'react-native';
import {Platform, Keyboard} from 'react-native';

import {theme as mainTheme} from '@styles';

import type {InputSharedProps, InputSharedSlotProps} from '../input-shared';
import {StyledTextInput} from '../input-utils';

export interface InputTextProps
  extends InputSharedProps<string>,
    Omit<TIProps, 'onSubmitEditing'>,
    InputSharedSlotProps {
  onSubmit?: () => void;
  setFocused?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputText = ({
  disabled,
  numberOfLines,
  initialValue,
  value,
  onSubmit,
  onValueChange,
  onBlur,
  onFocus,
  setFocused,
  rightSlot,
  helpers,
  style,
  ...props
}: InputTextProps) => {
  const field = useRef<TI | null>(null);

  const onFieldFocus = useCallback(
    async (e: any) => {
      setFocused?.(true);
      onFocus?.(e);
      await helpers?.setTouched(true);
    },
    [setFocused],
  );

  const onFieldChange = useCallback(
    async (text: string) => {
      await helpers?.setValue(text);
      onValueChange?.(text);
    },
    [helpers, onValueChange],
  );

  const onFieldBlur = (e: any) => {
    setFocused?.(false);
    onBlur?.(e);
  };

  const blurTextInput = () => {
    if (field.current) {
      field.current.blur();
    }
  };

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      blurTextInput();
    });

    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <StyledTextInput
      ref={field}
      editable={!disabled}
      textStyle="small"
      defaultValue={initialValue}
      multiline={numberOfLines ? numberOfLines > 1 : false}
      placeholderTextColor={mainTheme.colors.grey}
      style={[
        {
          textAlignVertical: Platform.OS === 'android' && numberOfLines && numberOfLines > 1 ? 'top' : undefined,
          height: numberOfLines && numberOfLines > 1 ? mainTheme.sizes.inputHeight * numberOfLines : 'auto',
        },
        style,
      ]}
      value={value || ''}
      onBlur={onFieldBlur}
      onFocus={onFieldFocus}
      onChangeText={onFieldChange}
      onSubmitEditing={onSubmit}
      rightSlot={!!rightSlot}
      {...props}
    />
  );
};

export {InputText};
