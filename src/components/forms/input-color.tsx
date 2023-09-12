import React, {useState, useCallback, useEffect} from 'react';

import type {DefaultTheme} from 'styled-components/native';

import {ActionSheet, ActionSheetPosition} from '../action-sheet/action-sheet';
import {Flex} from '../flex';
import {Icon} from '../icon';
import {TouchableOpacity} from '../touchable-opacity';

import type {InputSharedProps} from './input-shared';
import {Label} from './label';

type ColorList = keyof DefaultTheme['colors'];

export interface InputColorProps extends InputSharedProps<ColorList | undefined> {
  /** List of available colors in the dropdown */
  colors?: ColorList[];

  /** The color to start assigned */
  fallbackColor?: ColorList;

  /** Whether to reverse the label or not */
  reverse?: boolean;

  /** Where the dropdown gets positioned */
  dropdownPosition?: ActionSheetPosition;
}

const DEFAULT_COLORS: ColorList[] = ['blue', 'purple', 'blueDeep', 'red', 'green', 'orange'];

const getPosition = (position?: ActionSheetPosition, reverse?: boolean) => {
  if (position !== undefined) return position;
  return reverse ? ActionSheetPosition.Left : ActionSheetPosition.Right;
};

const InputColor = ({
  title,
  colors = DEFAULT_COLORS,
  error,
  errorMessage,
  disabled,
  fallbackColor = 'grey',
  initialValue,
  reverse = true,
  labelFlexProps = {},
  delegateInteraction,
  dropdownPosition,
  helpers,
  value,
  onValueChange,
  labelTextStyle,
}: InputColorProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<ColorList | undefined>(initialValue);

  const onToggleDropdown = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const onSetColor = useCallback(
    async (color: ColorList) => {
      setOpen(false);
      setSelectedColor(color);

      if (onValueChange) onValueChange(color);

      if (helpers) {
        await helpers.setValue(color);
        await helpers.setTouched(true);
      }
    },
    [setSelectedColor, onValueChange],
  );

  useEffect(() => {
    if (value !== undefined) setSelectedColor(value);
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
      textStyle={labelTextStyle}
      {...labelFlexProps}>
      <ActionSheet
        visible={open}
        onClose={() => setOpen(false)}
        position={getPosition(dropdownPosition, reverse)}
        customContent={
          <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            {colors.map((c, idx) => (
              <TouchableOpacity onPress={() => onSetColor(c)} key={`color-${c.toString()}-${idx}`}>
                <Icon name="circle" color={c} />
              </TouchableOpacity>
            ))}
          </Flex>
        }>
        <TouchableOpacity onPress={(!delegateInteraction && onToggleDropdown) || undefined}>
          <Icon color={selectedColor || fallbackColor} name="circle" />
        </TouchableOpacity>
      </ActionSheet>
    </Label>
  );
};

export {InputColor};
