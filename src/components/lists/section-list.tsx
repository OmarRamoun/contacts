import React from 'react';
/* import type {SectionListProps as SLProps} from 'react-native'; */
import {View} from 'react-native';

/* import {SectionList as SL} from 'react-native'; */
import type {FlashListProps} from '@shopify/flash-list';
import {FlashList} from '@shopify/flash-list';

import {Flex} from '../flex';
import {Typography} from '../typography';

import type {ListProps} from './list-shared';

interface SectionListProps
  extends Omit<FlashListProps<any>, 'contentContainerStyle' | 'data' | 'renderItem'>,
    ListProps {
  keyField?: string;
  sections: {title: string; data: any[]}[];
  renderSectionHeader: (item: string) => React.ReactElement<any>;
  renderElement: (item: any, index: number) => React.ReactElement<any>;
}

const convertToFlatListFormat = (items: SectionListProps['sections']) => {
  const result: any[] = [];

  items.forEach((section) => {
    result.push(section.title);

    section.data.forEach((contact: any) => {
      result.push(contact);
    });
  });

  return result as any[];
};

const SectionList = ({
  sections,
  /* shouldCenterOnEmpty = true, */
  contentContainerStyle = {},
  renderElement,
  keyField = 'id',
  renderSectionHeader,
  ...props
}: SectionListProps) => {
  const data = convertToFlatListFormat(sections);

  const stickyHeaderIndices = data
    .map((item, index) => {
      if (typeof item === 'string') {
        return index;
      }

      return null;
    })
    .filter((item) => item !== null) as number[];

  return (
    <View style={{flex: 1}}>
      <FlashList
        estimatedItemSize={100}
        data={data}
        /* removeClippedSubviews */
        renderItem={({item, index}) => {
          if (typeof item === 'string') {
            // Rendering header
            return renderSectionHeader(item);
          }

          return renderElement?.(item, index);
        }}
        stickyHeaderIndices={stickyHeaderIndices}
        getItemType={(item) => (typeof item === 'string' ? 'sectionHeader' : 'row')}
        contentContainerStyle={{...contentContainerStyle}}
        keyExtractor={(item) => `${item[keyField]}`}
        ListFooterComponent={() => (
          <Flex flex={1} alignItems="center" justifyContent="center">
            <Typography color="grey">End of List</Typography>
          </Flex>
        )}
        {...props}
      />
    </View>
  );
};

export {SectionList};
