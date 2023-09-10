import React from 'react';
import type {SectionListProps as SLProps} from 'react-native';
import {SectionList as SL} from 'react-native';

import type {ListProps} from './list-shared';
import {ListFooterComponent, getContainerStyle} from './list-shared';

interface SectionListProps extends Omit<SLProps<any>, 'contentContainerStyle'>, ListProps {
  keyField?: string;
}

const SectionList = ({
  sections,
  shouldCenterOnEmpty = true,
  contentContainerStyle = {},
  renderItem,
  canPaginate = false,
  keyField = 'id',
  ...props
}: SectionListProps) => (
  <SL
    sections={sections}
    removeClippedSubviews
    contentContainerStyle={getContainerStyle(sections, contentContainerStyle, shouldCenterOnEmpty)}
    style={{
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    }}
    renderItem={renderItem}
    {...props}
    keyExtractor={(item) => `${item[keyField]}`}
    ListFooterComponent={() => <ListFooterComponent canPaginate={canPaginate} />}
  />
);

export {SectionList};
