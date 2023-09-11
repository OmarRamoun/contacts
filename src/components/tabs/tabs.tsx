import React from 'react';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';

import {ButtonInteraction} from '../button/button-interaction';
import {Flex} from '../flex';
import type {FlexProps} from '../flex';
import {Line} from '../line';
import {Typography} from '../typography';

interface TabObject {
  label: string;
  to?: string;
  disabled?: boolean;
  replace?: boolean;
  back?: boolean;
}

interface TabsProps extends FlexProps {
  items: Array<string | TabObject>;
  activeTab: number | string;
  onSelect?: (tab: number) => void;
  color?: keyof DefaultTheme['colors'];
  underline?: boolean;
  tabsSpacing?: number;
}

const getOpacity = (active: boolean, hovered: boolean) => {
  if (active) return 1;
  if (hovered) return 0.75;
  return 0.5;
};

const TabContainer = styled(Flex)<{
  active: boolean;
  hovered: boolean;
}>`
  opacity: ${(props) => getOpacity(props.active, props.hovered)};
  padding: 6px 26px;
  background-color: ${(props) => (props.active ? props.theme.colors.black : props.theme.colors.clear)};
  border-radius: 4px;
`;

const TabInnerContainer = styled(Flex)<{
  underline: boolean;
}>`
  margin-bottom: ${(props) => (props.underline ? 2 : 0)}px;
`;

const Tabs = ({items, activeTab, onSelect, underline, color = 'darkBlue', tabsSpacing = 6}: TabsProps) => (
  <Flex flexDirection="row">
    {items.map((item, index) => {
      const currentItem = typeof item === 'string' ? {label: item, disabled: false} : {...item};

      const isActive = typeof activeTab === 'string' ? currentItem.to?.includes(activeTab) : activeTab === index;

      return (
        <ButtonInteraction
          to={currentItem.to}
          replace={currentItem.replace}
          back={currentItem.back}
          key={currentItem.label}
          onPress={onSelect ? () => onSelect(index) : undefined}
          disabled={currentItem.disabled}>
          {({mouseProps, ...interactionProps}) => (
            <TabContainer mr={tabsSpacing} active={!!isActive} {...mouseProps} {...interactionProps}>
              {currentItem.label === '' ? null : (
                <TabInnerContainer underline={!!underline}>
                  <Typography textStyle="bodyBold" color={isActive ? 'white' : color}>
                    {currentItem.label}
                  </Typography>
                </TabInnerContainer>
              )}

              {isActive && underline ? <Line bottom="0" backgroundColor={color} /> : null}
            </TabContainer>
          )}
        </ButtonInteraction>
      );
    })}
  </Flex>
);

export {Tabs};
