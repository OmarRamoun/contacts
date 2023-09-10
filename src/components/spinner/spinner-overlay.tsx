import React from 'react';

import styled from 'styled-components/native';

import {theme} from '@styles';

import {Box} from '../box';
import type {BoxProps} from '../box';
import {Flex} from '../flex';
import {Typography} from '../typography';

import {Spinner} from './spinner';

interface SpinnerOverlayProps extends BoxProps {
  loadingText?: string;
}

const LoadingOverlayContainer = styled(Box)`
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  justify-content: center;
  align-items: center;
`;

const SpinnerOverlay = ({
  loadingText,
  borderRadius,
  color = theme.primaryColor.default,
  ...props
}: SpinnerOverlayProps) => (
  <LoadingOverlayContainer borderRadius={borderRadius} {...props}>
    <Spinner size="lg" color={color} />

    {loadingText && (
      <Flex>
        <Typography color={color} style={{marginTop: 5}}>
          {loadingText}
        </Typography>
      </Flex>
    )}
  </LoadingOverlayContainer>
);

export {SpinnerOverlay};
