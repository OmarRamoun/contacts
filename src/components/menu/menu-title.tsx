import React from 'react';

import {Box} from '../box';
import {Typography} from '../typography';

interface MenuItemProps {
  children: React.ReactNode;
}

const MenuTitle = ({children}: MenuItemProps) => (
  <Box opacity={0.3} py="2" px="3">
    <Typography textStyle="buttonSmall" color="white" fontWeight="bold">
      {children}
    </Typography>
  </Box>
);

export {MenuTitle};
