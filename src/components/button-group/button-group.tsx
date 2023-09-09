import React, {useState, useCallback, useEffect} from 'react';

import {Box} from '../box';
import {ButtonInteraction} from '../button/button-interaction';
import {Flex} from '../flex';

import {ButtonGroupItem} from './button-group-item';

interface ButtonGroupItemProps {
  value: number | string;
  label?: string;
}

interface RenderItemProps {
  value: number | string;
  label: number | string;
  first: boolean;
  last: boolean;
  selected: boolean;
  hovered: boolean;
  pressed: boolean;
}

export interface ButtonGroupProps {
  options: ButtonGroupItemProps[];
  renderItem?: (options: RenderItemProps) => React.ReactElement;
  forceSelect?: boolean;
  onSelect?: (selected: string | number) => void;
  value?: string;
  justifyContent?: 'flex-start' | 'flex-end' | 'stretch';
}

const defaultRenderItem = ({label, first, last, selected, pressed}: RenderItemProps) => (
  <ButtonGroupItem first={first} last={last} selected={selected} pressed={pressed}>
    {label}
  </ButtonGroupItem>
);

const getInitialOption = (options: ButtonGroupItemProps[], value?: string, forceSelect?: boolean) => {
  if (value) return options.findIndex((option) => option.value === value);
  return forceSelect ? 0 : -1;
};

const ButtonGroup = ({
  options,
  renderItem = defaultRenderItem,
  forceSelect = true,
  onSelect,
  justifyContent = 'stretch',
  value,
}: ButtonGroupProps) => {
  const [activeOption, setActiveOption] = useState<number>(getInitialOption(options, value, forceSelect));

  const onSelectItem = useCallback(
    (index: number) => {
      setActiveOption(activeOption === index && !forceSelect ? -1 : index);
    },
    [activeOption, setActiveOption, forceSelect],
  );

  useEffect(() => {
    if (onSelect && options[activeOption]) onSelect(options[activeOption].value);
  }, [activeOption]);

  return (
    <Flex flexDirection="row" justifyContent={justifyContent}>
      {options.map((option, index) => (
        <ButtonInteraction key={`item-${option.label}-${index}`} onPress={() => onSelectItem(index)}>
          {({hovered, pressed, mouseProps}) => (
            <Box {...mouseProps}>
              {renderItem({
                value: option.value,
                label: option.label || option.value,
                first: index === 0,
                last: index === options.length - 1,
                selected: index === activeOption,
                hovered,
                pressed,
              })}
            </Box>
          )}
        </ButtonInteraction>
      ))}
    </Flex>
  );
};

export {ButtonGroup};
