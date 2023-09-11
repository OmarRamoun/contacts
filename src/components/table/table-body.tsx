import React from 'react';
import {View} from 'react-native';

import type {PaddingProps} from 'styled-system';

import {Flex} from '../flex';

export interface TableBodyProps extends PaddingProps {
  children: React.ReactNode;
  shouldScroll?: boolean;
  height?: number;
}

const TableBody = ({children, shouldScroll, ...props}: TableBodyProps) => (
  <Flex {...props} flexGrow={1}>
    {shouldScroll ? <View style={{flexGrow: 1, flexShrink: 0, flexBasis: 0}}>{children}</View> : children}
  </Flex>
);

export {TableBody};
