import React from 'react';

import {Box, Icon, Flex, TouchableOpacity} from '@components';
import type {BoxProps} from '@components';
import {theme} from '@styles';

interface RoundButtonProps extends BoxProps {
  onPress?: () => void;
}

const RoundButton = ({onPress, ...props}: RoundButtonProps) => (
  <Box height={10} width={10} overflow="hidden" {...props}>
    <TouchableOpacity
      onPress={onPress}
      style={{flex: 1, borderRadius: 10, backgroundColor: theme.primaryColor.default}}>
      <Flex alignItems="center" justifyContent="center" flex={1}>
        <Icon name="plus" color="white" />
      </Flex>
    </TouchableOpacity>
  </Box>
);

export {RoundButton};
