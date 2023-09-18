/* eslint-disable indent */
import React, {useCallback} from 'react';

import {Flex} from '../flex';
import {Tag} from '../tag';

import type {InputTagFieldSearchProps} from './input-shared';

const InputTagFieldSearch = ({onAddTag, onCreateRequest, searchText, searchTags}: InputTagFieldSearchProps) => {
  const searchMatches = useCallback(
    (text: string) => {
      if (!searchTags) return false;
      return searchTags.find((tag) => tag.label.toLowerCase() === text.toLowerCase());
    },
    [searchTags],
  );

  return (
    <Flex flexDirection="row" flexWrap="wrap">
      {searchTags && searchTags.length && onAddTag
        ? searchTags.map((tag) => (
            <Tag
              key={`tag-${tag.label}-${tag.id}`}
              {...tag}
              avatarImage={undefined}
              icon="plus"
              onPress={() => onAddTag(tag)}
              mr="2"
              mt="2"
            />
          ))
        : null}

      {onCreateRequest && searchText && !searchMatches(searchText) ? (
        <Tag
          icon="plus"
          overrideBackgroundColor="green"
          label={searchText}
          onPress={() => onCreateRequest(searchText)}
          mt="2"
        />
      ) : null}
    </Flex>
  );
};

export {InputTagFieldSearch};
