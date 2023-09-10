import React from 'react';

import {Flex} from './flex';
import {Typography} from './typography';

interface CenterAlignedNotificationProps {
  title: string;
}

const CenterAlignedNotification = ({title}: CenterAlignedNotificationProps) => (
  <Flex flexGrow={1} alignItems="center" justifyContent="center">
    <Flex>
      <Typography textStyle="bodyBold" color="highlighted">
        {title}
      </Typography>
    </Flex>
  </Flex>
);

export {CenterAlignedNotification};
