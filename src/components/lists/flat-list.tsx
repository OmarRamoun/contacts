import React, {useRef, useCallback, useState, useEffect} from 'react';
import type {FlatListProps as FLProps, LayoutChangeEvent} from 'react-native';
import {FlatList as FL, View} from 'react-native';

import type {ListProps} from './list-shared';
import {ListFooterComponent, getContainerStyle} from './list-shared';

export interface FlatListProps extends Omit<FLProps<any>, 'contentContainerStyle' | 'onEndReached'>, ListProps {
  onEndReached?: ((info: {distanceFromEnd: number}) => void) | null;
  keyField?: string;
}

const FlatList = ({
  data,
  shouldCenterOnEmpty = true,
  contentContainerStyle = {},
  renderItem,
  canPaginate = false,
  onEndReached,
  keyField = 'id',
  ...props
}: FlatListProps) => {
  const heightOffsetTriggerChecked = useRef<boolean>(false);
  const flatList = useRef<FL<any>>(null);
  const listFooterComponent = useRef<any>(null);

  const [flatListHeight, setFlatListHeight] = useState<number>(0);
  const [footerOffsetY, setFooterOffsetY] = useState<number>(0);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setFlatListHeight(event.nativeEvent.layout.height);
  }, []);

  const handleEndReached = useCallback(
    (info: {distanceFromEnd: number}) => {
      if (onEndReached) onEndReached(info);
    },
    [onEndReached],
  );

  const handleFooterLayout = useCallback(() => {
    if (!listFooterComponent.current) return;

    listFooterComponent.current.measure(
      // eslint-disable-next-line max-params
      (_width: number, _height: number, _px: number, _py: number, _fx: number, fy: number) => {
        setFooterOffsetY(fy);
      },
    );
  }, []);

  useEffect(() => {
    if (!flatListHeight) return;

    if (footerOffsetY < flatListHeight && onEndReached && !heightOffsetTriggerChecked.current) {
      onEndReached({distanceFromEnd: 0});
    }

    heightOffsetTriggerChecked.current = true;
  }, [flatListHeight, footerOffsetY]);

  return (
    <FL
      keyExtractor={(item) => item[keyField]}
      onLayout={handleLayout}
      onEndReached={handleEndReached}
      ref={flatList}
      data={data}
      contentContainerStyle={getContainerStyle(data, contentContainerStyle, shouldCenterOnEmpty)}
      style={{
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      }}
      renderItem={renderItem}
      removeClippedSubviews
      {...props}
      ListFooterComponent={() => (
        <View ref={listFooterComponent}>
          <ListFooterComponent onLayout={handleFooterLayout} canPaginate={canPaginate} />
        </View>
      )}
    />
  );
};

export {FlatList};
