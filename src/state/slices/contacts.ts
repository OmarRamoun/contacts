import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

import storage from '@data/contacts';
import type {ContactItem} from '@types';
/* import {getItem, setItem} from '@utils/storage'; */

const initialValue: ContactItem[] = [];

/* const contactsData = getItem('contacts'); */
/* const storage: ContactItem[] = contactsData ? JSON.parse(contactsData) : null; */
/* const setStorage = (value: ContactItem[]) => setItem('contacts', JSON.stringify(value)); */

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    value: storage || initialValue,
  },
  reducers: {
    addContact: (state, action: PayloadAction<ContactItem>) => {
      // eslint-disable-next-line
      state.value = [...state.value, action.payload];
      /* setStorage(state.value); */
    },
    clearContacts: (state) => {
      // eslint-disable-next-line
      state.value = [];
      /* setStorage(state.value); */
    },
  },
});

const {addContact, clearContacts} = contactsSlice.actions;
export {contactsSlice, addContact, clearContacts};

export default contactsSlice.reducer;
