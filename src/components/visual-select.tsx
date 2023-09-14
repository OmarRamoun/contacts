import React, {useState, useEffect} from 'react';
import type {FlatListProps} from 'react-native';

import {Flex} from './flex';
import {InputField} from './forms/input-field/input-field';
import {getInputColor} from './forms/input-utils';
import {Icon} from './icon';
import {FlatList} from './lists/flat-list';

type DataType = ArrayLike<any> | null | undefined;

interface FilterObject {
  item: any;
  index: number;
  filterText: string;
}

interface VisualSelectProps extends Omit<FlatListProps<any>, 'renderItem'> {
  renderItem: (item: any, selected: boolean, onSelect: () => void) => React.ReactElement;
  getId: (item: any) => number;
  extraData?: any[];
  filter?: (options: FilterObject) => void;
  filterPlaceholder?: string;
  filterPadding?: string | number;
  onSelectUpdate?: (selected: any[]) => void;
  initialSelectedIds?: number[] | undefined;
}

const VisualSelect = ({
  renderItem,
  data,
  getId,
  filter,
  filterPlaceholder = 'Search',
  filterPadding = '1',
  onSelectUpdate,
  extraData = [],
  contentContainerStyle = false,
  initialSelectedIds,
  ...props
}: VisualSelectProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelectedIds || []);
  const [filterText, setFilterText] = useState<string>('');
  const [cachedItems, setCachedItems] = useState<DataType>([]);

  const isSelected = (id: number) => selectedIds.includes(id);

  const onSelect = (id: number) => {
    if (isSelected(id)) {
      const currentSelected = selectedIds.slice();
      const idx = currentSelected.indexOf(id);
      currentSelected.splice(idx, 1);
      setSelectedIds(currentSelected);
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  useEffect(() => {
    if (!filter) {
      setCachedItems(data);
      return;
    }

    setCachedItems(Array.from(data || []).filter((item, index) => filter({item, index, filterText})));
  }, [data, filterText, filter]);

  useEffect(() => {
    if (onSelectUpdate) onSelectUpdate(selectedIds);
  }, [onSelectUpdate, selectedIds]);

  return (
    <Flex flexGrow={1} flexBasis={0} alignItems="stretch">
      {filter ? (
        <Flex flexGrow={0} p={filterPadding}>
          <InputField
            inputTextProps={{placeholder: filterPlaceholder}}
            onValueChange={setFilterText}
            value={filterText}
            leftSlot={(focused, error, disabled) => (
              <Flex pl="2">
                <Icon name="search" size="md" color={getInputColor(error, focused, disabled)} />
              </Flex>
            )}
          />
        </Flex>
      ) : null}

      <FlatList
        keyExtractor={(item) => `${getId(item)}`}
        data={cachedItems}
        renderItem={({item}) => renderItem(item, isSelected(getId(item)), () => onSelect(getId(item)))}
        extraData={[...extraData, selectedIds]}
        contentContainerStyle={contentContainerStyle || {}}
        {...props}
      />
    </Flex>
  );
};

export {VisualSelect};
