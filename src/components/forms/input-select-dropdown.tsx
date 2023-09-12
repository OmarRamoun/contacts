import React, {useRef} from 'react';
import {Platform, TouchableOpacity, ScrollView} from 'react-native';

import {theme} from '@styles';

import {Button} from '../button/button';
import {Flex} from '../flex';
import {Typography} from '../typography';

import {InputCheckbox} from './input-checkbox';
import type {SelectOptions, SelectValue} from './input-shared';

interface InputSelectDropdownProps {
  maxHeight?: number;
  /** The underlying selected value */
  value: SelectValue;

  /** The passed through options to populate */
  options: SelectOptions;

  /** Whether multiple can be selected */
  multiple?: boolean;

  /** The callback for when selecting an item */
  onSelect: (value: string | number) => void;
}

const InputSelectDropdown = ({maxHeight, options, value, onSelect, multiple = false}: InputSelectDropdownProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  function renderChild(option: any): any {
    return (
      <>
        <Typography numberOfLines={1} textStyle="small" color="black">
          {option.label || option.value}
        </Typography>

        <Flex ml={2}>
          <InputCheckbox
            delegateInteraction
            rounded={!multiple}
            value={multiple ? Array.isArray(value) && value.includes(option.value) : value === option.value}
          />
        </Flex>
      </>
    );
  }

  function renderAndroid(): any {
    return options.map((option) => {
      const isSelected = Array.isArray(value) ? value.includes(option.value) : value === option.value;
      return (
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            ...(isSelected && {backgroundColor: theme.colors.lightGrey1}),
          }}
          key={option.value}
          onPress={() => onSelect(option.value)}>
          {renderChild(option)}
        </TouchableOpacity>
      );
    });
  }

  function render() {
    return options.map((option) => {
      const isSelected = Array.isArray(value) ? value.includes(option.value) : value === option.value;
      return (
        <Button
          align="space-between"
          key={option.value}
          type={isSelected ? 'secondary' : 'tertiary'}
          onPress={() => onSelect(option.value)}
          overrideHorizontalPadding={10}>
          {renderChild(option)}
        </Button>
      );
    });
  }

  const scrollToFirstSelectedOption = (_scrollViewWidth: number, scrollViewHeight: number) => {
    const firstSelectedValue = (() => {
      if (value) {
        if (typeof value === 'object' && value.length > 0) {
          return value[0];
        }

        if (typeof value === 'string' || typeof value === 'number') {
          return value;
        }

        return null;
      }

      return null;
    })();

    const firstOptionIndex = firstSelectedValue ? options.map((o) => o.value).indexOf(firstSelectedValue) : 0;
    scrollViewRef.current?.scrollTo((scrollViewHeight / options.length) * firstOptionIndex);
  };

  return (
    <ScrollView style={{maxHeight}} ref={scrollViewRef} onContentSizeChange={scrollToFirstSelectedOption}>
      {Platform.OS === 'android' ? renderAndroid() : render()}
    </ScrollView>
  );
};

export {InputSelectDropdown};
