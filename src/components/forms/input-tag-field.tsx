import React, {useRef, useEffect, useState, useCallback} from 'react';
import type {TextInput, TextInputSubmitEditingEventData, NativeSyntheticEvent} from 'react-native';
import {ScrollView} from 'react-native';

import styled from 'styled-components/native';

import {theme as mainTheme} from '@styles';
import {awaitFrame} from '@utils/general';

import {Flex} from '../flex';
import {Spinner} from '../spinner/spinner';
import type {TagObject} from '../tag';
import {Tag} from '../tag';

import type {InputSharedProps, InputSharedSlotProps, InputTagFieldSearchProps, TagFieldValue} from './input-shared';
import {InputTagFieldSearch} from './input-tag-field-search';
import {StyledInputContainer, processIdToTag, StyledTextInput} from './input-utils';
import {Label} from './label';

export interface InputTagFieldProps
  extends InputSharedProps<TagFieldValue>,
    InputSharedSlotProps,
    Pick<InputTagFieldSearchProps, 'onSearch' | 'onAddTag' | 'searchLoading' | 'searchTags'> {
  /**
   * Method to convert tag to underlying tracked value
   */
  mapIdToTag?: (id: number, index: number) => TagObject;

  /**
   * Callback for when requesting to create a tag
   */
  onCreateTag?: (tagLabel: string) => void;

  /** The string to display inside the search box */
  searchPlaceholder?: string;

  /** Custom search text override */
  customSearchText?: string;

  /** Callback for requesting to remove a tag */
  onRemoveTag?: (tag: TagObject) => void;

  /** Time to delay auto-searching */
  searchDelay?: number;
}

const StyledSpinner = styled(Flex)`
  position: absolute;

  top: ${(props) => props.theme.space[2]}px;
  right: ${(props) => props.theme.space[2]}px;
`;

const InputTagField = ({
  title,
  error,
  errorMessage,
  disabled,
  searchPlaceholder = 'Type to search...',
  mapIdToTag = processIdToTag,
  rightSlot,
  leftSlot,
  helpers,
  onSearch,
  onAddTag,
  onCreateTag,
  value,
  initialValue,
  onRemoveTag,
  searchDelay = 600,
  searchLoading,
  searchTags,
  customSearchText,
  labelFlexProps = {},
  labelTextStyle,
}: InputTagFieldProps) => {
  const typeTimerRef = useRef<any>(null);
  const searchRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [focused, setFocused] = useState<boolean>(false);

  const [internalTags, setInternalTags] = useState<TagObject[]>((value || initialValue || []).map(mapIdToTag));

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    setInternalTags((value || []).map(mapIdToTag));
  }, [mapIdToTag, value]);

  const valueLength = value?.length;
  useEffect(() => {
    // eslint-disable-next-line
    awaitFrame().then(() => {
      if (scrollRef.current) scrollRef.current.scrollToEnd({animated: false});
    });
  }, [scrollRef, valueLength]);

  const onInternalFocus = useCallback(async () => {
    await helpers?.setTouched(true);
    setFocused(true);
  }, []);

  const onInternalBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const onTypedText = useCallback(
    (text: string) => {
      setSearchValue(text);
    },
    [setSearchValue],
  );

  const searchText = useCallback(
    (text?: string) => {
      if (text && text.trim() && onSearch) onSearch(text.trim());
    },
    [onSearch],
  );

  const onSubmitText = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      clearTimeout(typeTimerRef.current);
      searchText(e.nativeEvent.text);
    },
    [typeTimerRef, searchText],
  );

  const onInternalAddTag = useCallback(
    (tag: TagObject) => {
      setSearchValue(undefined);
      searchRef.current?.clear();

      if (onAddTag) {
        if (onSearch) onSearch('');
        onAddTag(tag);
      }
    },
    [onAddTag, onSearch],
  );

  const onInternalCreateTag = useCallback(
    (tagLabel: string) => {
      setSearchValue(undefined);
      searchRef.current?.clear();

      if (onCreateTag) onCreateTag(tagLabel);
    },
    [onCreateTag],
  );

  useEffect(() => {
    clearTimeout(typeTimerRef.current);

    typeTimerRef.current = setTimeout(() => {
      searchText(searchValue);
    }, searchDelay);
  }, [searchValue, searchText, searchDelay, helpers]);

  useEffect(() => {
    setSearchValue(customSearchText);
    if (searchRef.current) searchRef.current.clear();
  }, [customSearchText]);

  return (
    <Label title={title} error={!!error} errorMessage={errorMessage} textStyle={labelTextStyle} {...labelFlexProps}>
      <StyledInputContainer error={!!error} focused={focused} disabled={!!disabled} alignItems="stretch">
        {leftSlot ? (
          <Flex flexGrow={0} flexShrink={0}>
            {leftSlot(focused, !!error, !!disabled)}
          </Flex>
        ) : null}

        <Flex style={{position: 'relative'}} flexGrow={1} flexShrink={1} minHeight="tagFieldHeight">
          {searchLoading ? (
            <StyledSpinner>
              <Spinner color={mainTheme.primaryColor.default} />
            </StyledSpinner>
          ) : null}

          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 5,
              alignItems: 'center',
            }}>
            {internalTags.map((tag) => (
              <Flex p="1" key={tag.id}>
                <Tag
                  size="lg"
                  icon={onRemoveTag ? 'plus' : undefined}
                  onPress={!disabled && onRemoveTag ? () => onRemoveTag(tag) : undefined}
                  {...tag}
                  subtitle=""
                />
              </Flex>
            ))}

            {onSearch && (onCreateTag || onAddTag) ? (
              <Flex flexDirection="row" flexGrow={1} minWidth="20">
                <StyledTextInput
                  ref={searchRef}
                  placeholder={searchPlaceholder}
                  textStyle="small"
                  placeholderTextColor={mainTheme.colors.grey}
                  editable={!disabled && !searchLoading}
                  onFocus={onInternalFocus}
                  onBlur={onInternalBlur}
                  onSubmitEditing={onSubmitText}
                  onChangeText={onTypedText}
                />
              </Flex>
            ) : null}
          </ScrollView>
        </Flex>

        {rightSlot ? (
          <Flex flexGrow={0} flexShrink={0} flexDirection="row">
            {rightSlot(focused, !!error, !!disabled)}
          </Flex>
        ) : null}
      </StyledInputContainer>

      <InputTagFieldSearch
        searchText={searchValue}
        onSearch={onSearch}
        onAddTag={onInternalAddTag}
        onCreateRequest={onCreateTag ? onInternalCreateTag : undefined}
        searchLoading={searchLoading}
        searchTags={searchTags}
      />
    </Label>
  );
};

export {InputTagField};
