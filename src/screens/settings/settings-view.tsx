import React from 'react';

import {Typography, Button, Flex, InputToggle, TableItem} from '@components';
import type {ViewNavigationProps} from '@types';

interface SettingsViewProps {
  navigation?: ViewNavigationProps<'Settings'>;
}

const SettingsView = ({navigation}: SettingsViewProps) => (
  <Flex m={4}>
    <Flex mb={4}>
      <TableItem left={<Typography>Safe Mode</Typography>} right={<InputToggle />} />
    </Flex>

    <Button onPress={() => navigation?.goBack()}>Go Back</Button>
  </Flex>
);

export {SettingsView};
