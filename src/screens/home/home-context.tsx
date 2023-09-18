import React, {createContext, useContext, useState, useMemo} from 'react';

import {useSelector} from 'react-redux';

import type {RootState} from '@state/store';
import type {ContactItem, GroupedContacts} from '@types';
import {utils} from '@utils/general';

interface HomeContextProps {
  contactsSortedArray: GroupedContacts[];
  currentExpanded: ContactItem['id'] | null;
  setCurrentExpanded: React.Dispatch<React.SetStateAction<ContactItem['id'] | null>>;
  canPaginate: boolean;
  setCanPaginate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HomeContextProviderProps {
  children: React.ReactNode;
}

const HomeContext = createContext<HomeContextProps>({
  contactsSortedArray: [],
  currentExpanded: null,
  setCurrentExpanded: utils.noop,
  canPaginate: false,
  setCanPaginate: utils.noop,
});

const HomeContextProvider = ({children}: HomeContextProviderProps) => {
  const [currentExpanded, setCurrentExpanded] = useState<ContactItem['id'] | null>(null);
  const [canPaginate, setCanPaginate] = useState<boolean>(false);

  const contacts = useSelector((state: RootState) => state.contacts.value);

  const contactsSortedArray: GroupedContacts[] = useMemo(
    () =>
      Object.values(contacts)
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
        })),
    [contacts],
  );

  const values: HomeContextProps = {
    contactsSortedArray,
    currentExpanded,
    setCurrentExpanded,
    canPaginate,
    setCanPaginate,
  };

  return <HomeContext.Provider value={values}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => useContext(HomeContext);
export {HomeContextProvider};
