import React, {useCallback, useState, useEffect} from 'react';

import {ensureArray} from '@utils/general';

import {ButtonInteraction} from '../button/button-interaction';
import {Flex} from '../flex';

import type {InputButtonGroupItemProps} from './input-button-group-item';
import {InputButtonGroupItem} from './input-button-group-item';
import type {InputSharedProps, SelectOptions, SelectValue} from './input-shared';
import {getInitialSelectValue} from './input-utils';
import {Label} from './label';

type ButtonGroupValue = string | number | Array<string | number>;

export interface InputButtonGroupProps extends InputSharedProps<ButtonGroupValue> {
  /** Custom justify-content parameter */
  justifyContent?: 'flex-start' | 'flex-end' | 'space-between';

  /** The list of button options */
  options: SelectOptions;

  /** Whether multiple can be selected and the return value be an array */
  multiple?: boolean;

  /** Whether to reverse the label or not */
  reverse?: boolean;

  /** A custom method to render each button */
  renderItem?: (options: InputButtonGroupItemProps) => React.ReactElement;
}

const defaultRenderItem = (props: InputButtonGroupItemProps) => <InputButtonGroupItem {...props} />;

const InputButtonGroup = ({
  options,
  multiple,
  title,
  disabled,
  error,
  errorMessage,
  helpers,
  initialValue,
  onValueChange,
  renderItem = defaultRenderItem,
  reverse,
  justifyContent,
  labelFlexProps = {},
  labelTextStyle,
  value,
}: InputButtonGroupProps) => {
  const [inputValue, setInputValue] = useState<SelectValue>(getInitialSelectValue<SelectValue>(initialValue, multiple));

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onItemSelect = useCallback(
    async (itemValue: string | number) => {
      if (!disabled) {
        if (helpers) await helpers.setTouched(true);

        if (!multiple) {
          setInputValue(itemValue);

          if (helpers) await helpers.setValue(itemValue);
          if (onValueChange) onValueChange(itemValue);
        } else {
          const currValue = ensureArray(inputValue)
            .slice()
            .filter((v): v is string | number => v !== null);

          if (currValue.includes(itemValue)) currValue.splice(currValue.indexOf(itemValue), 1);
          else currValue.push(itemValue);

          setInputValue(currValue);

          if (helpers) await helpers.setValue(currValue);
          if (onValueChange) onValueChange(currValue);
        }
      }
    },
    [multiple, onValueChange, inputValue, disabled],
  );

  const isSelected = useCallback(
    (currentValue: string | number) => {
      if (inputValue === null) return false;
      if (Array.isArray(inputValue)) return inputValue.includes(currentValue);
      return inputValue === currentValue;
    },
    [inputValue],
  );

  return (
    <Label
      flexDirection={reverse ? 'row-reverse' : 'row'}
      justifyContent={justifyContent || 'space-between'}
      alignItems="center"
      title={title}
      error={error}
      errorMessage={errorMessage}
      disabled={disabled}
      textStyle={labelTextStyle}
      {...labelFlexProps}>
      <Flex flexDirection="row">
        {options.map((option, index) => (
          <ButtonInteraction key={`btn-group-${option.label}-${index}`} onPress={() => onItemSelect(option.value)}>
            {({hovered, pressed, mouseProps}) => (
              <Flex {...mouseProps}>
                {renderItem({
                  value: option.value,
                  label: option.label,
                  first: index === 0,
                  last: index === options.length - 1,
                  selected: isSelected(option.value),
                  hovered,
                  pressed,
                })}
              </Flex>
            )}
          </ButtonInteraction>
        ))}
      </Flex>
    </Label>
  );
};

export {InputButtonGroup};
