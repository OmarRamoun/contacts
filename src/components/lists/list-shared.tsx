import React from 'react';
import type {ViewStyle, LayoutChangeEvent} from 'react-native';

import {Flex} from '../flex';
import {Spinner} from '../spinner/spinner';

export interface ListProps {
  shouldCenterOnEmpty?: boolean;
  contentContainerStyle?: Record<string, any> | null;
  canPaginate?: boolean;
}

interface ListFooterComponentProps {
  canPaginate: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const ListFooterComponent = ({canPaginate, onLayout}: ListFooterComponentProps) => {
  if (!canPaginate) return null;

  return (
    <Flex onLayout={onLayout} flexDirection="row" justifyContent="center" my={2}>
      <Spinner size="md" />
    </Flex>
  );
};

const getContainerStyle = (
  data: ArrayLike<any> | null | undefined,
  contentContainerStyle: Record<string, any> | undefined | null,
  shouldCenterOnEmpty: boolean | undefined,
): ViewStyle => ({
  ...(contentContainerStyle || {}),
  flexGrow: 1,
  justifyContent: shouldCenterOnEmpty && (data || []).length === 0 ? 'center' : 'flex-start',
});

export {ListFooterComponent, getContainerStyle};
