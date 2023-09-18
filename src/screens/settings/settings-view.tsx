import React from 'react';

import {Button, Flex} from '@components';
import type {ViewNavigationProps} from '@types';

interface SettingsViewProps {
  navigation?: ViewNavigationProps<'Settings'>;
}

const SettingsView = ({navigation}: SettingsViewProps) => (
  <Flex m={4}>
    <Button onPress={() => navigation?.goBack()}>go back</Button>
  </Flex>
);

export {SettingsView};
