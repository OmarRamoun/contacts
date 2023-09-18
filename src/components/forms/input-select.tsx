import React, {useState, useEffect} from 'react';

import type {iconMap} from '@assets';
import type {theme} from '@styles';
import {ensureArray} from '@utils/general';

import {ActionSheet} from '../action-sheet/action-sheet';
import {Flex} from '../flex';
import {Icon} from '../icon';
import {Spinner} from '../spinner/spinner';
import {TouchableWithoutFeedback} from '../touchable-without-feedback';
import {Typography} from '../typography';

import {InputSelectDropdown} from './input-select-dropdown';
import type {InputSharedProps, InputSharedSlotProps, SelectValue, SelectOptions} from './input-shared';
import {StyledInputContainer, getInputColor, getInitialSelectValue} from './input-utils';
import {Label} from './label';

export interface InputSelectProps extends InputSharedProps<SelectValue>, Pick<InputSharedSlotProps, 'leftSlot'> {
  /** The passed through options to populate */
  options: SelectOptions;

  /** Whether multiple can be selected */
  multiple?: boolean;

  /** The string to display when no value is selected */
  placeholder?: string;

  /** The max height of the dropdown */
  dropdownHeight?: number;

  /** Whether the current input is loading or not */
  loading?: boolean;

  /** Text style for the value label */
  valueTextStyle?: keyof typeof theme.textStyles;

  /** Text style for the placeholder label */
  placeholderTextStyle?: keyof typeof theme.textStyles;

  /** Text color for the placeholder label */
  placeholderTextColor?: keyof typeof theme.colors;

  /**
   * Icon displayed at the end of the InputSelect
   * @default 'down'
   */
  iconName?: keyof typeof iconMap;

  overrideBackdropColor?: string;
}

const displaySelected = (value: SelectValue, placeholder: string, options: SelectOptions) => {
  const values = ensureArray(value)
    .slice()
    .filter((el) => !!el);

  if (!values.length) return placeholder;

  return values.map((v) => options.find((opt) => opt.value === v)?.label || v).join(', ');
};

const InputSelect = ({
  title,
  options,
  initialValue,
  disabled = false,
  error = false,
  errorMessage,
  loading = false,
  leftSlot,
  placeholder = '–',
  dropdownHeight = 250,
  multiple,
  value,
  onValueChange,
  helpers,
  labelFlexProps = {},
  labelTextStyle,
  valueTextStyle = 'small',
  placeholderTextStyle = 'small',
  placeholderTextColor = 'black',
  overrideBackdropColor,
  iconName = 'down',
}: InputSelectProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<SelectValue>(
    getInitialSelectValue<SelectValue>(value || initialValue, multiple),
  );

  const hasSelection = ensureArray(inputValue).filter((el) => !!el).length > 0;

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onToggleOpen = () => {
    if (disabled || loading) return;
    setOpen(!open);
  };

  const onDropdownSelect = async (dropdownValue: string | number) => {
    if (disabled) return;

    if (helpers) await helpers.setTouched(true);

    if (!multiple) {
      setOpen(false);
      setInputValue(dropdownValue);

      if (helpers) await helpers.setValue(dropdownValue);
      if (onValueChange) onValueChange(dropdownValue);
    } else {
      const currValue = (inputValue ? ensureArray(inputValue) : [])
        .slice()
        .filter((v): v is string | number => v !== null);

      if (currValue.includes(dropdownValue)) currValue.splice(currValue.indexOf(dropdownValue), 1);
      else currValue.push(dropdownValue);

      setInputValue(currValue);

      if (helpers) await helpers.setValue(currValue);
      if (onValueChange) onValueChange(currValue);
    }
  };

  return (
    <Label title={title} error={error} errorMessage={errorMessage} textStyle={labelTextStyle} {...labelFlexProps}>
      <ActionSheet
        onClose={() => setOpen(false)}
        visible={open}
        overridePadding={{py: 2, px: 0}}
        overrideBackdropColor={overrideBackdropColor}
        customContent={
          <InputSelectDropdown
            maxHeight={dropdownHeight}
            options={options}
            value={inputValue}
            onSelect={onDropdownSelect}
            multiple={multiple}
          />
        }
        sheetWidth="100%">
        <TouchableWithoutFeedback onPress={onToggleOpen}>
          <StyledInputContainer focused={open} disabled={disabled} error={error}>
            {loading ? (
              <Flex px={2}>
                <Spinner size="md" color="grey" />
              </Flex>
            ) : (
              <>
                {leftSlot ? leftSlot(open, !!error, disabled) : null}

                <Flex flexGrow={1} flexShrink={1} px="2">
                  <Typography
                    color={getInputColor(error, open, disabled, hasSelection ? 'black' : placeholderTextColor)}
                    numberOfLines={1}
                    textStyle={hasSelection ? valueTextStyle : placeholderTextStyle}>
                    {displaySelected(inputValue, placeholder, options)}
                  </Typography>
                </Flex>

                <Flex flexGrow={0} mr="1">
                  <Icon name={iconName} size="md" color={getInputColor(error, open, disabled)} />
                </Flex>
              </>
            )}
          </StyledInputContainer>
        </TouchableWithoutFeedback>
      </ActionSheet>
    </Label>
  );
};

export {InputSelect, getInputColor};
