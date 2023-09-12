import React, {useState, useRef, useCallback} from 'react';
import type {TextInputProps, TextInput} from 'react-native';
import {Platform} from 'react-native';

import {theme as mainTheme} from '@styles';

import type {InputSharedProps, InputSharedSlotProps} from './input-shared';
import {StyledInputContainer, StyledTextInput} from './input-utils';
import {Label} from './label';

export interface InputTextProps extends InputSharedProps<string>, TextInputProps, InputSharedSlotProps {}

const InputText = ({
  disabled,
  error,
  errorMessage,
  title,
  helpers,
  onValueChange,
  leftSlot,
  rightSlot,
  initialValue,
  numberOfLines,
  labelFlexProps = {},
  labelTextStyle,
  onDarkBackground,
  value,
  onBlur,
  ...props
}: InputTextProps & {onSubmit?: () => void}) => {
  const field = useRef<TextInput | null>(null);
  const [focused, setFocused] = useState<boolean>(false);

  const onFieldFocus = useCallback(async () => {
    setFocused(true);
    await helpers?.setTouched(true);
  }, [setFocused]);

  const onFieldChange = useCallback(
    async (text: string) => {
      await helpers?.setValue(text);
      onValueChange?.(text);
    },
    [helpers, onValueChange],
  );

  const onFieldBlur = (e: any) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <Label
      title={title}
      error={error}
      errorMessage={errorMessage}
      textStyle={labelTextStyle}
      onDarkBackground={onDarkBackground}
      {...labelFlexProps}>
      <StyledInputContainer disabled={!!disabled} error={!!error} focused={!!focused}>
        {leftSlot ? leftSlot(focused, !!error, !!disabled) : null}

        <StyledTextInput
          editable={!disabled}
          onFocus={onFieldFocus}
          onChangeText={onFieldChange}
          textStyle="small"
          defaultValue={initialValue}
          multiline={numberOfLines ? numberOfLines > 1 : false}
          placeholderTextColor={mainTheme.colors.grey}
          style={{
            textAlignVertical: Platform.OS === 'android' && numberOfLines && numberOfLines > 1 ? 'top' : undefined,
            height: numberOfLines && numberOfLines > 1 ? mainTheme.sizes.inputHeight * numberOfLines : 'auto',
            width: '100%',
          }}
          ref={field}
          value={value || ''}
          {...props}
          onBlur={onFieldBlur}
          rightSlot={!!rightSlot}
        />

        {rightSlot ? rightSlot(focused, !!error, !!disabled) : null}
      </StyledInputContainer>
    </Label>
  );
};

export {InputText};
