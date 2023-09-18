/* eslint-disable indent */
import React, {useCallback, useEffect, useState} from 'react';

import styled from 'styled-components/native';

import {ButtonInteraction} from '../button/button-interaction';
import {Flex} from '../flex';
import {Icon} from '../icon';

import type {InputSharedProps} from './input-shared';
import {Label} from './label';

export interface InputCheckboxProps extends InputSharedProps<boolean> {
  /** Whether to reverse the label */
  reverse?: boolean;

  /** Whether the rendered checkbox is rounded */
  rounded?: boolean;

  /**
   * When set to false the 'tick' icon inside the InputCheckBox will not be visible
   * @default true
   */
  showInnerIcon?: boolean;
}

const getOpacity = (hovered: boolean, pressed: boolean) => {
  if (pressed) return 0.4;
  if (hovered) return 0.6;
  return 1;
};

const CheckboxContainer = styled(Flex)<{
  checked?: boolean;
  rounded?: boolean;
  pressed: boolean;
  hovered: boolean;
  disabled?: boolean;
}>`
  align-items: center;
  justify-content: center;
  width: ${(props) => props.theme.sizes.checkboxSize}px;
  height: ${(props) => props.theme.sizes.checkboxSize}px;
  border: 2px solid
    ${(props) => {
      if (props.disabled) {
        return props.theme.colors.inactiveGrey;
      }

      if (props.checked) {
        return props.theme.primaryColor.default;
      }

      return props.theme.colors.grey;
    }};
  border-radius: ${(props) => (props.rounded ? props.theme.sizes.checkboxSize / 2 : props.theme.radii.md)}px;
  background-color: ${(props) =>
    // prettier-ignore
    // eslint-disable-next-line
    props.disabled ? props.theme.colors.inactiveGrey
      : props.checked ? props.theme.primaryColor.default
        : 'transparent'};
  overflow: hidden;
  opacity: ${(props) => getOpacity(props.hovered, props.pressed)};
`;

const InputCheckbox = ({
  title,
  reverse = true,
  initialValue,
  disabled,
  rounded,
  onValueChange,
  helpers,
  meta,
  error,
  errorMessage,
  value,
  delegateInteraction = false,
  labelTextStyle,
  labelFlexProps = {},
  showInnerIcon = true,
}: InputCheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(!!initialValue);

  const onToggleChecked = useCallback(async () => {
    if (disabled) return;

    onValueChange?.(!checked);

    if (helpers) {
      if (meta && !meta.touched) await helpers.setTouched(true);
      await helpers.setValue(!checked);
    }

    setChecked(!checked);
  }, [checked, setChecked, onValueChange, meta]);

  useEffect(() => {
    if (typeof value !== 'undefined') setChecked(value);
  }, [value]);

  return (
    <Label
      flexDirection={reverse ? 'row-reverse' : 'row'}
      justifyContent="space-between"
      alignItems="center"
      title={title}
      error={error}
      errorMessage={errorMessage}
      disabled={disabled}
      onPress={!delegateInteraction ? onToggleChecked : undefined}
      textStyle={labelTextStyle}
      {...labelFlexProps}>
      <ButtonInteraction onPress={delegateInteraction || title ? undefined : onToggleChecked} disabled={disabled}>
        {({mouseProps, ...interactionProps}) => (
          <CheckboxContainer
            checked={checked || false}
            disabled={disabled}
            rounded={rounded || false}
            {...mouseProps}
            {...interactionProps}>
            {checked && showInnerIcon && <Icon name="tick" color="white" />}
          </CheckboxContainer>
        )}
      </ButtonInteraction>
    </Label>
  );
};

export {InputCheckbox, CheckboxContainer};
