import type {ReactElement} from 'react';
import React from 'react';

import styled from 'styled-components/native';
import type {MarginProps} from 'styled-system';

import {Flex} from './flex';
import {Icon} from './icon';
import {TouchableOpacity} from './touchable-opacity';
import {useGenericTransition} from './transition/transition-hook';
import {AnimatedBox} from './transition/transition-shared';

const StyledContainer = styled(Flex)<{
  borderRadius?: number;
  showSideBorder?: boolean;
  showTopBorder?: boolean;
  showBottomBorder?: boolean;
}>`
  border-top-width: ${(props) => (props.showTopBorder ? '1px' : '0')};
  border-bottom-width: ${(props) => (props.showBottomBorder ? '1px' : '0')};
  border-right-width: ${(props) => (props.showSideBorder ? '1px' : '0')};
  border-left-width: ${(props) => (props.showSideBorder ? '1px' : '0')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 0)}px;
  border-color: ${(props) => props.theme.colors.grey};
  overflow: hidden;
`;

const RotateIcon = styled(AnimatedBox)`
  height: 25px;
  width: 25px;
`;

export const ExpandableItem = ({
  onPress,
  expanded,
  children,
  showSideBorder,
  showTopBorder,
  showBottomBorder,
  borderRadius,
  overrideMargin,
  leftSlot,
}: {
  onPress: () => void;
  expanded: boolean;
  children: ReactElement;
  showSideBorder?: boolean;
  showTopBorder?: boolean;
  showBottomBorder?: boolean;
  borderRadius?: number;
  overrideMargin?: {[key in keyof MarginProps]: number};
  leftSlot?: React.ReactNode;
}) => {
  const {animatedValue: animatedTransformAngle} = useGenericTransition({
    from: '90deg',
    to: '-90deg',
    state: expanded,
  });

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <StyledContainer
          showSideBorder={showSideBorder}
          showTopBorder={showTopBorder}
          showBottomBorder={showBottomBorder}
          borderRadius={borderRadius}
          flexDirection="row"
          {...overrideMargin}>
          {leftSlot ?? null}

          <Flex flex={1} justifyContent="center">
            <Flex flexDirection="row" justifyContent="flex-end">
              <RotateIcon style={{transform: [{rotate: animatedTransformAngle}]}}>
                <Icon size="md" name="plus" color="black" />
              </RotateIcon>
            </Flex>
          </Flex>
        </StyledContainer>
      </TouchableOpacity>

      {expanded ? children : null}
    </>
  );
};
