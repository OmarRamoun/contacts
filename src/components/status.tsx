import React from 'react';

import type {DefaultTheme} from 'styled-components/native';

import type {FlexProps} from './flex';
import {Flex} from './flex';
import {Icon} from './icon';
import {Typography} from './typography';

export enum StatusTypes {
  Default,
  Error,
}

interface StatusProps extends FlexProps {
  type?: StatusTypes;
  text: string;
}

const colourMap: {[key: string]: keyof DefaultTheme['colors']} = {
  [StatusTypes.Default]: 'green',
  [StatusTypes.Error]: 'red',
};

const Status = ({type = StatusTypes.Default, text, ...props}: StatusProps) => (
  <Flex flexDirection="row" alignItems="center" {...props}>
    <Flex mr="2" opacity={0.5}>
      <Typography textStyle="small" color="black">
        {text}
      </Typography>
    </Flex>
    <Flex>
      <Icon color={colourMap[type]} size="sm" name="circle" />
    </Flex>
  </Flex>
);

export {Status};
