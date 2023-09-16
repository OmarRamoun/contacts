import React from 'react';

import type {DefaultTheme} from 'styled-components/native';
import type {FlexDirectionProps, MarginProps} from 'styled-system';

import {theme} from '@styles';

import type {FlexProps} from '../flex';
import {Flex} from '../flex';
import {TouchableOpacity} from '../touchable-opacity';
import {Typography} from '../typography';

interface LabelProps extends FlexProps {
  title?: string;
  children: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onPress?: () => void;
  textStyle?: keyof DefaultTheme['textStyles'];
  onDarkBackground?: boolean;
}

const getTitleMargin = ({flexDirection}: FlexDirectionProps) => {
  if (flexDirection === 'row') {
    return {
      mr: 2,
    } as MarginProps;
  }

  if (flexDirection === 'row-reverse') {
    return {
      ml: 2,
    } as MarginProps;
  }

  return {
    mb: 1,
    ml: 1,
  } as MarginProps;
};

const getTextColor = (error: boolean, disabled: boolean, onDarkBackground?: boolean) => {
  if (error) return 'red';
  if (disabled) return onDarkBackground ? 'lightGrey1' : 'grey';

  return onDarkBackground ? 'white' : theme.primaryColor.default;
};

const Label = ({
  children,
  title,
  flexDirection = 'column',
  error,
  errorMessage,
  disabled,
  onPress,
  textStyle = 'h4',
  onDarkBackground,
  ...props
}: LabelProps) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <Flex flexDirection="column">
      <Flex flexDirection={flexDirection} {...props}>
        {title ? (
          <Flex {...getTitleMargin({flexDirection})}>
            <Typography textStyle={textStyle} color={getTextColor(!!error, !!disabled, onDarkBackground)}>
              {title}
            </Typography>
          </Flex>
        ) : null}

        <Flex>{children}</Flex>
      </Flex>

      {!!errorMessage && (
        <Flex mt={1}>
          <Typography textStyle="small" color="red">
            {errorMessage}
          </Typography>
        </Flex>
      )}
    </Flex>
  </TouchableOpacity>
);

export {Label};
