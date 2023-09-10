import React from 'react';

import {Box} from './box';
import type {FlexProps} from './flex';
import {Flex} from './flex';
import {Typography} from './typography';

interface EmptyStateProps extends FlexProps {
  bottom?: React.ReactNode;
  text: string;
  imageWidth?: number;
  imageHeight?: number;
}

const EmptyState = ({bottom, text, ...props}: EmptyStateProps) => (
  <Flex alignItems="center" justifyContent="center" {...props}>
    <Box my="4">
      <Typography color="darkBlue" textAlign="center">
        {text}
      </Typography>
    </Box>

    {bottom}
  </Flex>
);

export {EmptyState};
