import React, {useState, useEffect} from 'react';
import type {LayoutChangeEvent, LayoutRectangle} from 'react-native';
import {Animated} from 'react-native';

import styled from 'styled-components';
import {layout} from 'styled-system';

import type {BoxProps} from './box';
import {Box} from './box';

interface CollapsibleProps extends BoxProps {
  expanded: boolean;
  duration?: number;
  height?: number;
}

const StyledContent = styled(Animated.View)`
  ${layout}
  overflow: hidden;
`;

const Collapsible = ({children, expanded, duration = 400, ...props}: CollapsibleProps) => {
  const [collapseAnim] = useState(new Animated.Value(0));
  const [contentDimensions, setContentDimensions] = useState<LayoutRectangle | null>(null);

  useEffect(() => {
    Animated.timing(collapseAnim, {
      toValue:
        expanded && (props.height || contentDimensions?.height)
          ? ((props.height || contentDimensions?.height) as number)
          : 0,
      duration,
      useNativeDriver: false,
    }).start();
  }, [expanded, contentDimensions, collapseAnim, duration, props.height]);

  function onContentLayout(evt: LayoutChangeEvent) {
    setContentDimensions(evt.nativeEvent.layout);
  }

  return (
    <StyledContent onLayout={onContentLayout} style={{height: collapseAnim}}>
      <Box {...props}>{children}</Box>
    </StyledContent>
  );
};

export {Collapsible};
