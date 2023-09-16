import React from 'react';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';

import {Box} from '../box';
import {ButtonInteraction} from '../button/button-interaction';
import {Flex} from '../flex';
import {Icon} from '../icon';
import {Line} from '../line';
import {Typography} from '../typography';

interface TableItemProps {
  title?: string;
  subtitle?: string;
  left?: React.ReactElement;
  right?: React.ReactElement;
  onPress?: () => void;
  onCheckboxPress?: () => void;
  selecting?: boolean;
  selected?: boolean;
  noLine?: boolean;
  to?: string;
  numberOfLines?: number;
  subtitleOverrideTextStyle?: keyof DefaultTheme['textStyles'];
  overrideRightHeight?: number;
  overrideRightMargin?: number | string;
  lockedKey?: boolean;
  titleNumberOfLines?: number;
  disableCheckBox?: boolean;
}

const ItemContainer = styled(Flex)<{
  hovered: boolean;
  pressed: boolean;
  selected: boolean;
}>`
  height: ${(props) => props.theme.sizes.tableHeightItem}px;
  background-color: ${(props) => (props.selected ? props.theme.colors.lightGrey1 : props.theme.colors.white)};
`;

const SubtitleContainer = styled(Box)`
  opacity: 0.5;
`;

const LockedKeyContainer = styled(Box)`
  padding-left: 10px;
  justify-content: center;
`;

const TableItem = ({
  title,
  subtitle,
  left,
  right,
  onPress,
  selecting,
  selected = false,
  noLine,
  to,
  subtitleOverrideTextStyle,
  overrideRightHeight,
  overrideRightMargin,
  lockedKey,
  titleNumberOfLines,
}: TableItemProps) => (
  <Flex flexDirection="column">
    <ButtonInteraction to={to} onPress={onPress} disabled={!onPress && !to && !selecting}>
      {({mouseProps, ...interactionProps}) => (
        <ItemContainer
          flexDirection="row"
          alignItems="center"
          px="4"
          flexGrow={1}
          selected={selected}
          {...mouseProps}
          {...interactionProps}>
          {selecting ? <Flex flexGrow={0} mr="3"></Flex> : null}

          {left ? (
            <Flex flexGrow={title || subtitle ? 0 : 1} mr={overrideRightMargin || '2'}>
              {left}
            </Flex>
          ) : null}

          {title || subtitle ? (
            <Flex flexGrow={1} flexShrink={1}>
              {!lockedKey && (
                <Box>
                  <Typography numberOfLines={titleNumberOfLines} color="darkBlue" textStyle="bodyBold">
                    {title}
                  </Typography>
                </Box>
              )}

              {lockedKey && title && (
                <Flex flexDirection="row">
                  <Typography color="darkBlue" textStyle="bodyBold">
                    {title}
                  </Typography>
                  <LockedKeyContainer>
                    <Icon name="lock" size="vsm" />
                  </LockedKeyContainer>
                </Flex>
              )}

              {subtitle ? (
                <SubtitleContainer>
                  <Typography color="darkBlue" textStyle={subtitleOverrideTextStyle || 'body'} numberOfLines={1}>
                    {subtitle}
                  </Typography>
                </SubtitleContainer>
              ) : null}
            </Flex>
          ) : null}

          {right && !overrideRightHeight ? (
            <Flex flexGrow={0} ml={overrideRightMargin || '2'}>
              {right}
            </Flex>
          ) : null}
          {right && overrideRightHeight ? <Flex height={`${overrideRightHeight}px`}>{right}</Flex> : null}
        </ItemContainer>
      )}
    </ButtonInteraction>

    {noLine ? null : <Line size="sm" />}
  </Flex>
);

export {TableItem};
