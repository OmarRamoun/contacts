/* eslint-disable no-param-reassign */
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

import type {Contacts, ContactItem} from '@types';

import {mapToPhoneContact, addContactToPhone, editPhoneContact, deletePhoneContact, starPhoneContact} from '../helpers';

const initialValue: Contacts = {};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    value: initialValue,
  },
  reducers: {
    syncContacts: (state, action: PayloadAction<Contacts>) => {
      state.value = action.payload;
    },
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const newContact = action.payload;
      const mappedNewContact = mapToPhoneContact(newContact);
      addContactToPhone(mappedNewContact, state);
    },
    editContact: (state, action: PayloadAction<ContactItem>) => {
      const editedContact = action.payload;
      state.value[editedContact.id] = editedContact;
      editPhoneContact(editedContact, state);
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      const contactIdToDelete = action.payload;
      deletePhoneContact(contactIdToDelete, state);
    },
    starContact: (state, action: PayloadAction<ContactItem>) => {
      const editedContact = action.payload;
      starPhoneContact(editedContact, state);
    },
    clearContacts: (state) => {
      state.value = {};
    },
  },
});

const {syncContacts, addContact, editContact, starContact, clearContacts, deleteContact} = contactsSlice.actions;
export {contactsSlice, syncContacts, addContact, starContact, editContact, deleteContact, clearContacts};

export default contactsSlice.reducer;
