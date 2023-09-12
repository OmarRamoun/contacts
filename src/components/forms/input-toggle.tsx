import React, {useCallback, useState, useEffect} from 'react';

import styled from 'styled-components/native';

import {theme} from '@styles';

import {TouchableOpacity} from '../touchable-opacity';
import {useGenericTransition} from '../transition/transition-hook';
import {AnimatedBox} from '../transition/transition-shared';

import type {InputSharedProps} from './input-shared';
import {Label} from './label';

export interface InputToggleProps extends InputSharedProps<boolean> {
  /** Whether to reverse the label */
  reverse?: boolean;
}

const OuterContainer = styled(AnimatedBox)<{checked: boolean; disabled: boolean}>`
  position: relative;
  border-radius: ${(props) => props.theme.sizes.toggleHeight / 2}px;
  width: ${(props) => props.theme.sizes.toggleWidth}px;
  height: ${(props) => props.theme.sizes.toggleHeight}px;
  background-color: ${(props) => {
    // prettier-ignore
    if (props.disabled) {
      return props.theme.colors.inactiveGrey;
    }

    if (props.checked) {
      return props.theme.primaryColor.default;
    }

    return props.theme.colors.lightGrey1;
  }};
`;

const InnerCircle = styled(AnimatedBox)`
  position: absolute;
  border-radius: ${(props) => props.theme.radii.toggle}px;
  background-color: ${(props) => props.theme.colors.white};
  width: ${(props) => props.theme.sizes.toggleHeightInner}px;
  height: ${(props) => props.theme.sizes.toggleHeightInner}px;
  top: 4px;
  left: 4px;
`;

const InputToggle = ({
  title,
  disabled = false,
  initialValue,
  onValueChange,
  helpers,
  meta,
  error,
  errorMessage,
  reverse,
  delegateInteraction,
  labelFlexProps = {},
  labelTextStyle,
  value,
}: InputToggleProps) => {
  const [checked, setChecked] = useState<boolean>(!!initialValue);

  const {animatedValue: animatedBackgroundColour} = useGenericTransition<string>({
    from: theme.colors.grey,
    to: theme.primaryColor.default,
    state: checked,
  });

  const {animatedValue: animatedTranslateX} = useGenericTransition<number>({
    from: 0,
    to: 27,
    state: checked,
  });

  const onToggleChecked = useCallback(async () => {
    if (onValueChange) onValueChange(!checked);

    if (helpers) {
      if (meta && !meta.touched) await helpers.setTouched(true);
      await helpers.setValue(!checked);
    }

    setChecked(!checked);
  }, [checked, setChecked, onValueChange, meta]);

  useEffect(() => {
    if (value !== undefined) setChecked(value);
  }, [value]);

  return (
    <Label
      flexDirection={reverse ? 'row-reverse' : 'row'}
      alignItems="center"
      justifyContent="space-between"
      title={title}
      error={error}
      errorMessage={errorMessage}
      onPress={delegateInteraction || disabled ? undefined : onToggleChecked}
      textStyle={labelTextStyle}
      {...labelFlexProps}>
      <TouchableOpacity
        onPress={delegateInteraction || title || disabled ? undefined : onToggleChecked}
        activeOpacity={0.5}>
        <OuterContainer checked={checked} style={animatedBackgroundColour} pointerEvents="none" disabled={disabled}>
          <InnerCircle style={{transform: [{translateX: animatedTranslateX}]}} />
        </OuterContainer>
      </TouchableOpacity>
    </Label>
  );
};

export {InputToggle};
