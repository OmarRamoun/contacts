/* eslint-disable no-param-reassign, @typescript-eslint/no-floating-promises */
import PhoneContacts from 'react-native-contacts';

import type {ContactItem} from '@types';

const mapToPhoneContact = (contact: ContactItem) => ({
  givenName: contact.firstName,
  familyName: contact.lastName,
  isStarred: contact.isStarred || false,
  hasThumbnail: contact.hasAvatar || false,
  thumbnailPath: contact.avatar || '',
  phoneNumbers: [
    {
      label: 'mobile',
      number: contact.phone,
    },
  ],
  emailAddresses: [
    {
      label: 'home',
      email: contact.email,
    },
  ],
});

const addContactToPhone = (contact: Partial<PhoneContacts.Contact>, state: any) => {
  PhoneContacts.addContact(contact).then((newContact) => {
    state.value[newContact.recordID] = contact;
  });
};

const editPhoneContact = (contact: ContactItem, state: any) => {
  PhoneContacts.getContactById(contact.id).then((phoneContact) => {
    if (phoneContact) {
      const editedPhone = {
        ...phoneContact,
        ...mapToPhoneContact(contact),
      };

      PhoneContacts.updateContact(editedPhone).then(() => {
        state.value[editedPhone.recordID || ''] = contact;
      });
    }
  });
};

const deletePhoneContact = (contactIdToDelete: string, state: any) => {
  PhoneContacts.getContactById(contactIdToDelete).then((phoneContact) => {
    if (phoneContact) {
      const editedPhone = {
        ...phoneContact,
        recordID: phoneContact?.recordID || '',
      };

      PhoneContacts.deleteContact(editedPhone).then(() => {
        delete state.value[contactIdToDelete];
      });
    }
  });
};

const starPhoneContact = (contact: ContactItem, state: any) => {
  PhoneContacts.getContactById(contact.id).then((existingContact) => {
    if (existingContact) {
      // Update the contact to mark it as starred
      const updatedContact = {
        ...existingContact,
        isStarred: true,
      };

      // Assuming PhoneContacts.updateContact exists and updates the contact in the phone
      PhoneContacts.updateContact(updatedContact).then(() => {
        state.value[contact.id] = updatedContact;
      });
    }
  });

  return null;
};

export {mapToPhoneContact, addContactToPhone, editPhoneContact, deletePhoneContact, starPhoneContact};
