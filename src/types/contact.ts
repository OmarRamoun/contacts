interface ContactItem {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
}

interface Contacts {
  [id: string]: ContactItem;
}

interface GroupedContacts {
  title: string;
  data: ContactItem[];
}

export type {ContactItem, Contacts, GroupedContacts};
