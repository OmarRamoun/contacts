import React, {createContext, useContext, useState, useMemo, useEffect} from 'react';

import PhoneContacts from 'react-native-contacts';
import {useSelector, useDispatch} from 'react-redux';

import {ANDROID, CONTACTS_READ_PERM_DETAILS} from '@constants/permissions';
import {syncContacts} from '@state/slices';
import type {RootState} from '@state/store';
import type {ContactItem, GroupedContacts, Contacts} from '@types';
import {utils} from '@utils/general';
import {getPermissions} from '@utils/permissions';

interface HomeContextProps {
  contactsSortedArray: GroupedContacts[];
  currentExpanded: ContactItem['id'] | null;
  setCurrentExpanded: React.Dispatch<React.SetStateAction<ContactItem['id'] | null>>;
  canPaginate: boolean;
  setCanPaginate: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
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
  loading: false,
});

const HomeContextProvider = ({children}: HomeContextProviderProps) => {
  const [currentExpanded, setCurrentExpanded] = useState<ContactItem['id'] | null>(null);
  const [canPaginate, setCanPaginate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const contacts = useSelector((state: RootState) => state.contacts.value) || {};

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

  const loadContacts = async () => {
    const allContacts = await PhoneContacts.getAll();

    const trimmedContacts = allContacts.reduce((acc: Contacts, c) => {
      if (c.phoneNumbers.length > 0) {
        acc[c.recordID] = {
          id: c.recordID,
          hasAvatar: c.hasThumbnail,
          avatar: c.thumbnailPath,
          firstName: c.givenName,
          lastName: c.familyName,
          phone: c.phoneNumbers[0]?.number,
          email: c.emailAddresses[0]?.email,
          isStarred: c.isStarred,
        };
      }

      return acc;
    }, {});

    dispatch(syncContacts(trimmedContacts));
    setLoading(false);

    await PhoneContacts.checkPermission();
  };

  useEffect(() => {
    // eslint-disable-next-line
    getPermissions(ANDROID.contactsRead, loadContacts, CONTACTS_READ_PERM_DETAILS);
  }, [contacts]);

  const values: HomeContextProps = {
    contactsSortedArray,
    currentExpanded,
    setCurrentExpanded,
    canPaginate,
    setCanPaginate,
    loading,
  };

  return <HomeContext.Provider value={values}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => useContext(HomeContext);
export {HomeContextProvider};
