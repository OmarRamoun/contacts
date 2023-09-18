import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

import storage from '@data/contacts';
import type {Contacts, ContactItem} from '@types';
/* import {getItem, setItem} from '@utils/storage'; */

const initialValue: Contacts = {};

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
      const newContact = action.payload;
      // eslint-disable-next-line
      state.value[newContact.id] = newContact;
    },
    editContact: (state, action: PayloadAction<ContactItem>) => {
      const editedContact = action.payload;
      // eslint-disable-next-line
      state.value[editedContact.id] = editedContact;
    },
    clearContacts: (state) => {
      // eslint-disable-next-line
      state.value = {};
    },
  },
});

const {addContact, editContact, clearContacts} = contactsSlice.actions;
export {contactsSlice, addContact, editContact, clearContacts};

export default contactsSlice.reducer;
