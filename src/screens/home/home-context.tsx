import React, {createContext, useContext, useState, useMemo} from 'react';

import {useSelector} from 'react-redux';

import type {RootState} from '@state/store';
import type {ContactItem, GroupedContacts} from '@types';
import {utils} from '@utils/general';

import {contactsBinarySearch} from './utils';

interface HomeContextProps {
  search: string;
  handleSearch: (text: string) => void;
  data: GroupedContacts[];
  currentExpanded: ContactItem['id'] | null;
  setCurrentExpanded: React.Dispatch<React.SetStateAction<ContactItem['id'] | null>>;
  canPaginate: boolean;
  setCanPaginate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HomeContextProviderProps {
  children: React.ReactNode;
}

const HomeContext = createContext<HomeContextProps>({
  search: '',
  handleSearch: utils.noop,
  data: [],
  currentExpanded: null,
  setCurrentExpanded: utils.noop,
  canPaginate: false,
  setCanPaginate: utils.noop,
});

const HomeContextProvider = ({children}: HomeContextProviderProps) => {
  const [currentExpanded, setCurrentExpanded] = useState<ContactItem['id'] | null>(null);
  const [search, setSearch] = useState<string>('');
  const [canPaginate, setCanPaginate] = useState<boolean>(false);

  const contacts = useSelector((state: RootState) => state.contacts.value);

  const contactsSortedArray: GroupedContacts[] = Object.values(contacts)
    .reduce((acc: GroupedContacts[], contact: ContactItem) => {
      const initial = contact.firstName.charAt(0).toLowerCase();
      const existingGroup = acc.find((item) => item.title === initial);

      if (existingGroup) {
        existingGroup.data.push(contact);
      } else {
        acc.push({title: initial, data: [contact]});
      }

      return acc;
    }, [])
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((group) => ({
      title: group.title,
      data: group.data.sort((a, b) => a.firstName.localeCompare(b.firstName)),
    }));

  const [data, setData] = useState(contactsSortedArray);

  const filterContacts = (searchTerm: string) => {
    if (searchTerm.length === 0) {
      return contactsSortedArray;
    }

    const filteredContacts = contactsSortedArray.map((group) => ({
      ...group,
      data: contactsBinarySearch(group.data, searchTerm),
    }));

    return filteredContacts.filter((group) => group.data.length > 0);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const newData = filterContacts(text);
    setData(newData);
  };

  const values: HomeContextProps = {
    search,
    handleSearch,
    data,
    currentExpanded,
    setCurrentExpanded,
    canPaginate,
    setCanPaginate,
  };

  return <HomeContext.Provider value={values}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => useContext(HomeContext);
export {HomeContextProvider};
